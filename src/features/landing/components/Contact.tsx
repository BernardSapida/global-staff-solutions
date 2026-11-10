import { ArrowUpRight } from "lucide-react";
import { BOOK_MEETING_MAILTO, CONTACT_MAILTO } from "../landing.content";

/** The closing call to action. `#contact` is where every "Book a meeting" link lands. */
export function Contact() {
	return (
		<section
			aria-labelledby="cta-title"
			className="cta gss-wrap"
			id="contact"
		>
			<div className="cta__panel">
				<div className="cta__copy">
					<h2 id="cta-title">Your next great hire is already awake.</h2>
					<p>
						Book a free 30-minute call with a staffing specialist. We'll map out the roles, costs and timeline for your
						team.
					</p>
					<div className="cta__options">
						<a
							className="btn btn--gold"
							href={BOOK_MEETING_MAILTO}
						>
							Book a meeting
							<span
								aria-hidden="true"
								className="btn__chip"
							>
								<ArrowUpRight />
							</span>
						</a>
						<a
							className="btn btn--ghost"
							href={CONTACT_MAILTO}
						>
							Send us a message
						</a>
					</div>
				</div>
				<div
					aria-hidden="true"
					className="cta__art"
				>
					<svg
						aria-hidden="true"
						viewBox="0 0 400 400"
					>
						<circle
							cx="200"
							cy="200"
							r="190"
						/>
						<circle
							cx="200"
							cy="200"
							r="140"
						/>
						<circle
							cx="200"
							cy="200"
							r="90"
						/>
						<circle
							cx="200"
							cy="200"
							r="40"
						/>
					</svg>
				</div>
			</div>
		</section>
	);
}
