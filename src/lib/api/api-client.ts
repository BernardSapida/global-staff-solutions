import { env } from "@/env";

/**
 * A non-2xx answer from the backend. `code` is the backend's own machine token
 * when it sends one (`{ code, message }`), otherwise derived from the status.
 */
export class ApiError extends Error {
	readonly code: string;
	readonly status: number;

	constructor(status: number, code: string, message: string) {
		super(message);
		this.name = "ApiError";
		this.code = code;
		this.status = status;
	}
}

const CODE_BY_STATUS: Record<number, string> = {
	400: "BAD_REQUEST",
	401: "UNAUTHORIZED",
	403: "FORBIDDEN",
	404: "NOT_FOUND",
	409: "CONFLICT",
	429: "TOO_MANY_REQUESTS",
	503: "SERVICE_UNAVAILABLE",
};

export function apiUrl(path: string): string {
	return `${env.VITE_API_URL}${path}`;
}

/**
 * JSON request to the backend with the session cookie attached. Throws
 * `ApiError` on a non-2xx answer; a network failure surfaces as the `TypeError`
 * `fetch` already throws, which `classifyError` reads as "network".
 */
export async function apiFetch<T>(path: string, init: Omit<RequestInit, "body"> & { body?: unknown } = {}): Promise<T> {
	const { body, headers, ...rest } = init;

	const response = await fetch(apiUrl(path), {
		...rest,
		body: body === undefined ? undefined : JSON.stringify(body),
		credentials: "include",
		headers: { ...(body === undefined ? {} : { "content-type": "application/json" }), ...headers },
	});

	if (!response.ok) {
		const payload = (await response.json().catch(() => null)) as { code?: unknown; message?: unknown } | null;
		const code = typeof payload?.code === "string" ? payload.code : (CODE_BY_STATUS[response.status] ?? "UNKNOWN");
		const message = typeof payload?.message === "string" ? payload.message : response.statusText;
		throw new ApiError(response.status, code, message);
	}

	if (response.status === 204) return undefined as T;
	return (await response.json()) as T;
}
