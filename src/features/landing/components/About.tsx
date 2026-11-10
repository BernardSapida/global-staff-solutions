import { useEffect, useRef, useState } from "react";
import { ABOUT } from "../landing.content";

/** Words light up as the statement scrolls through the viewport. */
function useScrollLitWords(wordCount: number) {
	const ref = useRef<HTMLParagraphElement>(null);
	const [lit, setLit] = useState(0);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			setLit(wordCount);
			return;
		}
		let ticking = false;
		const update = () => {
			const rect = el.getBoundingClientRect();
			const vh = window.innerHeight;
			const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.35)));
			setLit(Math.round(progress * wordCount));
			ticking = false;
		};
		const onScroll = () => {
			if (ticking) return;
			ticking = true;
			requestAnimationFrame(update);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		update();
		return () => window.removeEventListener("scroll", onScroll);
	}, [wordCount]);

	return { lit, ref };
}

/** The "who we are" statement with its two key facts. */
export function About() {
	const words = ABOUT.statement.trim().split(/\s+/);
	const { lit, ref } = useScrollLitWords(words.length);

	return (
		<section
			aria-label="About GSS"
			className="statement gss-wrap"
		>
			<div className="statement__media">
				<img
					alt={ABOUT.imageAlt}
					height={1100}
					loading="lazy"
					src={ABOUT.image}
					width={1000}
				/>
				<div className="statement__tag">
					<strong>{ABOUT.tag.stat}</strong>
					<span>{ABOUT.tag.text}</span>
				</div>
			</div>
			<div className="statement__body">
				<h2 className="sr-only">About GSS</h2>
				<p
					className="reveal-text"
					ref={ref}
				>
					{words.map((word, index) => (
						<span key={`${word}-${index.toString()}`}>
							<span className={index < lit ? "w is-lit" : "w"}>{word}</span>{" "}
						</span>
					))}
				</p>
				<ul className="statement__facts">
					{ABOUT.facts.map((fact) => (
						<li key={fact.title}>
							<strong>{fact.title}</strong>
							<span>{fact.body}</span>
						</li>
					))}
				</ul>
			</div>
		</section>
	);
}
