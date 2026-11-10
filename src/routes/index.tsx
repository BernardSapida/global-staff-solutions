import { createFileRoute } from "@tanstack/react-router";
import { AppSiteFooter, AppSiteHeader } from "@/components/web-ui";
import { APP_NAME, seo } from "@/config/seo.config";
import {
	About,
	Contact,
	Faq,
	Industries,
	Landing,
	Process,
	Roles,
	RolesMarquee,
	TeamBuilder,
	WhyGss,
} from "@/features/landing/components";
import { CONTACT_EMAIL, CONTACT_PHONE, FAQS, SITE_ACTIONS, SITE_NAV } from "@/features/landing/landing.content";
import "@/features/landing/landing.css";

/* Restyles the web-ui AppSiteHeader to the GSS look: frosted porcelain bar, pill nav, quiet Contact link. */
const HEADER_CLASS = [
	"[&>div]:border-b-0 [&>div]:bg-[rgba(243,246,251,.82)] [&>div]:backdrop-blur-md [&>div]:backdrop-saturate-150",
	"[&>div>div]:max-w-[1400px] [&>div>div]:min-h-[76px] [&>div>div]:py-0",
	"[&_img]:h-10",
	"[&_nav]:gap-1 [&_nav]:rounded-full [&_nav]:bg-white [&_nav]:p-[5px] [&_nav]:shadow-[inset_0_0_0_1px_#DCE3EF]",
	"[&_nav_a]:rounded-full [&_nav_a]:px-4 [&_nav_a]:py-2 [&_nav_a]:font-medium [&_nav_a]:text-[#5A6680]",
	"[&_nav_a:hover]:bg-[#E6EDF8] [&_nav_a:hover]:text-[#0B2350]",
	"[&_nav_a[data-status=active]]:font-medium",
	"[&_a[href='/#contact']]:font-medium [&_a[href='/#contact']]:text-[#5A6680] [&_a[href='/#contact']:hover]:bg-transparent [&_a[href='/#contact']:hover]:text-[#0B2350]",
].join(" ");

const PAGE_TITLE = `${APP_NAME} | Offshore staffing that works your hours`;
const FONT_HREF =
	"https://fonts.googleapis.com/css2?family=Schibsted+Grotesk:ital,wght@0,400..900;1,400..700&display=swap";

const ORGANIZATION_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "Organization",
	address: { "@type": "PostalAddress", addressCountry: "PH", addressLocality: "Manila" },
	contactPoint: { "@type": "ContactPoint", contactType: "sales", email: CONTACT_EMAIL },
	description: seo.description,
	email: CONTACT_EMAIL,
	logo: `${seo.url}/images/logo.png`,
	name: APP_NAME,
	url: seo.url,
};

const WEBSITE_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	description: seo.description,
	inLanguage: "en",
	name: APP_NAME,
	url: seo.url,
};

const FAQ_SCHEMA = {
	"@context": "https://schema.org",
	"@type": "FAQPage",
	mainEntity: FAQS.map((faq) => ({
		"@type": "Question",
		acceptedAnswer: { "@type": "Answer", text: faq.answer },
		name: faq.question,
	})),
};

export const Route = createFileRoute("/")({
	head: () => ({
		links: [
			{ href: seo.url, rel: "canonical" },
			{ href: "https://fonts.googleapis.com", rel: "preconnect" },
			{ crossOrigin: "anonymous", href: "https://fonts.gstatic.com", rel: "preconnect" },
			{ href: FONT_HREF, rel: "stylesheet" },
		],
		meta: [
			{ title: PAGE_TITLE },
			{ content: seo.description, name: "description" },
			{ content: "index, follow", name: "robots" },
			{ content: PAGE_TITLE, property: "og:title" },
			{ content: seo.description, property: "og:description" },
			{ content: `${seo.url}${seo.ogImage}`, property: "og:image" },
			{ content: `${APP_NAME} - offshore staffing that works your hours`, property: "og:image:alt" },
			{ content: seo.url, property: "og:url" },
			{ content: "website", property: "og:type" },
			{ content: seo.twitter.card, name: "twitter:card" },
			{ content: PAGE_TITLE, name: "twitter:title" },
			{ content: seo.description, name: "twitter:description" },
			{ content: `${seo.url}${seo.ogImage}`, name: "twitter:image" },
			{ content: seo.url, name: "twitter:url" },
			{ "script:ld+json": ORGANIZATION_SCHEMA },
			{ "script:ld+json": WEBSITE_SCHEMA },
			{ "script:ld+json": FAQ_SCHEMA },
		],
	}),
	component: HomePage,
});

/** One page, section by section. Each section owns its markup; copy lives in landing.content.ts. */
function HomePage() {
	return (
		<div className="gss-landing">
			<AppSiteHeader
				actions={SITE_ACTIONS}
				className={HEADER_CLASS}
				data-cy="site-header"
				items={SITE_NAV}
				logo={{ mark: "lockup", src: "/images/logo.svg" }}
				variant="flush"
			/>

			<main id="main">
				<Landing />
				<RolesMarquee />
				<About />
				<Roles />
				<TeamBuilder />
				<Process />
				<WhyGss />
				<Industries />
				<Faq />
				<Contact />
			</main>

			<AppSiteFooter
				copyrightNote="All rights reserved."
				groups={[
					{
						heading: "Services",
						links: [
							{ hash: "roles", href: "/", label: "Roles we fill" },
							{ hash: "savings", href: "/", label: "Pricing" },
							{ hash: "process", href: "/", label: "How it works" },
						],
					},
					{
						heading: "Company",
						links: [
							{ hash: "why", href: "/", label: "Why GSS" },
							{ hash: "faq", href: "/", label: "FAQ" },
							{ hash: "contact", href: "/", label: "Contact" },
						],
					},
					{
						heading: "Get in touch",
						links: [
							{ href: `mailto:${CONTACT_EMAIL}`, isExternal: true, label: CONTACT_EMAIL },
							{ href: CONTACT_PHONE.href, isExternal: true, label: CONTACT_PHONE.label },
						],
					},
				]}
				logo={{ mark: "lockup", src: "/images/logo.svg" }}
				owner={APP_NAME}
				tagline="Dedicated offshore professionals, recruited, equipped and supported by GSS. Manila, Philippines."
			/>
		</div>
	);
}
