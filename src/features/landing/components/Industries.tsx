import { INDUSTRIES } from "../landing.content";

/** The industries GSS teams already serve. */
export function Industries() {
	return (
		<section
			aria-labelledby="ind-title"
			className="industries gss-wrap"
		>
			<h2 id="ind-title">Teams for the industries we know best</h2>
			<ul className="industries__list">
				{INDUSTRIES.map((industry) => (
					<li key={industry}>{industry}</li>
				))}
			</ul>
		</section>
	);
}
