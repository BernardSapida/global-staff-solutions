import { MARQUEE_ROLES } from "../landing.content";

/** A slow ticker of the roles GSS staffs. The second list is a visual duplicate for the seamless loop. */
export function RolesMarquee() {
	return (
		<section
			aria-label="Roles we staff"
			className="marquee"
		>
			<div className="marquee__track">
				<ul>
					{MARQUEE_ROLES.map((role) => (
						<li key={role}>{role}</li>
					))}
				</ul>
				<ul aria-hidden="true">
					{MARQUEE_ROLES.map((role) => (
						<li key={role}>{role}</li>
					))}
				</ul>
			</div>
		</section>
	);
}
