import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TypewriterText } from "@TypewriterText";
import { systemVariants } from "@motion";

const faqs = [
	{
		question: "How does the Carbon_Chassis affect energy return?",
		answer:
			"The chassis uses a dual-density carbon weave that compresses under vertical load and snaps back at 94% efficiency. This provides a mechanical advantage during uphill sprints and rapid direction changes.",
	},
	{
		question: "Is the Kinetic_Mesh waterproof?",
		answer:
			"While not fully waterproof to maintain breathability, the mesh is treated with a DWR (Durable Water Repellent) coating that sheds precipitation in Sector_04 environments while allowing internal thermal regulation.",
	},
	{
		question: "What is the estimated lifecycle of the outsole?",
		answer:
			"Engineered for 800km of high-impact terrain. The high-abrasion rubber compound is designed to wear evenly, maintaining traction integrity throughout the lifecycle of the silhouette.",
	},
];

const TechnicalIntelligence = ({ sectionId = "faq-technical" }) => {
	const [activeIndex, setActiveIndex] = useState(null);

	const toggleAccordion = (index) => {
		setActiveIndex(activeIndex === index ? null : index);
	};

	return (
		<section
			id={sectionId}
			className="flex relative justify-center py-24 border-b lg:py-32 bg-grid-texture bg-background border-border"
		>
			<div className="px-8 mx-auto w-full max-w-7xl">
				<div className="flex flex-col gap-16 lg:flex-row lg:gap-32 lg:items-start">
					{/* ── Sidebar (Sticky) ────────────────────────── */}
					<div className="w-full lg:sticky lg:top-32 lg:w-1/3 h-fit">
						<motion.div
							className="space-y-6"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={systemVariants.fadeUp}
						>
							<TypewriterText
								text="System_Queries // FAQ"
								className="font-mono uppercase text-primary text-[10px] tracking-[0.5em]"
							/>
							<h2 className="text-5xl italic font-black tracking-tighter uppercase lg:text-6xl text-foreground font-headline leading-[0.9]">
								Technical <br />
								<span
									className="text-transparent"
									style={{ WebkitTextStroke: "1px var(--foreground)" }}
								>
									Intelligence
								</span>
							</h2>

							<div className="pt-8 space-y-4">
								<div className="flex gap-3 items-center">
									<div className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary shadow-[0_0_8px_#4ade80]" />
									<TypewriterText
										text="Server_Status: Optimal"
										className="font-mono tracking-widest uppercase text-foreground text-[9px]"
									/>
								</div>
								<p className="font-mono leading-relaxed uppercase opacity-60 text-muted-foreground max-w-[240px] text-[9px]">
									All technical parameters and mechanical specifications are
									verified for Archive_001.
								</p>
							</div>
						</motion.div>
					</div>

					{/* ── Accordion List ──────────────────────────── */}
					<div className="w-full lg:w-2/3">
						<div className="border-t divide-y lg:border-t-0 divide-foreground/10 border-foreground/10">
							{faqs.map((faq, i) => {
								const isActive = activeIndex === i;

								return (
									<div key={i} className="overflow-hidden group">
										<button
											onClick={() => toggleAccordion(i)}
											className="flex justify-between items-center py-10 w-full text-left cursor-pointer outline-none"
										>
											<span className="flex gap-8 items-center">
												<span
													className={`text-primary font-mono text-[10px] transition-opacity duration-500 ${isActive ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}
												>
													0{i + 1}_
												</span>
												<span
													className={`font-headline text-xl font-bold tracking-tight uppercase italic transition-colors duration-500 lg:text-2xl ${isActive ? "text-primary" : "text-foreground group-hover:text-primary"}`}
												>
													{faq.question}
												</span>
											</span>

											{/* Animated Plus/Cross Icon */}
											<div className="relative w-5 h-5 shrink-0">
												<span
													className={`bg-foreground absolute inset-0 m-auto h-[1.5px] w-full transition-transform duration-500 ${isActive ? "rotate-[225deg]" : "rotate-0"}`}
												/>
												<span
													className={`bg-foreground absolute inset-0 m-auto h-full w-[1.5px] transition-transform duration-500 ${isActive ? "rotate-[225deg]" : "rotate-0"}`}
												/>
											</div>
										</button>

										<AnimatePresence>
											{isActive && (
												<motion.div
													initial={{ height: 0, opacity: 0 }}
													animate={{ height: "auto", opacity: 1 }}
													exit={{ height: 0, opacity: 0 }}
													transition={{
														duration: 0.5,
														ease: [0.22, 1, 0.36, 1],
													}}
												>
													<div className="pb-10 pl-16 lg:pl-20">
														<p className="max-w-xl text-sm tracking-tight leading-relaxed uppercase opacity-80 text-muted-foreground font-body">
															{faq.answer}
														</p>
													</div>
												</motion.div>
											)}
										</AnimatePresence>
									</div>
								);
							})}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TechnicalIntelligence;
