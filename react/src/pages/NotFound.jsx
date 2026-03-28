import React from "react";
import { motion } from "framer-motion";
import { TypewriterText } from "@TypewriterText";
import { systemVariants } from "@motion";
import { ObservedSection } from "@components/context/ObservedSection";

const NotFound = () => {
	return (
		<ObservedSection id="NOT_FOUND">
			<section className="flex overflow-hidden relative justify-center items-center w-full min-h-screen bg-background mt-[-10vh]">
				{/* ── Background Elements ─────────────────────── */}
				<div className="absolute inset-0 z-0">
					<div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#ef4444_0%,_transparent_65%)] opacity-[0.05]" />
					<div className="absolute inset-0 opacity-10 pointer-events-none bg-grid-texture" />

					{/* Subtle Scanline Overlay */}
					<div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
				</div>

				{/* ── Main Content ────────────────────────────── */}
				<div className="flex relative z-10 flex-col justify-center items-center px-6 w-full text-center">
					<motion.div
						initial="hidden"
						animate="visible"
						variants={systemVariants.staggerContainer}
						className="flex flex-col items-center"
					>
						{/* Error Tag */}
						<motion.div
							variants={systemVariants.fadeUp}
							className="flex gap-4 justify-center items-center mb-10"
						>
							<span className="w-8 h-[1px] bg-red-500/40" />
							<p className="font-mono text-red-500 uppercase animate-pulse text-[10px] tracking-[0.6em]">
								Error_Code: 404
							</p>
							<span className="w-8 h-[1px] bg-red-500/40" />
						</motion.div>

						{/* Glitch Headline */}
						<motion.h1
							variants={systemVariants.fadeUp}
							className="pb-4 italic font-black tracking-tighter uppercase text-foreground font-headline text-[14vw] leading-[0.85] lg:text-[9vw]"
						>
							Signal <br />
							<span
								className="block mt-2 text-transparent"
								style={{ WebkitTextStroke: "1.5px var(--foreground)" }}
							>
								Fragmented
							</span>
						</motion.h1>

						{/* Diagnostic Box */}
						<motion.div
							variants={systemVariants.fadeUp}
							className="overflow-hidden relative p-8 mt-12 w-full border md:max-w-md border-white/10 max-w-[90vw] bg-white/[0.02] backdrop-blur-sm"
						>
							<div className="absolute top-0 left-0 w-full h-[1px] bg-red-500/20" />

							<div className="flex gap-2 justify-center items-center mb-6 font-mono tracking-widest text-red-500 uppercase text-[10px]">
								<span className="w-1.5 h-1.5 bg-red-500 animate-pulse" />
								Diagnostic_Report //
							</div>

							{/* FORCE WRAP CONTAINER */}
							<div className="flex flex-wrap justify-center w-full">
								<div className="w-full max-w-full whitespace-normal overflow-wrap-anywhere">
									<TypewriterText
										text="The requested coordinate does not exist in the Archive. Packet loss detected. Connection terminated by host."
										className="block w-full font-mono tracking-tight leading-relaxed uppercase whitespace-normal break-words opacity-70 text-muted-foreground text-[10px]"
										delay={1}
									/>
								</div>
							</div>
						</motion.div>

						{/* Recovery Button */}
						<motion.div variants={systemVariants.fadeUp} className="pt-6 mt-14">
							<motion.a
								href="/"
								whileHover={{
									scale: 1.05,
									backgroundColor: "#ffffff",
									color: "#000000",
								}}
								whileTap={{ scale: 0.95 }}
								className="inline-flex relative gap-4 items-center py-5 px-12 font-mono font-bold uppercase transition-all bg-primary text-background group text-[10px] tracking-[0.2em]"
							>
								Re-Establish_Uplink
								<span className="transition-transform group-hover:translate-x-1">
									→
								</span>
							</motion.a>
						</motion.div>
					</motion.div>
				</div>

				{/* Footer Branding */}
				<div className="absolute bottom-10 left-10 opacity-30">
					<p className="font-mono tracking-widest uppercase text-foreground text-[8px]">
						Protocol: Fail_Safe // Ver: 1.0.4
					</p>
				</div>
			</section>
		</ObservedSection>
	);
};

export default NotFound;
