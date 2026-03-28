import React from "react";
import { motion } from "framer-motion";
import { TypewriterText } from "@TypewriterText";

const BrandTicker = ({ sectionId = "brand-ticker" }) => {
	const tickerLeftVariants = {
		animate: {
			x: [0, -1000],
			transition: {
				x: {
					repeat: Infinity,
					repeatType: "loop",
					duration: 20,
					ease: "linear",
				},
			},
		},
	};

	const tickerRightVariants = {
		animate: {
			x: [-1000, 0],
			transition: {
				x: {
					repeat: Infinity,
					repeatType: "loop",
					duration: 25,
					ease: "linear",
				},
			},
		},
	};

	return (
		<section
			id={sectionId}
			className="overflow-hidden py-6 w-full lg:py-12 border-border bg-background border-y"
		>
			{/* ── 01. TOP TICKER (Left) ────────────────────── */}
			<div className="flex overflow-hidden py-2 whitespace-nowrap">
				<motion.div
					className="flex items-center"
					variants={tickerLeftVariants}
					animate="animate"
				>
					{[...Array(12)].map((_, i) => (
						<div key={i} className="flex gap-12 items-center px-6">
							<span className="text-5xl italic font-black tracking-tighter uppercase lg:text-8xl text-primary">
								Engineered for Motion
							</span>
							<span className="w-4 h-4 rounded-full bg-foreground/20" />
							<span className="font-mono text-xl font-light uppercase text-foreground/40 tracking-[0.4em]">
								v1.026_EST
							</span>
							<span className="w-4 h-4 rounded-full bg-foreground/20" />
						</div>
					))}
				</motion.div>
			</div>

			{/* ── 02. SYSTEM DIAGNOSTIC DIVIDER ────────────── */}
			<div className="flex justify-between items-center py-6 px-12 opacity-30">
				<div className="flex-1 bg-foreground h-[1px]" />
				<div className="px-8">
					<TypewriterText
						text="System_Diagnostic_Running"
						delay={0.5}
						duration={2}
						loopDelay={5}
						className="font-mono uppercase text-foreground/90 text-[9px] tracking-[0.6em]"
					/>
				</div>
				<div className="flex-1 bg-foreground h-[1px]" />
			</div>

			{/* ── 03. BOTTOM TICKER (Right) ─────────────────── */}
			<div className="flex overflow-hidden py-2 whitespace-nowrap">
				<motion.div
					className="flex items-center"
					variants={tickerRightVariants}
					animate="animate"
				>
					{[...Array(12)].map((_, i) => (
						<div key={i} className="flex gap-12 items-center px-6">
							<span
								className="text-5xl italic font-black tracking-tighter text-transparent uppercase lg:text-8xl"
								style={{ WebkitTextStroke: "1px var(--foreground)" }}
							>
								Blue Hour Series
							</span>
							<span className="font-mono text-2xl italic font-bold opacity-80 text-foreground">
								// 0{(i % 6) + 1}
							</span>
						</div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default BrandTicker;
