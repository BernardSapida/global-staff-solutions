import { useState } from "react";
import type { TeamCountryKey, TeamLevelKey, TeamRoleKey, TeamRow } from "../landing.content";
import { BOOK_MEETING_MAILTO, DEFAULT_TEAM, TEAM_COUNTRIES, TEAM_LEVELS, TEAM_ROLES } from "../landing.content";
import { formatNumber, MAX_QTY, rowCost, teamTotals } from "../team-cost";
import { CompactSelect } from "./CompactSelect";

const ROLE_KEYS = Object.keys(TEAM_ROLES) as TeamRoleKey[];
const LEVEL_KEYS = Object.keys(TEAM_LEVELS) as TeamLevelKey[];
const COUNTRY_KEYS = Object.keys(TEAM_COUNTRIES) as TeamCountryKey[];

function Money({ cls = "", cur, value }: { cls?: string; cur: string; value: number }) {
	return (
		<span className={`tb__money ${cls}`.trim()}>
			<small>{cur}</small>
			{formatNumber(value)}
		</span>
	);
}

/** The cost calculator: build a team, compare a local hire with GSS, see the monthly saving. */
export function TeamBuilder() {
	const [team, setTeam] = useState<TeamRow[]>(() => DEFAULT_TEAM.map((row) => ({ ...row })));
	const [country, setCountry] = useState<TeamCountryKey>("US");
	const [newIndex, setNewIndex] = useState(-1);
	const cur = TEAM_COUNTRIES[country].cur;
	const totals = teamTotals(team, country);

	const update = (index: number, patch: Partial<TeamRow>) => {
		setNewIndex(-1);
		setTeam((rows) => rows.map((row, i) => (i === index ? { ...row, ...patch } : row)));
	};

	const addRole = (role: TeamRoleKey) => {
		const existing = team.findIndex((row) => row.role === role && row.level === "mid");
		if (existing > -1) {
			setNewIndex(existing);
			setTeam((rows) => rows.map((row, i) => (i === existing ? { ...row, qty: Math.min(MAX_QTY, row.qty + 1) } : row)));
		} else {
			setNewIndex(team.length);
			setTeam((rows) => [...rows, { level: "mid", qty: 1, role }]);
		}
	};

	return (
		<section
			aria-labelledby="savings-title"
			className="savings"
			id="savings"
		>
			<div className="savings__panel">
				<div className="savings__intro">
					<h2 id="savings-title">See how much you can save before you hire</h2>
					<p>
						GSS delivers the same role at a fraction of the fully loaded local cost, turning high fixed overheads into
						one predictable monthly rate. Teams of 5 to 10 typically save $150K to $450K a year.
					</p>
					<div className="savings__ctas">
						<a
							className="btn btn--primary"
							href={BOOK_MEETING_MAILTO}
						>
							Get pricing
						</a>
						<a
							className="btn btn--outline"
							href={BOOK_MEETING_MAILTO}
						>
							Book a meeting
						</a>
					</div>
				</div>

				<div className="browser">
					<div
						aria-hidden="true"
						className="browser__bar"
					>
						<span className="browser__dots">
							<i />
							<i />
							<i />
						</span>
						<span className="browser__url">
							<svg
								aria-hidden="true"
								viewBox="0 0 16 16"
							>
								<rect
									height="6.5"
									rx="1.5"
									width="9"
									x="3.5"
									y="7"
								/>
								<path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
							</svg>
							gssglobalstaffsolutions.com/team-builder
						</span>
					</div>

					<div
						className="tb"
						id="team-builder"
					>
						<div className="tb__head">
							<div>
								<h3>GSS Team Builder</h3>
								<p>Build your team to see monthly costs side by side.</p>
							</div>
							<div className="tb__controls">
								<div className="tb__add">
									<CompactSelect
										aria-label="Add a team member"
										items={ROLE_KEYS.map((key) => ({ label: TEAM_ROLES[key].name, value: key }))}
										onChange={(value) => addRole(value as TeamRoleKey)}
										placeholder="Add team member"
										tone="solid"
										value={null}
									/>
								</div>
								<div className="tb__country">
									<CompactSelect
										aria-label="Compare against"
										items={COUNTRY_KEYS.map((key) => ({ label: TEAM_COUNTRIES[key].name, value: key }))}
										onChange={(value) => setCountry(value as TeamCountryKey)}
										value={country}
									/>
								</div>
							</div>
						</div>

						<div
							aria-label="Your team"
							className="tb__table"
							role="table"
						>
							<div
								className="tb__row tb__row--head"
								role="row"
							>
								<span role="columnheader">Role</span>
								<span role="columnheader">Staff</span>
								<span role="columnheader">Experience</span>
								<span
									className="num"
									role="columnheader"
								>
									Local hire
								</span>
								<span
									className="num"
									role="columnheader"
								>
									With GSS
								</span>
								<span
									className="num"
									role="columnheader"
								>
									You save
								</span>
								<span role="columnheader">
									<span className="sr-only">Remove</span>
								</span>
							</div>
							<div role="rowgroup">
								{team.map((row, index) => {
									const role = TEAM_ROLES[row.role];
									const cost = rowCost(row, country);
									return (
										<div
											className={index === newIndex ? "tb__row is-new" : "tb__row"}
											key={`${row.role}-${row.level}`}
											role="row"
										>
											<span
												className="tb__role"
												role="cell"
											>
												{role.name}
											</span>
											<span
												className="stepper"
												role="cell"
											>
												<button
													aria-label={`Fewer ${role.name}s`}
													disabled={row.qty <= 1}
													onClick={() => update(index, { qty: Math.max(1, row.qty - 1) })}
													type="button"
												>
													&minus;
												</button>
												<output aria-live="polite">{row.qty}</output>
												<button
													aria-label={`More ${role.name}s`}
													disabled={row.qty >= MAX_QTY}
													onClick={() => update(index, { qty: Math.min(MAX_QTY, row.qty + 1) })}
													type="button"
												>
													+
												</button>
											</span>
											<span
												className="tb__exp"
												role="cell"
											>
												<CompactSelect
													aria-label={`${role.name} experience`}
													items={LEVEL_KEYS.map((key) => ({ label: TEAM_LEVELS[key].name, value: key }))}
													onChange={(value) => update(index, { level: value as TeamLevelKey })}
													value={row.level}
												/>
											</span>
											<span role="cell">
												<Money
													cur={cur}
													value={cost.local}
												/>
											</span>
											<span role="cell">
												<Money
													cls="tb__money--gss"
													cur={cur}
													value={cost.gss}
												/>
											</span>
											<span role="cell">
												<Money
													cls="tb__money--save"
													cur={cur}
													value={cost.save}
												/>
											</span>
											<span role="cell">
												<button
													aria-label={`Remove ${role.name}`}
													className="tb__remove"
													onClick={() => {
														setNewIndex(-1);
														setTeam((rows) => rows.filter((_, i) => i !== index));
													}}
													type="button"
												>
													<svg
														aria-hidden="true"
														viewBox="0 0 10 10"
													>
														<path d="m1 1 8 8M9 1 1 9" />
													</svg>
												</button>
											</span>
										</div>
									);
								})}
							</div>
							{team.length === 0 ? <p className="tb__empty">Your team is empty. Add a role above to start.</p> : null}
						</div>

						<dl className="tb__totals">
							<div>
								<dt>Monthly cost of hiring locally</dt>
								<dd>
									{cur} {formatNumber(totals.local)}
								</dd>
							</div>
							<div>
								<dt>Monthly savings with GSS</dt>
								<dd className="is-save">
									{cur} {formatNumber(totals.save)}
								</dd>
							</div>
						</dl>

						<div className="tb__total">
							<span>Estimated monthly cost with GSS</span>
							<strong>
								<small>{cur}</small>
								<span>{formatNumber(totals.gss)}</span>
							</strong>
						</div>

						<div className="tb__foot">
							<button
								className="tb__link"
								onClick={() => {
									setNewIndex(-1);
									setTeam(DEFAULT_TEAM.map((row) => ({ ...row })));
								}}
								type="button"
							>
								<svg
									aria-hidden="true"
									viewBox="0 0 16 16"
								>
									<path d="M2.5 8a5.5 5.5 0 1 0 1.7-4" />
									<path d="M2.5 2.5V5H5" />
								</svg>
								Reset team
							</button>
							<a
								className="btn btn--primary btn--sm"
								href={BOOK_MEETING_MAILTO}
							>
								Get an exact quote
							</a>
						</div>
					</div>
				</div>
			</div>
			<p className="savings__note gss-wrap">
				Estimates use average fully loaded local costs including salary, benefits, tax and overhead. Your quote depends
				on role seniority and schedule.
			</p>
		</section>
	);
}
