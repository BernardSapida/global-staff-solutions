import { createFileRoute } from "@tanstack/react-router";
import { seo } from "@/config/seo.config";
import { PUBLIC_ROUTES } from "@/config/sitemap.config";

function buildSitemap(): string {
	const urls = PUBLIC_ROUTES.map((path) => `  <url><loc>${seo.url}${path}</loc></url>`).join("\n");

	return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export const Route = createFileRoute("/sitemap.xml")({
	server: {
		handlers: {
			GET: () =>
				new Response(buildSitemap(), {
					headers: { "Content-Type": "application/xml" },
				}),
		},
	},
});
