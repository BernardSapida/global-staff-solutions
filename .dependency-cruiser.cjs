/**
 * This app is a frontend: the backend owns the database, auth server, email
 * and object storage. The rule below fails a build if server-side vendor SDKs
 * creep back in.
 *
 * `better-auth/react` and `better-auth/client/*` are the browser SDK and are
 * allowed; the bare `better-auth` server package, its adapters and plugins are
 * not (type-only imports are erased and exempt).
 *
 * Run: `pnpm boundaries` (or `pnpm check`, which includes it).
 */
module.exports = {
	forbidden: [
		{
			name: "no-server-vendors-in-frontend",
			comment:
				"Prisma, the AWS SDK, Resend and Better Auth's server package belong to the backend, not this app. " +
				"Call a backend endpoint through src/lib/api/api-client.ts instead.",
			severity: "error",
			from: {},
			to: {
				path: "^(@prisma/|@aws-sdk/|resend$|better-auth($|/adapters|/plugins|/tanstack-start))",
				dependencyTypesNot: ["type-only"],
			},
		},
	],
	options: {
		tsConfig: { fileName: "tsconfig.json" },
		tsPreCompilationDeps: true,
		exclude: {
			path: "node_modules",
		},
	},
};
