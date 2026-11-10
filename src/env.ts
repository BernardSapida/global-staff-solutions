import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

const httpOrigin = z
	.url()
	// z.url() accepts any syntactically valid scheme, so `htp://` passes and
	// then never matches a real browser origin.
	.refine((value) => /^https?:\/\//.test(value), "must start with http:// or https://")
	.refine((value) => !value.endsWith("/"), "must not end with a trailing slash");

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
	},

	/**
	 * The prefix that client-side variables must have. This is enforced both at
	 * a type-level and at runtime.
	 */
	clientPrefix: "VITE_",

	client: {
		/**
		 * This app's own origin - a real URL, with NO trailing slash. Used for
		 * canonical links, the sitemap and OG tags.
		 *
		 * Validated when this module first EXECUTES, but VITE_ values are inlined
		 * at build time - fixing a bad value needs a REBUILD, not a restart.
		 */
		VITE_BASE_URL: httpOrigin.default("http://localhost:4000"),

		/**
		 * The backend's origin - NO trailing slash. Every API and auth call goes
		 * here, so the backend must allow this app's origin in its CORS and
		 * Better Auth `trustedOrigins`.
		 */
		VITE_API_URL: httpOrigin.default("http://localhost:3000"),
	},

	/**
	 * What object holds the environment variables at runtime. This is usually
	 * `process.env` or `import.meta.env`.
	 */
	runtimeEnv: {
		...(typeof process !== "undefined" ? process.env : {}),
		...import.meta.env,
	},

	/** Treat `VAR=` as unset so defaults apply. */
	emptyStringAsUndefined: true,
});
