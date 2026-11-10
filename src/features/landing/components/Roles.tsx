import type { KeyboardEvent } from "react";
import { useEffect, useRef, useState } from "react";
import { ROLE_CATEGORIES } from "../landing.content";

/** Pick a function on the left, see the roles GSS hires for most on the right. */
export function Roles() {
	const [activeId, setActiveId] = useState(ROLE_CATEGORIES[0].id);
	const [shownId, setShownId] = useState(ROLE_CATEGORIES[0].id);
	const [swapping, setSwapping] = useState(false);
	const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
	const active = ROLE_CATEGORIES.find((c) => c.id === activeId) ?? ROLE_CATEGORIES[0];
	const shown = ROLE_CATEGORIES.find((c) => c.id === shownId) ?? ROLE_CATEGORIES[0];

	// Cross-fade: fade out, preload the next photo, swap it in, fade back.
	useEffect(() => {
		if (activeId === shownId) return;
		setSwapping(true);
		const next = ROLE_CATEGORIES.find((c) => c.id === activeId);
		const preload = new Image();
		const done = () => {
			setShownId(activeId);
			requestAnimationFrame(() => setSwapping(false));
		};
		preload.onload = done;
		preload.onerror = done;
		preload.src = next?.image ?? "";
	}, [activeId, shownId]);

	// Warm the cache so switching feels instant.
	useEffect(() => {
		for (const category of ROLE_CATEGORIES.slice(1)) new Image().src = category.image;
	}, []);

	const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
		const dir = { ArrowDown: 1, ArrowLeft: -1, ArrowRight: 1, ArrowUp: -1 }[event.key];
		if (!dir) return;
		event.preventDefault();
		const next = ROLE_CATEGORIES[(index + dir + ROLE_CATEGORIES.length) % ROLE_CATEGORIES.length];
		setActiveId(next.id);
		tabRefs.current[next.id]?.focus();
	};

	return (
		<section
			aria-labelledby="roles-title"
			className="roles gss-wrap"
			id="roles"
		>
			<div className="section-head">
				<h2 id="roles-title">Roles you can fill this month</h2>
				<p>
					Pick a function to see the roles we hire for most. Every candidate is screened for skills, English and culture
					fit before you meet them.
				</p>
			</div>

			<div className="roles__layout">
				<div
					aria-label="Role categories"
					className="roles__list"
					role="tablist"
				>
					{ROLE_CATEGORIES.map((category, index) => (
						<button
							aria-controls="role-panel"
							aria-selected={category.id === activeId}
							className="role-tab"
							key={category.id}
							onClick={() => setActiveId(category.id)}
							onKeyDown={(event) => onKeyDown(event, index)}
							ref={(node) => {
								tabRefs.current[category.id] = node;
							}}
							role="tab"
							tabIndex={category.id === activeId ? 0 : -1}
							type="button"
						>
							<span className="role-tab__name">{category.name}</span>
							<span className="role-tab__desc">{category.description}</span>
						</button>
					))}
				</div>

				<div
					aria-live="polite"
					className="roles__panel"
					id="role-panel"
					role="tabpanel"
				>
					<img
						alt={`${active.name} team`}
						className={swapping ? "is-swapping" : undefined}
						loading="lazy"
						src={shown.image}
					/>
					<div
						className="roles__chips"
						key={active.id}
					>
						{active.roles.map((role, index) => (
							<span
								key={role}
								style={{ "--i": index } as React.CSSProperties}
							>
								{role}
							</span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
