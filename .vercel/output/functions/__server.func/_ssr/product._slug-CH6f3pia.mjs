import { o as require_jsx_runtime } from "../_libs/react+tanstack__react-query.mjs";
import { b as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { g as SiteHeader, h as SiteFooter } from "./router-BoUir8eE.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/product._slug-CH6f3pia.js
var import_jsx_runtime = require_jsx_runtime();
function ProductError({ reset }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen bg-[#FAF9F6]",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto max-w-xl px-6 py-32 text-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xl font-bold text-[#141715]",
					children: "Something went wrong loading this product."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					onClick: () => {
						router.invalidate();
						reset();
					},
					className: "mt-4 rounded-sm bg-[#141715] px-6 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#2E473A]",
					children: "Try Again"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
		]
	});
}
//#endregion
export { ProductError as errorComponent };
