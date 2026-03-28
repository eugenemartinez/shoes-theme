import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { systemVariants } from "@motion";
import { TypewriterText } from "@TypewriterText";

// Asset Import
import testimonialImg from "@assets/testimonial.jpeg";

const Lookbook = ({ sectionId = "lookbook" }) => {
	const containerRef = React.useRef(null);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start end", "end start"],
	});

	// Parallax effect for the field test image
	const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

	return (
		<section
			id={sectionId}
			ref={containerRef}
			className="overflow-hidden relative border-b bg-grid-texture bg-background border-border"
		>
			<div className="flex flex-col min-h-screen lg:flex-row">
				{/* ── 01. IMAGE PANEL (Left) ────────────────── */}
				<div className="overflow-hidden relative w-full border-r lg:w-1/2 lg:h-screen border-border h-[70vh]">
					<motion.img
						style={{ y, scale: 1.2 }}
						src={testimonialImg}
						alt="Operational Field Test"
						className="object-cover absolute inset-0 w-full h-full brightness-50 contrast-125 grayscale"
					/>

					<div className="absolute inset-0 bg-gradient-to-t via-transparent to-transparent opacity-80 from-background" />

					{/* HUD Elements */}
					<div className="flex absolute top-12 left-12 gap-4 items-center">
						<div className="w-1.5 h-1.5 rounded-full animate-pulse bg-primary shadow-[0_0_8px_#4ade80]" />
						<p className="font-mono uppercase text-[10px] tracking-[0.4em] text-white/40">
							Live_Feed // Operational
						</p>
					</div>

					<motion.div
						className="absolute bottom-12 left-12"
						initial={{ opacity: 0, x: -20 }}
						whileInView={{ opacity: 1, x: 0 }}
						viewport={{ once: true }}
					>
						<p className="font-mono tracking-widest uppercase text-foreground/90 text-[11px]">
							Subject: 08-X // Terrain_Test
						</p>
						<div className="mt-2 w-12 bg-primary/50 h-[1px]" />
					</motion.div>
				</div>

				{/* ── 02. CONTENT PANEL (Right) ─────────────── */}
				<div className="flex flex-col justify-center py-10 px-4 w-full lg:px-24 lg:w-1/2 bg-background">
					<div className="mx-auto space-y-10 max-w-xl">
						{/* Main Quote */}
						<motion.div
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true, margin: "-100px" }}
							variants={systemVariants.fadeUp}
						>
							<TypewriterText
								text="User_Testimonial"
								className="mb-5 font-mono uppercase text-primary text-[11px] tracking-[0.5em]"
							/>
							<h2 className="text-6xl italic font-black tracking-tighter uppercase lg:text-8xl font-headline text-foreground leading-[0.9]">
								"Propulsion <br />
								over <br />
								<span
									className="text-transparent"
									style={{ WebkitTextStroke: "1.5px var(--primary)" }}
								>
									Protection
								</span>
								."
							</h2>
							<p className="mt-3 max-w-md text-base leading-relaxed opacity-80 text-muted-foreground font-body">
								The response time of the carbon chassis is immediate. On steep
								inclines, the energy return feels less like a cushion and more
								like a mechanical spring.
							</p>
						</motion.div>

						{/* Stats Grid */}
						<motion.div
							className="grid grid-cols-2 gap-12 border-y border-foreground/5"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={systemVariants.staggerContainer}
						>
							{[
								{ val: "94", unit: "%", label: "Energy_Return" },
								{ val: "210", unit: "g", label: "Total_Mass" },
							].map((stat, i) => (
								<motion.div
									key={i}
									variants={systemVariants.fadeUp}
									className="space-y-2"
								>
									<p className="text-5xl italic font-black text-foreground font-headline">
										{stat.val}
										<span className="text-lg text-primary">{stat.unit}</span>
									</p>
									<p className="font-mono tracking-widest uppercase text-muted-foreground text-[9px]">
										{stat.label}
									</p>
								</motion.div>
							))}
						</motion.div>

						{/* Technical Field Note */}
						<motion.div
							className="relative p-10 border border-foreground/5 bg-white/[0.02] backdrop-blur-sm"
							initial={{ opacity: 0, scale: 0.95 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true }}
						>
							<div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
							<div className="flex gap-3 items-center mb-6">
								<span className="h-3 bg-primary w-[1px]" />
								<TypewriterText
									text="Field_Note_//"
									className="font-mono tracking-widest uppercase text-foreground text-[11px]"
								/>
							</div>
							<p className="font-mono tracking-tight leading-relaxed uppercase opacity-70 text-muted-foreground text-[10px]">
								Tested in Sector_04 under heavy precipitation. Traction
								integrity maintained at 98.4% efficiency. Zero thermal
								degradation reported.
							</p>
						</motion.div>

						{/* User Profile */}
						<motion.div
							className="flex gap-6 items-center"
							initial={{ opacity: 0 }}
							whileInView={{ opacity: 1 }}
							viewport={{ once: true }}
						>
							<div className="flex justify-center items-center w-16 h-16 font-mono text-sm italic font-bold rounded-full border border-primary/20 bg-primary/5 text-primary">
								AV
							</div>
							<div className="space-y-1">
								<TypewriterText
									text="A_Vandervelt"
									className="font-mono text-xs font-bold tracking-widest uppercase text-foreground"
								/>
								<TypewriterText
									text="Lead_Field_Agent // Pro_Trialist"
									delay={0.5}
									className="font-mono tracking-tighter uppercase opacity-60 text-muted-foreground text-[9px]"
								/>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default Lookbook;
