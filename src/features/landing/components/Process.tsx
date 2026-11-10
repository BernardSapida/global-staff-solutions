import { PROCESS_STEPS } from "../landing.content";

/** Three steps from first call to first shift. */
export function Process() {
	return (
		<section
			aria-labelledby="process-title"
			className="process gss-wrap"
			id="process"
		>
			<div className="section-head section-head--split">
				<h2 id="process-title">From first call to first shift in under a month</h2>
				<p>
					Most teams are working within 15 to 25 days. You approve every hire, and a dedicated account manager stays
					with you after go-live.
				</p>
			</div>

			<ol className="steps">
				{PROCESS_STEPS.map((step, index) => (
					<li
						className="step"
						key={step.title}
					>
						<span className="step__num">{index + 1}</span>
						<div className="step__img">
							<img
								alt=""
								height={600}
								loading="lazy"
								src={step.image}
								width={800}
							/>
						</div>
						<h3>{step.title}</h3>
						<p>{step.body}</p>
						<span className="step__time">{step.time}</span>
					</li>
				))}
			</ol>
		</section>
	);
}
