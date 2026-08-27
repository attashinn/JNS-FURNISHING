import crypto from "node:crypto";
import fs from "node:fs/promises";
import path from "node:path";

const BUCKET = process.env.S3_BUCKET_NAME || "brnnd";
const ACCESS_KEY_ID = process.env.S3_KEY_ID || "GKef6b49eb470c190928aa452a";
const SECRET_ACCESS_KEY = process.env.S3_SECRET_KEY || "e2458dfe3abbe1de3b8efea9707b2460e779ee47bc5877c273b3859435f737e9";
const PUBLIC_URL = (process.env.S3_PUBLIC_URL || "https://content.zambic.com").replace(/\/+$/, "");
const REGION = process.env.S3_REGION || "auto";
const ENDPOINT = process.env.S3_ENDPOINT || (ACCESS_KEY_ID.startsWith("GK") ? "https://storage.googleapis.com" : `https://${BUCKET}.s3.amazonaws.com`);

function sha256Hex(data: Buffer | string): string {
  return crypto.createHash("sha256").update(data).digest("hex");
}

function hmac(key: Buffer | string, data: string): Buffer {
  return crypto.createHmac("sha256", key).update(data).digest();
}

export async function uploadImageToStorage({
  filename,
  base64Data,
  contentType = "image/jpeg",
}: {
  filename: string;
  base64Data: string;
  contentType?: string;
}): Promise<{ url: string; key: string }> {
  // Strip data URL prefix if present
  const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
  const fileBuffer = Buffer.from(cleanBase64, "base64");
  
  const ext = path.extname(filename) || (contentType.includes("png") ? ".png" : contentType.includes("webp") ? ".webp" : ".jpg");
  const baseName = path.basename(filename, ext).replace(/[^a-zA-Z0-9_-]/g, "-").toLowerCase();
  const key = `products/${Date.now()}-${baseName}${ext}`;

  // Try S3 / GCS S3 API upload
  try {
    const urlObj = new URL(ENDPOINT.startsWith("http") ? ENDPOINT : `https://${ENDPOINT}`);
    const host = urlObj.host;
    const date = new Date();
    const amzDate = date.toISOString().replace(/[:-]|\.\d{3}/g, "");
    const dateStamp = amzDate.slice(0, 8);
    
    const payloadHash = sha256Hex(fileBuffer);
    
    // GCS / S3 path: If endpoint is storage.googleapis.com, URI is /BUCKET/key
    const canonicalUri = host.includes("googleapis.com") ? `/${BUCKET}/${key}` : `/${key}`;
    const canonicalHeaders = `content-type:${contentType}\nhost:${host}\nx-amz-content-sha256:${payloadHash}\nx-amz-date:${amzDate}\n`;
    const signedHeaders = "content-type;host;x-amz-content-sha256;x-amz-date";
    
    const canonicalRequest = [
      "PUT",
      canonicalUri,
      "",
      canonicalHeaders,
      signedHeaders,
      payloadHash,
    ].join("\n");
    
    const credentialScope = `${dateStamp}/${REGION}/s3/aws4_request`;
    const stringToSign = [
      "AWS4-HMAC-SHA256",
      amzDate,
      credentialScope,
      sha256Hex(canonicalRequest),
    ].join("\n");
    
    const kDate = hmac(`AWS4${SECRET_ACCESS_KEY}`, dateStamp);
    const kRegion = hmac(kDate, REGION);
    const kService = hmac(kRegion, "s3");
    const kSigning = hmac(kService, "aws4_request");
    const signature = crypto.createHmac("sha256", kSigning).update(stringToSign).digest("hex");
    
    const authHeader = `AWS4-HMAC-SHA256 Credential=${ACCESS_KEY_ID}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`;
    
    const targetUploadUrl = `${urlObj.origin}${canonicalUri}`;
    
    const res = await fetch(targetUploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
        "x-amz-date": amzDate,
        "x-amz-content-sha256": payloadHash,
        Authorization: authHeader,
      },
      body: fileBuffer,
    });
    
    if (res.ok) {
      const publicCdnUrl = `${PUBLIC_URL}/${key}`;
      return { url: publicCdnUrl, key };
    }
  } catch (err) {
    console.error("S3 upload attempt failed, writing to public uploads fallback:", err);
  }

  // Fallback to local public uploads directory
  try {
    const localDir = path.join(process.cwd(), "public", "uploads", "products");
    await fs.mkdir(localDir, { recursive: true });
    const localPath = path.join(localDir, `${Date.now()}-${baseName}${ext}`);
    await fs.writeFile(localPath, fileBuffer);
    const localUrl = `/uploads/products/${path.basename(localPath)}`;
    return { url: localUrl, key };
  } catch (fsErr) {
    console.error("Local fallback write failed:", fsErr);
    // Return data URL as reliable fallback
    return { url: `data:${contentType};base64,${cleanBase64}`, key };
  }
}
