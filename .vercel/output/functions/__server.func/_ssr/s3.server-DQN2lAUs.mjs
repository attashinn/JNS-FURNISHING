import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";
//#region node_modules/.nitro/vite/services/ssr/assets/s3.server-DQN2lAUs.js
var BUCKET = process.env.S3_BUCKET_NAME || "brnnd";
var ACCESS_KEY_ID = process.env.S3_KEY_ID || "GKef6b49eb470c190928aa452a";
var SECRET_ACCESS_KEY = process.env.S3_SECRET_KEY || "e2458dfe3abbe1de3b8efea9707b2460e779ee47bc5877c273b3859435f737e9";
var PUBLIC_URL = (process.env.S3_PUBLIC_URL || "https://content.zambic.com").replace(/\/+$/, "");
var REGION = process.env.S3_REGION || "auto";
var ENDPOINT = process.env.S3_ENDPOINT || (ACCESS_KEY_ID.startsWith("GK") ? "https://storage.googleapis.com" : `https://${BUCKET}.s3.amazonaws.com`);
function sha256Hex(data) {
	return crypto.createHash("sha256").update(data).digest("hex");
}
function hmac(key, data) {
	return crypto.createHmac("sha256", key).update(data).digest();
}
async function uploadImageToStorage({ filename, base64Data, contentType = "image/jpeg" }) {
	const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
	const fileBuffer = Buffer.from(cleanBase64, "base64");
	const ext = path.extname(filename) || (contentType.includes("png") ? ".png" : contentType.includes("webp") ? ".webp" : ".jpg");
	const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
	const key = `products/${Date.now()}-${baseName}${ext}`;
	try {
		const urlObj = new URL(ENDPOINT.startsWith("http") ? ENDPOINT : `https://${ENDPOINT}`);
		const host = urlObj.host;
		const amzDate = (/* @__PURE__ */ new Date()).toISOString().replace(/[:-]|\.\d{3}/g, "");
		const dateStamp = amzDate.slice(0, 8);
		const payloadHash = sha256Hex(fileBuffer);
		const canonicalUri = host.includes("googleapis.com") ? `/${BUCKET}/${key}` : `/${key}`;
		const canonicalHeaders = `content-type:${contentType}\nhost:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
		const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";
		const canonicalRequest = [
			"PUT",
			canonicalUri,
			"",
			canonicalHeaders,
			signedHeaders,
			payloadHash
		].join("\n");
		const credentialScope = `${dateStamp}/${REGION}/s3/aws4_request`;
		const stringToSign = [
			"AWS4-HMAC-SHA256",
			amzDate,
			credentialScope,
			sha256Hex(canonicalRequest)
		].join("\n");
		const kSigning = hmac(hmac(hmac(hmac(`AWS4${SECRET_ACCESS_KEY}`, dateStamp), REGION), "s3"), "aws4_request");
		const authHeader = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${crypto.createHmac("sha256", kSigning).update(stringToSign).digest("hex")}`;
		const targetUploadUrl = `${urlObj.origin}${canonicalUri}`;
		if ((await fetch(targetUploadUrl, {
			method: "PUT",
			headers: {
				"Content-Type": contentType,
				"x-amz-date": amzDate,
				"x-amz-content-sha256": payloadHash,
				Authorization: authHeader
			},
			body: fileBuffer
		})).ok) return {
			url: `${PUBLIC_URL}/${key}`,
			key
		};
	} catch (err) {
		console.error("S3 upload attempt failed, writing to public uploads fallback:", err);
	}
	try {
		const localDir = path.join(process.cwd(), "public", "uploads", "products");
		await fs.mkdir(localDir, { recursive: true });
		const localPath = path.join(localDir, `${Date.now()}-${baseName}${ext}`);
		await fs.writeFile(localPath, fileBuffer);
		return {
			url: `/uploads/products/${path.basename(localPath)}`,
			key
		};
	} catch (fsErr) {
		console.error("Local fallback write failed:", fsErr);
		return {
			url: `data:${contentType};base64,${cleanBase64}`,
			key
		};
	}
}
//#endregion
export { uploadImageToStorage };
