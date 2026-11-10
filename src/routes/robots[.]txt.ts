import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/config/seo.config";

// A route, not a static `public/robots.txt` file - the Sitemap: line needs
// `VITE_BASE_URL`, which is only known at request time. A static file would
// need its domain hand-edited by every project cloned from this template;
// this one is correct the moment the env var is.
function buildRobotsTxt(): string {
	return `User-agent: *\nDisallow:\n\nSitemap: ${seo.url}/sitemap.xml\n`;
}

export const Route = createFileRoute("/robots.txt")({
	server: {
		handlers: {
			GET: () =>
				new Response(buildRobotsTxt(), {
					headers: { "Content-Type": "text/plain" },
				}),
		},
	},
});
