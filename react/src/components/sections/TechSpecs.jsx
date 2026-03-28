import React from "react";
import { motion } from "framer-motion";
import { systemVariants } from "@motion";
import { TypewriterText } from "@TypewriterText";

// Asset Import
import heroFour from "@assets/hero-four.png";

const TechSpecs = ({ sectionId = "tech-specs" }) => {
	// Animation for the pulsing hotspots
	const pulseVariants = {
		animate: {
			scale: [1, 1.4, 1],
			opacity: [0.7, 0.3, 0.7],
			transition: {
				duration: 2,
				repeat: Infinity,
				ease: "easeInOut",
			},
		},
	};

	// Animation for the floating sneaker
	const floatVariants = {
		animate: {
			y: [0, -20, 0],
			transition: {
				duration: 6,
				repeat: Infinity,
				ease: "easeInOut",
			},
		},
	};

	return (
		<section
			id={sectionId}
			className="flex relative flex-col items-center py-24 w-full border-b lg:py-32 bg-grid-texture border-border bg-background"
		>
			<div className="px-8 mx-auto w-full max-w-7xl">
				{/* ── 01. HEADER ────────────────────────────── */}
				<motion.div
					className="flex flex-col gap-4 items-center mb-24 text-center"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={systemVariants.fadeUp}
				>
					<TypewriterText
						text="Core_Architecture"
						delay={0.2}
						className="font-mono uppercase text-primary text-[10px] tracking-[0.5em]"
					/>
					<h2 className="text-5xl italic font-black tracking-tighter uppercase lg:text-7xl text-foreground font-headline">
						Technical{" "}
						<span
							className="text-transparent"
							style={{ WebkitTextStroke: "1.5px var(--foreground)" }}
						>
							Specs
						</span>
					</h2>
				</motion.div>

				<div className="grid relative grid-cols-1 gap-16 items-center lg:grid-cols-2">
					{/* ── 02. SPEC LIST (Left) ─────────────────── */}
					<div className="flex z-10 flex-col order-2 gap-16 lg:order-1 lg:pr-12">
						{[
							{
								id: "01",
								title: "Kinetic_Mesh",
								desc: "High-density weave designed for maximum airflow and structural integrity during high-velocity movement.",
							},
							{
								id: "02",
								title: "Carbon_Chassis",
								desc: "Internal carbon fiber plate providing 98% energy return on every strike.",
							},
						].map((spec, idx) => (
							<motion.div
								key={spec.id}
								className="pl-6 border-l-2 transition-colors duration-500 group border-border hover:border-primary"
								initial="hidden"
								whileInView="visible"
								viewport={{ once: true }}
								custom={{ delay: 0.3 + idx * 0.2 }}
								variants={systemVariants.fadeRight}
							>
								<TypewriterText
									text={`Component_${spec.id}`}
									delay={0.5 + idx * 0.2}
									className="font-mono tracking-widest uppercase text-muted-foreground text-[8px]"
								/>
								<h3 className="mt-2 text-2xl italic font-bold tracking-tight uppercase text-foreground font-headline">
									{spec.title}
								</h3>
								<p className="mt-3 max-w-sm font-mono leading-relaxed opacity-70 text-muted-foreground text-[11px]">
									{spec.desc}
								</p>
							</motion.div>
						))}
					</div>

					{/* ── 03. TECHNICAL VIEW (Right) ────────────── */}
					<div className="flex order-1 justify-center lg:order-2">
						<motion.div
							className="relative w-full max-w-xl"
							initial={{ opacity: 0, scale: 0.9 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
						>
							<motion.img
								src={heroFour}
								alt="Technical View"
								className="object-contain w-full h-auto drop-shadow-[0_40px_80px_rgba(0,0,0,0.5)]"
								variants={floatVariants}
								animate="animate"
							/>

							{/* Technical Hotspots - Corrected Mapping */}
							{[
								{ id: 1, top: "25%", left: "18%", delay: 0 }, // Toe Box
								{ id: 2, top: "40%", right: "12%", delay: 0.8 }, // Heel / Collar (Moved up)
								{ id: 3, top: "70%", left: "45%", delay: 0.5 }, // Midsole / Arch
							].map((pos) => (
								<div
									key={pos.id}
									className="absolute z-20 w-4 h-4"
									style={{
										top: pos.top,
										left: pos.left,
										right: pos.right,
										transform: "translate(-50%, -50%)", // Centers the dot on the coordinate
									}}
								>
									<motion.div
										className="absolute inset-0 rounded-full bg-primary"
										variants={pulseVariants}
										animate="animate"
										transition={{ delay: pos.delay }}
									/>
									<div className="relative w-full h-full rounded-full border-2 bg-primary border-background" />
								</div>
							))}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default TechSpecs;
