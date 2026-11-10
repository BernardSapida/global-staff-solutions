import { Accordion } from "@heroui/react";
import { Minus, Plus } from "lucide-react";
import { CONTACT_EMAIL, FAQS } from "../landing.content";

/**
 * Common questions as a ruled list with a plus/minus marker.
 * Uses HeroUI's Accordion directly: web-ui's AppAccordion is a card-per-item design and exposes no styling hook.
 * The same list feeds the page's FAQPage JSON-LD.
 */
export function Faq() {
	return (
		<section
			aria-labelledby="faq-title"
			className="faq gss-wrap"
			id="faq"
		>
			<div className="faq__head">
				<h2 id="faq-title">Questions we hear most</h2>
				<p>
					Can't find your answer? <a href={`mailto:${CONTACT_EMAIL}`}>Send us a message</a> and we'll reply within one
					business day.
				</p>
			</div>
			<Accordion
				className="rounded-none border-0! border-t! border-solid! border-[#DCE3EF]! bg-transparent p-0 shadow-none"
				data-cy="landing-faq"
				defaultExpandedKeys={["faq-0"]}
				hideSeparator
			>
				{FAQS.map((faq, index) => (
					<Accordion.Item
						className="group rounded-none border-0! border-b! border-solid! border-[#DCE3EF]! bg-transparent shadow-none"
						id={`faq-${index.toString()}`}
						key={faq.question}
					>
						<Accordion.Heading>
							<Accordion.Trigger className="justify-between gap-6 rounded-none px-0 py-6 text-left text-[1.125rem] font-semibold tracking-[-0.01em] text-[#0E1A33] hover:bg-transparent">
								{faq.question}
								<span
									aria-hidden="true"
									className="shrink-0 text-[#0B2350]"
								>
									<Plus className="size-4 group-data-expanded:hidden" />
									<Minus className="hidden size-4 group-data-expanded:block" />
								</span>
							</Accordion.Trigger>
						</Accordion.Heading>
						<Accordion.Panel>
							<Accordion.Body className="max-w-[40em] px-0 pb-6 pr-12 pt-0 -mt-3 text-base leading-relaxed text-[#5A6680]">
								{faq.answer}
							</Accordion.Body>
						</Accordion.Panel>
					</Accordion.Item>
				))}
			</Accordion>
		</section>
	);
}
