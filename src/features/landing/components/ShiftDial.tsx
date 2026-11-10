import { DIAL_ORBITS } from "../landing.content";
import type { ShiftClock } from "../shift-clock";
import { DIAL_CENTER, polar, R_ARC, R_OUTER } from "../shift-clock";

const HOURS = Array.from({ length: 24 }, (_, hour) => hour);

/** The follow-the-sun dial: Manila's clock, the visitor's clock and the shift window between them. */
export function ShiftDial({ clock }: { clock: ShiftClock }) {
	return (
		<div
			aria-label="Time comparison between your location and Manila"
			className="dial-wrap load"
			role="img"
			style={{ "--d": 2 } as React.CSSProperties}
		>
			<div className="dial">
				<svg
					aria-hidden="true"
					className="dial__face"
					viewBox="0 0 600 600"
				>
					<defs>
						<linearGradient
							id="arcGold"
							x1="0"
							x2="1"
							y1="0"
							y2="1"
						>
							<stop
								offset="0"
								stopColor="#F5C964"
							/>
							<stop
								offset="1"
								stopColor="#D8921A"
							/>
						</linearGradient>
						<radialGradient
							cx="50%"
							cy="40%"
							id="core"
							r="60%"
						>
							<stop
								offset="0"
								stopColor="#2A5BB5"
							/>
							<stop
								offset="1"
								stopColor="#0B2350"
							/>
						</radialGradient>
					</defs>
					<circle
						className="ring ring--outer"
						cx={DIAL_CENTER}
						cy={DIAL_CENTER}
						r={R_OUTER}
					/>
					<g>
						{HOURS.map((hour) => {
							const major = hour % 6 === 0;
							const [x1, y1] = polar(hour, R_OUTER);
							const [x2, y2] = polar(hour, R_OUTER - (major ? 16 : 8));
							const [tx, ty] = polar(hour, R_OUTER - 34);
							return (
								<g key={hour}>
									<line
										className={major ? "tick tick--major" : "tick"}
										x1={x1}
										x2={x2}
										y1={y1}
										y2={y2}
									/>
									{major ? (
										<text
											className="tick-label"
											x={tx}
											y={ty}
										>
											{String(hour).padStart(2, "0")}
										</text>
									) : null}
								</g>
							);
						})}
					</g>
					<circle
						className="ring ring--dash"
						cx={DIAL_CENTER}
						cy={DIAL_CENTER}
						r={R_ARC}
					/>
					<circle
						className="ring"
						cx={DIAL_CENTER}
						cy={DIAL_CENTER}
						r="172"
					/>
					<circle
						className="ring ring--dash"
						cx={DIAL_CENTER}
						cy={DIAL_CENTER}
						r="112"
					/>
					<path
						className="shift-arc"
						d={clock.arc}
					/>
					<g
						className="sun"
						transform={`translate(${clock.sun[0]} ${clock.sun[1]})`}
					>
						<circle
							className="sun__halo"
							r="16"
						/>
						<circle
							className="sun__dot"
							r="8"
						/>
					</g>
					<circle
						className="core"
						cx={DIAL_CENTER}
						cy={DIAL_CENTER}
						fill="url(#core)"
						r="92"
					/>
				</svg>

				<div className="dial__center">
					<span className="dial__label">Manila</span>
					<span className="dial__time">{clock.teamTime}</span>
					<span className="dial__ampm">{clock.teamAmPm}</span>
				</div>

				<div className="orbit orbit--a">
					{DIAL_ORBITS.outer.map((src, index) => (
						<figure
							className={index === 0 ? "orb" : `orb orb--${index + 1}`}
							key={src}
						>
							<img
								alt=""
								src={src}
							/>
						</figure>
					))}
				</div>
				<div className="orbit orbit--b">
					{DIAL_ORBITS.inner.map((src, index) => (
						<figure
							className={index === 0 ? "orb orb--sm" : `orb orb--sm orb--${index + 1}`}
							key={src}
						>
							<img
								alt=""
								src={src}
							/>
						</figure>
					))}
				</div>
			</div>

			<div className="clock-card clock-card--you">
				<span className="clock-card__where">
					{clock.label}, {clock.city}
				</span>
				<span className="clock-card__time">{clock.userTime}</span>
			</div>
			<div className="clock-card clock-card--team">
				<span className="clock-card__legend">
					<i aria-hidden="true" />
					Your team's shift, matched to your 9 to 6
				</span>
			</div>
		</div>
	);
}
