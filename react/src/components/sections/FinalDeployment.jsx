import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TypewriterText } from "@TypewriterText";
import { systemVariants } from "@motion";

// Asset Import
import ctaBg from "@assets/cta.png";

const FinalDeployment = ({ sectionId = "cta-final" }) => {
	const containerRef = React.useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	// Slow parallax zoom and subtle Y movement
	const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);
	const scale = useTransform(scrollYProgress, [0, 1], [1.1, 1.3]);

	return (
		<section
			id={sectionId}
			ref={containerRef}
			className="flex overflow-hidden relative justify-center items-center w-full bg-black border-t min-h-[90vh] border-white/5"
		>
			{/* ── Background Layer ────────────────────────── */}
			<div className="absolute inset-0 z-0">
				<motion.img
					style={{ y, scale }}
					src={ctaBg}
					alt="Deployment Ready"
					className="object-cover w-full h-full opacity-40 grayscale"
				/>
				{/* Gradients to blend the edges */}
				<div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80" />
				<div className="absolute inset-0 bg-black/40" />
			</div>

			{/* ── Content Layer ───────────────────────────── */}
			<div className="flex relative z-10 flex-col justify-center items-center px-6 w-full text-center">
				<motion.div
					className="flex flex-col items-center max-w-fit"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: "-100px" }}
					variants={systemVariants.staggerContainer}
				>
					{/* Top Label */}
					<motion.div
						variants={systemVariants.fadeUp}
						className="flex gap-4 justify-center items-center mb-10"
					>
						<span className="w-8 bg-primary/40 h-[1px]"></span>
						<p className="font-mono uppercase text-primary text-[9px] tracking-[0.6em]">
							Deployment_Ready
						</p>
						<span className="w-8 bg-primary/40 h-[1px]"></span>
					</motion.div>

					{/* Massive Headline */}
					<motion.h2
						variants={systemVariants.fadeUp}
						className="italic font-black tracking-tighter text-white uppercase whitespace-nowrap font-headline text-[13vw] leading-[0.85] lg:text-[8vw]"
					>
						Secure the <br />
						<span
							className="block mt-2 text-transparent"
							style={{ WebkitTextStroke: "1.5px var(--primary)" }}
						>
							Next_Generation
						</span>
					</motion.h2>

					{/* Terminal Description */}
					<div className="mt-12 max-w-sm">
						<TypewriterText
							text="Archive_001 is now live. Limited allocation for field agents and authorized personnel only."
							className="font-mono tracking-tighter leading-relaxed uppercase opacity-80 text-white/70 text-[11px]"
							duration={2}
						/>
					</div>

					{/* ── CTA Actions ─────────────────────────── */}
					<motion.div
						variants={systemVariants.fadeUp}
						className="flex flex-col gap-6 justify-center items-center pt-5 mt-14 w-full sm:flex-row"
					>
						<motion.a
							href="/collections"
							whileHover={{ scale: 1.02, backgroundColor: "var(--primary)" }}
							whileTap={{ scale: 0.98 }}
							className="flex justify-center items-center py-5 px-10 font-mono font-bold uppercase transition-all bg-primary text-background min-w-[260px] text-[10px] tracking-[0.2em]"
						>
							Initialize_Purchase
						</motion.a>

						<motion.a
							href="/search"
							whileHover={{
								backgroundColor: "rgba(255,255,255,0.05)",
								borderColor: "rgba(255,255,255,0.4)",
							}}
							className="flex justify-center items-center py-5 px-10 font-mono text-white uppercase border transition-colors min-w-[260px] border-white/20 text-[10px] tracking-[0.2em]"
						>
							View_Full_Specs
						</motion.a>
					</motion.div>
				</motion.div>
			</div>

			{/* Footer HUD info */}
			<div className="absolute bottom-10 left-10 opacity-30">
				<p className="font-mono tracking-widest text-white uppercase text-[8px]">
					System_V.09 // End_Transmission
				</p>
			</div>
		</section>
	);
};

export default FinalDeployment;
