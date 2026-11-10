import { ArrowUpRight } from "lucide-react";
import { BOOK_MEETING_MAILTO, HERO_AVATARS } from "../landing.content";
import { useShiftClock } from "../shift-clock";
import { ShiftDial } from "./ShiftDial";

const delay = (n: number) => ({ "--d": n }) as React.CSSProperties;

/** The hero: headline, calls to action and the live follow-the-sun dial. */
export function Landing() {
	const clock = useShiftClock();

	return (
		<section
			aria-labelledby="hero-title"
			className="hero"
		>
			<div className="hero__panel">
				<div
					aria-hidden="true"
					className="hero__grid"
				/>
				<div
					aria-hidden="true"
					className="hero__glow"
				/>

				<div className="hero__copy">
					<p
						className="hero__kicker load"
						style={delay(0)}
					>
						<span
							aria-hidden="true"
							className={clock.onShift ? "pulse" : "pulse is-off"}
						/>
						<span>
							Your team in Manila is <strong>{clock.statusText}</strong>
						</span>
					</p>
					<h1
						className="hero__title load"
						id="hero-title"
						style={delay(1)}
					>
						Skilled offshore staff, working your&nbsp;hours.
					</h1>
					<p
						className="hero__lede load"
						style={delay(2)}
					>
						GSS recruits, equips and looks after dedicated professionals in the Philippines. You direct the work. We
						handle hiring, payroll, HR, equipment and compliance, at up to 70% less than hiring locally.
					</p>
					<div
						className="hero__ctas load"
						style={delay(3)}
					>
						<a
							className="btn btn--gold"
							href="#savings"
						>
							Get pricing
							<span
								aria-hidden="true"
								className="btn__chip"
							>
								<ArrowUpRight />
							</span>
						</a>
						<a
							className="btn btn--ghost"
							href={BOOK_MEETING_MAILTO}
						>
							Book a meeting
						</a>
					</div>

					<div
						className="hero__proof load"
						style={delay(4)}
					>
						<div
							aria-hidden="true"
							className="avatars"
						>
							{HERO_AVATARS.map((src) => (
								<img
									alt=""
									key={src}
									src={src}
								/>
							))}
						</div>
						<p>
							<strong>Live in 15 to 25 days.</strong>
							<br />
							From first call to a team that's working.
						</p>
					</div>
				</div>

				<ShiftDial clock={clock} />
			</div>
		</section>
	);
}
