import { QueryCache, QueryClient } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { queryClientConfig } from "@/config/query-client";
import { ApiError } from "@/lib/api/api-client";

export type AppContext = {
	queryClient: QueryClient;
};

// Singleton client context on the browser
let clientContext: AppContext | undefined;

function handleQueryError(error: unknown) {
	if (typeof window === "undefined") return;
	if (error instanceof ApiError && error.status === 401) {
		window.location.assign("/sign-in");
	}
}

// In SSR, we need fresh instances per request. In CSR, we want a singleton.
export function getContext(): AppContext {
	// Only reuse the context in the browser
	if (typeof window !== "undefined" && clientContext) {
		return clientContext;
	}

	const queryClient = new QueryClient({
		...queryClientConfig,
		queryCache: new QueryCache({ onError: handleQueryError }),
	});

	const context: AppContext = { queryClient };

	if (typeof window !== "undefined") {
		clientContext = context;
	}

	return context;
}

// The context is built once in `getRouter` and handed down.
//
// `QueryClientProvider` is not mounted here: `setupRouterSsrQueryIntegration` wraps
// `router.options.Wrap` with one, using this same queryClient.
export default function TanStackQueryProvider({ children }: { children: ReactNode; context: AppContext }) {
	return <>{children}</>;
}
