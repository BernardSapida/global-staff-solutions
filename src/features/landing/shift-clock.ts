import { useEffect, useState } from "react";

export const TEAM_TZ = "Asia/Manila";
/** The client's local business hours the team's shift is matched to. */
const BUSINESS_START = 9;
const BUSINESS_END = 18;

export const DIAL_CENTER = 300;
export const R_OUTER = 286;
export const R_ARC = 232;

/** angle 0 = midnight at the top, clockwise */
export const polar = (hour: number, r: number): [number, number] => {
	const a = (hour / 24) * Math.PI * 2 - Math.PI / 2;
	return [DIAL_CENTER + r * Math.cos(a), DIAL_CENTER + r * Math.sin(a)];
};

function tzOffsetHours(tz: string, date: Date): number {
	const parts = new Intl.DateTimeFormat("en-US", {
		day: "2-digit",
		hour: "2-digit",
		hourCycle: "h23",
		minute: "2-digit",
		month: "2-digit",
		second: "2-digit",
		timeZone: tz,
		year: "numeric",
	})
		.formatToParts(date)
		.reduce<Record<string, string>>((acc, part) => {
			acc[part.type] = part.value;
			return acc;
		}, {});
	const asUtc = Date.UTC(
		Number(parts.year),
		Number(parts.month) - 1,
		Number(parts.day),
		Number(parts.hour) % 24,
		Number(parts.minute),
		Number(parts.second),
	);
	return (asUtc - Math.floor(date.getTime() / 1000) * 1000) / 3600000;
}

const mod24 = (n: number) => ((n % 24) + 24) % 24;

function arcPath(startH: number, endH: number, r: number): string {
	const span = mod24(endH - startH);
	const [sx, sy] = polar(startH, r);
	const [ex, ey] = polar(startH + span, r);
	return `M ${sx} ${sy} A ${r} ${r} 0 ${span > 12 ? 1 : 0} 1 ${ex} ${ey}`;
}

export interface ShiftClock {
	arc: string;
	/** `Client` when the visitor already shares Manila's clock, otherwise `You`. */
	label: string;
	city: string;
	onShift: boolean;
	statusText: string;
	sun: [number, number];
	teamAmPm: string;
	teamTime: string;
	userTime: string;
}

/** What the server renders and the first client frame hydrates against: no clock is read. */
export const INITIAL_SHIFT_CLOCK: ShiftClock = {
	arc: "",
	city: "your city",
	label: "You",
	onShift: true,
	statusText: "on shift",
	sun: [DIAL_CENTER, DIAL_CENTER - R_ARC],
	teamAmPm: "AM",
	teamTime: "9:00",
	userTime: "--:--",
};

function readClock(now: Date): ShiftClock {
	let userTz = Intl.DateTimeFormat().resolvedOptions().timeZone || TEAM_TZ;
	let label = "You";
	// A visitor already on Manila's clock is compared against a typical client city instead.
	if (tzOffsetHours(userTz, now) === tzOffsetHours(TEAM_TZ, now)) {
		userTz = "America/New_York";
		label = "Client";
	}
	const city = (userTz.split("/").pop() || "your city").replace(/_/g, " ");

	const diff = tzOffsetHours(TEAM_TZ, now) - tzOffsetHours(userTz, now);
	const startTeam = mod24(BUSINESS_START + diff);
	const endTeam = mod24(BUSINESS_END + diff);

	const teamParts = new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		timeZone: TEAM_TZ,
	}).formatToParts(now);
	const part = (type: string) => teamParts.find((p) => p.type === type)?.value ?? "";
	const userTime = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit", timeZone: userTz }).format(
		now,
	);

	const teamHour = (now.getUTCHours() + now.getUTCMinutes() / 60 + tzOffsetHours(TEAM_TZ, now) + 24) % 24;
	const sinceStart = mod24(teamHour - startTeam);
	const span = mod24(endTeam - startTeam);
	const onShift = sinceStart < span;

	return {
		arc: arcPath(startTeam, endTeam, R_ARC),
		city,
		label,
		onShift,
		statusText: onShift ? "on shift" : `back on shift in ${Math.max(1, Math.round(24 - sinceStart))}h`,
		sun: polar(teamHour, R_ARC),
		teamAmPm: part("dayPeriod"),
		teamTime: `${part("hour")}:${part("minute")}`,
		userTime,
	};
}

/** Live Manila-vs-visitor clock. Starts from a clock-free value so SSR and hydration agree. */
export function useShiftClock(): ShiftClock {
	const [clock, setClock] = useState<ShiftClock>(INITIAL_SHIFT_CLOCK);

	useEffect(() => {
		const tick = () => setClock(readClock(new Date()));
		tick();
		const id = window.setInterval(tick, 15000);
		return () => window.clearInterval(id);
	}, []);

	return clock;
}
