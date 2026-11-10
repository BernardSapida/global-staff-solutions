import { Gauge, Headset, RefreshCcw, ShieldCheck, UserRound } from "lucide-react";
import type { SiteHeaderAction, SiteNavItem } from "@/components/web-ui";

/** Every piece of landing-page copy lives here, so sections stay props-in markup-out. */

export const CONTACT_EMAIL = "hello@gssglobalstaffsolutions.com";
export const CONTACT_PHONE = { href: "tel:+6320000000", label: "+63 2 0000 0000" };
export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}`;
export const BOOK_MEETING_MAILTO = `${CONTACT_MAILTO}?subject=Book%20a%20meeting`;

export const SITE_NAV: SiteNavItem[] = [
	{ hash: "roles", href: "/", icon: UserRound, label: "Roles" },
	{ hash: "savings", href: "/", icon: Gauge, label: "Pricing" },
	{ hash: "process", href: "/", icon: RefreshCcw, label: "How it works" },
	{ hash: "why", href: "/", icon: ShieldCheck, label: "Why GSS" },
	{ hash: "faq", href: "/", icon: Headset, label: "FAQ" },
];

export const SITE_ACTIONS: SiteHeaderAction[] = [
	{ label: "Contact", to: "/#contact", variant: "ghost" },
	{ label: "Book a meeting", to: BOOK_MEETING_MAILTO, variant: "primary" },
];

export const HERO_AVATARS = [
	"https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&q=70",
	"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&q=70",
	"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&q=70",
];

export const DIAL_ORBITS = {
	inner: [
		"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop&q=70",
		"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&q=70",
		"https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=200&h=200&fit=crop&q=70",
	],
	outer: [
		"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&q=70",
		"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop&q=70",
	],
};

export const MARQUEE_ROLES = [
	"Accountants",
	"Bookkeepers",
	"Customer service",
	"Executive assistants",
	"Software developers",
	"Graphic designers",
	"Sales development",
	"Property managers",
	"Medical billing",
	"Paralegals",
	"Social media managers",
	"QA engineers",
];

export const ABOUT = {
	facts: [
		{ body: "Your staff work only for you, never shared across clients.", title: "Full-time and dedicated" },
		{ body: "One predictable monthly rate covers salary, HR, IT and office.", title: "No setup fees" },
	],
	image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1000&q=75&fit=crop",
	imageAlt: "A GSS team collaborating around a laptop",
	statement:
		"We find, hire and look after great people, so they can do great work for you. They join your team, use your tools and keep your hours, while we take care of everything that comes with employing them.",
	tag: { stat: "99%", text: "staff retention, because we look after our people" },
};

export interface RoleCategory {
	description: string;
	id: string;
	image: string;
	name: string;
	roles: string[];
}

export const ROLE_CATEGORIES: RoleCategory[] = [
	{
		description: "Month-end close, reconciliations, payables and reporting.",
		id: "finance",
		image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=1100&q=75&fit=crop",
		name: "Finance and accounting",
		roles: ["Accountants", "AP/AR specialists", "Bookkeepers", "Payroll officers"],
	},
	{
		description: "Inbound support, outbound prospecting and account care.",
		id: "support",
		image: "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=1100&q=75&fit=crop",
		name: "Customer and sales support",
		roles: ["Customer service reps", "Sales development reps", "Live chat agents", "Sales support"],
	},
	{
		description: "Inboxes, calendars, data entry and the work that keeps things running.",
		id: "operations",
		image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1100&q=75&fit=crop",
		name: "Operations and admin",
		roles: ["Executive assistants", "Project coordinators", "Virtual assistants", "Back-office support"],
	},
	{
		description: "Design, content and campaigns produced to your brand.",
		id: "marketing",
		image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=1100&q=75&fit=crop",
		name: "Digital marketing",
		roles: ["Graphic designers", "Social media managers", "Content writers", "SEO specialists"],
	},
	{
		description: "Engineers who join your sprints and ship in your stack.",
		id: "it",
		image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1100&q=75&fit=crop",
		name: "IT and development",
		roles: ["Software developers", "QA engineers", "DevOps support", "IT helpdesk"],
	},
	{
		description: "Listings, orders and inventory handled around the clock.",
		id: "ecommerce",
		image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1100&q=75&fit=crop",
		name: "eCommerce and logistics",
		roles: ["Product listing specialists", "Inventory coordinators", "Order management", "Logistics support"],
	},
];

/** Fully loaded monthly cost of an intermediate local hire in the US (salary, benefits, tax, overhead). */
export const TEAM_ROLES = {
	accountant: { name: "Accountant", ratio: 0.33, us: 7800 },
	bookkeeper: { name: "Bookkeeper", ratio: 0.32, us: 5600 },
	copywriter: { name: "Copywriter", ratio: 0.32, us: 5800 },
	csr: { name: "Customer service rep", ratio: 0.34, us: 4900 },
	designer: { name: "Graphic designer", ratio: 0.33, us: 6300 },
	developer: { name: "Software developer", ratio: 0.38, us: 11500 },
	ea: { name: "Executive assistant", ratio: 0.34, us: 6000 },
	marketer: { name: "Digital marketer", ratio: 0.34, us: 6800 },
	mobile: { name: "Mobile developer", ratio: 0.38, us: 11800 },
	qa: { name: "QA engineer", ratio: 0.36, us: 8400 },
	sdr: { name: "Sales development rep", ratio: 0.35, us: 6200 },
	va: { name: "Virtual assistant", ratio: 0.33, us: 4700 },
} as const;
export type TeamRoleKey = keyof typeof TEAM_ROLES;

export const TEAM_LEVELS = {
	junior: { k: 0.8, name: "Junior" },
	mid: { k: 1, name: "Intermediate" },
	senior: { k: 1.3, name: "Senior" },
} as const;
export type TeamLevelKey = keyof typeof TEAM_LEVELS;

/** Local cost relative to the US figure, in local currency. */
export const TEAM_COUNTRIES = {
	AU: { cur: "A$", fx: 1.52, local: 0.92, name: "Australia" },
	UK: { cur: "£", fx: 0.77, local: 0.85, name: "United Kingdom" },
	US: { cur: "US$", fx: 1, local: 1, name: "United States" },
} as const;
export type TeamCountryKey = keyof typeof TEAM_COUNTRIES;

export interface TeamRow {
	level: TeamLevelKey;
	qty: number;
	role: TeamRoleKey;
}

export const DEFAULT_TEAM: TeamRow[] = [
	{ level: "mid", qty: 1, role: "accountant" },
	{ level: "junior", qty: 3, role: "va" },
	{ level: "mid", qty: 2, role: "designer" },
	{ level: "senior", qty: 2, role: "developer" },
];

export const PROCESS_STEPS = [
	{
		body: "We learn the role, your goals and how you work, then shortlist pre-vetted candidates for you to interview and choose.",
		image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&q=75&fit=crop",
		time: "Days 1 to 10",
		title: "Align and match",
	},
	{
		body: "We handle contracts, set up a secure workstation and connectivity, and start training on your tools, workflows and KPIs.",
		image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&q=75&fit=crop",
		time: "Days 10 to 25",
		title: "Equip and onboard",
	},
	{
		body: "You manage the day-to-day work. We look after attendance, wellbeing, performance support and adding people as you grow.",
		image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=75&fit=crop",
		time: "Ongoing",
		title: "Operate and grow",
	},
];

export const WHY_STATS = [
	{ label: "Staff retention", value: "99%" },
	{ label: "Lower staffing cost", value: "70%" },
	{ label: "Days to go live", value: "15–25" },
	{ label: "Coverage available", value: "24/7" },
];

/** Icon geometry is inline SVG (24x24 viewBox), kept from the original drawings. */
export const WHY_POINTS: {
	body: string;
	circle?: { cx: number; cy: number; r: number };
	paths: string[];
	title: string;
}[] = [
	{
		body: "Your team works your business day, whether that's New York, Sydney or London.",
		circle: { cx: 12, cy: 12, r: 9 },
		paths: ["M12 7v5l3 2"],
		title: "Synced to your hours",
	},
	{
		body: "Managed workstations, fixed IP connections, access controls and NDAs for every hire.",
		paths: ["M12 3 4 6v6c0 4.5 3.4 8.4 8 9 4.6-.6 8-4.5 8-9V6l-8-3Z", "m9 12 2 2 4-4"],
		title: "Secure by default",
	},
	{
		body: "Competitive pay, health cover, training and a real workplace culture keep your knowledge in-house.",
		circle: { cx: 12, cy: 8, r: 4 },
		paths: ["M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6"],
		title: "People who stay",
	},
	{
		body: "You set the tasks, standards and priorities. We handle HR, payroll, benefits and compliance.",
		paths: ["M3 12h4l3-7 4 14 3-7h4"],
		title: "You stay in control",
	},
	{
		body: "Add a role next month or build a full department. No lock-in to a fixed headcount.",
		paths: ["M21 12a9 9 0 1 1-3-6.7", "M21 4v5h-5"],
		title: "Scale up or down",
	},
	{
		body: "One person who knows your business and resolves issues before they become problems.",
		paths: ["M4 5h16v11H8l-4 4V5Z"],
		title: "A named account manager",
	},
];

export const INDUSTRIES = [
	"Accounting firms",
	"Real estate",
	"Mortgage broking",
	"Healthcare",
	"Legal",
	"Billing and collections",
	"eCommerce",
	"Technology",
	"Construction",
	"Travel and leisure",
	"Financial services",
	"Property management",
];

export const FAQS = [
	{
		answer:
			"If you want to lower overhead, scale faster or reach skills that are hard to hire locally, offshoring is worth exploring. Roles with clear processes and measurable output usually transition best. We'll tell you honestly on our first call if a role isn't a good fit.",
		question: "How do I know if offshoring is right for my business?",
	},
	{
		answer:
			"You pay one monthly rate per team member that covers salary, benefits, HR, IT equipment, office space and management. Clients typically save 50 to 70 percent compared with hiring locally. There are no setup fees or hidden charges.",
		question: "What will it actually cost?",
	},
	{
		answer:
			"Yes. Our staff work schedules aligned to your time zone, including US Eastern and Pacific, UK and Australian business hours.",
		question: "Can my team work US or Australian hours?",
	},
	{
		answer:
			"The Philippines is one of Asia's most fluent English-speaking countries, and every candidate is assessed on written and spoken English before you meet them.",
		question: "How strong is their English?",
	},
	{
		answer:
			"Staff work on managed computers with fixed IP connectivity, role-based access controls and activity monitoring. Every team member signs confidentiality agreements, and we follow the Philippine Data Privacy Act.",
		question: "How is my data kept secure?",
	},
	{
		answer:
			"Your account manager will look into the root cause, from training gaps to role fit, and agree a plan with you. If the fit isn't right, we'll find a replacement.",
		question: "What if someone isn't working out?",
	},
];
