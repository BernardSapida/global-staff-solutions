import { Typography } from "@heroui/react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface SiteFooterLink {
	href: string;
	label: string;
}

export interface SiteFooterColumn {
	links: SiteFooterLink[];
	title: string;
}

export interface SiteFooterContact {
	/** Opens `tel:` / `mailto:` when set; plain text otherwise. */
	href?: string;
	icon: LucideIcon;
	label: string;
}

export interface SiteFooterSocial {
	href: string;
	icon: ReactNode;
	label: string;
}

export interface SiteFooterProps {
	columns: SiteFooterColumn[];
	contactItems: SiteFooterContact[];
	contactTitle?: string;
	copyright: string;
	legalLinks: SiteFooterLink[];
	logo: { alt: string; src: string };
	socials: SiteFooterSocial[];
}

const LINK_CLASS = "text-muted transition-colors hover:text-app-brand";

/**
 * The public site footer: logo and socials on the left, link columns and
 * contact details on the right, legal strip underneath.
 *
 * Props in, markup out - the content lives with the feature that uses it.
 */
export function SiteFooter({
	columns,
	contactItems,
	contactTitle = "Contact",
	copyright,
	legalLinks,
	logo,
	socials,
}: SiteFooterProps) {
	return (
		<footer
			className="border-t border-text-primary/5 bg-[#ECEEF4]"
			data-cy="site-footer"
		>
			<div className="container-page py-12">
				<div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
					<div className="flex flex-col">
						<img
							alt={logo.alt}
							className="h-16 w-auto self-start object-contain"
							src={logo.src}
						/>
					</div>

					<nav
						aria-label="Footer"
						className="flex flex-col gap-8 sm:flex-row sm:gap-16"
					>
						{columns.map((column) => (
							<div
								className="flex flex-col gap-3"
								key={column.title}
							>
								<Typography
									type="body"
									weight="bold"
								>
									{column.title}
								</Typography>
								<ul className="flex flex-col gap-2">
									{column.links.map((link) => (
										<li key={link.label}>
											<a
												className={LINK_CLASS}
												href={link.href}
											>
												<Typography type="body-sm">{link.label}</Typography>
											</a>
										</li>
									))}
								</ul>
							</div>
						))}

						<div className="flex flex-col gap-3">
							<Typography
								type="body"
								weight="bold"
							>
								{contactTitle}
							</Typography>
							<ul className="flex flex-col gap-2">
								{contactItems.map(({ href, icon: Icon, label }) => (
									<li
										className="flex items-center gap-2"
										key={label}
									>
										<Icon
											aria-hidden="true"
											className="h-4 w-4 shrink-0"
										/>
										{href ? (
											<a
												className={LINK_CLASS}
												href={href}
											>
												<Typography type="body-sm">{label}</Typography>
											</a>
										) : (
											<Typography type="body-sm">{label}</Typography>
										)}
									</li>
								))}
							</ul>
						</div>
					</nav>
				</div>

				<ul className="mt-8 flex items-center gap-4">
					{socials.map((social) => (
						<li key={social.label}>
							<a
								aria-label={social.label}
								className="block h-7 w-7 text-text-primary transition-colors hover:text-app-brand [&>svg]:h-full [&>svg]:w-full"
								href={social.href}
								rel="noreferrer"
								target="_blank"
							>
								{social.icon}
							</a>
						</li>
					))}
				</ul>

				<div className="mt-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
					<Typography
						color="muted"
						type="body-sm"
					>
						{copyright}
					</Typography>
					<ul className="flex flex-wrap gap-x-6 gap-y-2">
						{legalLinks.map((link) => (
							<li key={link.label}>
								<a
									className={LINK_CLASS}
									href={link.href}
								>
									<Typography type="body-sm">{link.label}</Typography>
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
}
