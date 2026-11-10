import type { TeamCountryKey, TeamRow } from "./landing.content";
import { TEAM_COUNTRIES, TEAM_LEVELS, TEAM_ROLES } from "./landing.content";

export interface TeamCost {
	gss: number;
	local: number;
	save: number;
}

/** GSS rate is set in USD and converted; the local-hire cost scales by market. */
export function rowCost(row: TeamRow, country: TeamCountryKey): TeamCost {
	const c = TEAM_COUNTRIES[country];
	const role = TEAM_ROLES[row.role];
	const k = TEAM_LEVELS[row.level].k;
	const local = role.us * k * c.local * c.fx * row.qty;
	const gss = role.us * role.ratio * k * c.fx * row.qty;
	return { gss, local, save: local - gss };
}

export function teamTotals(rows: TeamRow[], country: TeamCountryKey): TeamCost {
	return rows.reduce<TeamCost>(
		(total, row) => {
			const cost = rowCost(row, country);
			return { gss: total.gss + cost.gss, local: total.local + cost.local, save: total.save + cost.save };
		},
		{ gss: 0, local: 0, save: 0 },
	);
}

export const MAX_QTY = 50;
export const formatNumber = (value: number) =>
	new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(value);
