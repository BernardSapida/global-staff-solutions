import { Typography } from "@heroui/react";
import { Link } from "@tanstack/react-router";
import { Construction } from "lucide-react";
import { AppButton } from "@/components/web-ui";

export interface UnderConstructionProps {
	/** Where the "back" button goes. */
	homeHref?: string;
	/** What is being built, e.g. "Careers". Names the page in the heading. */
	pageName: string;
}

/**
 * The stand-in for a page that is planned but not built yet.
 *
 * It says WHICH page is missing, so a reader who followed a menu link knows the
 * link worked and the page simply is not there - and it gives them a way back.
 */
export function UnderConstruction({ homeHref = "/", pageName }: UnderConstructionProps) {
	return (
		<section
			aria-labelledby="under-construction-title"
			className="mx-auto flex min-h-[60vh] w-full max-w-xl flex-col items-center justify-center gap-4 px-4 py-16 text-center"
			data-cy="under-construction"
		>
			<div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-app-brand/10 text-app-brand">
				<Construction
					aria-hidden="true"
					className="h-8 w-8"
				/>
			</div>
			<Typography.Heading
				id="under-construction-title"
				level={1}
			>
				{pageName} is under construction
			</Typography.Heading>
			<Typography
				color="muted"
				type="body"
			>
				We are still building this page. Please check back soon.
			</Typography>
			<Link to={homeHref}>
				<AppButton variant="primary">Back to homepage</AppButton>
			</Link>
		</section>
	);
}
