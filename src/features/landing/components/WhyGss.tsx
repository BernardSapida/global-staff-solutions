import { WHY_POINTS, WHY_STATS } from "../landing.content";

/** Why GSS: the proof points and the numbers behind them. */
export function WhyGss() {
	return (
		<section
			aria-labelledby="why-title"
			className="why"
			id="why"
		>
			<div className="gss-wrap why__inner">
				<div className="why__head">
					<h2 id="why-title">Built for businesses that can't afford the wrong hire</h2>
					<p>
						Offshoring only works when people stay, data stays safe and you stay in control. That's what we're built
						around.
					</p>
					<dl className="why__stats">
						{WHY_STATS.map((stat) => (
							<div key={stat.label}>
								<dt>{stat.label}</dt>
								<dd>{stat.value}</dd>
							</div>
						))}
					</dl>
				</div>

				<ul className="why__list">
					{WHY_POINTS.map((point) => (
						<li key={point.title}>
							<svg
								aria-hidden="true"
								viewBox="0 0 24 24"
							>
								{point.circle ? <circle {...point.circle} /> : null}
								{point.paths.map((d) => (
									<path
										d={d}
										key={d}
									/>
								))}
							</svg>
							<div>
								<h3>{point.title}</h3>
								<p>{point.body}</p>
							</div>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
