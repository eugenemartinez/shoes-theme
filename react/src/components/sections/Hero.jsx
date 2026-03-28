import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { systemVariants } from "@motion";
import { TypewriterText } from "@TypewriterText";

// Aliased Asset Imports
import heroMain from "@assets/hero-main.png";
import heroSeven from "@assets/hero-seven.png";
import detailWeave1 from "@assets/detail-weave-1.jpeg";
import detailWeave2 from "@assets/detail-weave-2.jpeg";

const Hero = ({ sectionId = "hero-main" }) => {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	const springConfig = { damping: 25, stiffness: 150 };
	const smoothX = useSpring(mouseX, springConfig);
	const smoothY = useSpring(mouseY, springConfig);

	// Parallax Mappings
	const mainX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
	const mainY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);
	const mainRotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
	const mainRotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);

	const detailX = useTransform(smoothX, [-0.5, 0.5], [-35, 35]);
	const detailY = useTransform(smoothY, [-0.5, 0.5], [-35, 35]);

	const handleMouseMove = (e) => {
		const { clientX, clientY } = e;
		const { innerWidth, innerHeight } = window;
		mouseX.set(clientX / innerWidth - 0.5);
		mouseY.set(clientY / innerHeight - 0.5);
	};

	const handleMouseLeave = () => {
		mouseX.set(0);
		mouseY.set(0);
	};

	return (
		<section
			id={sectionId}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
			className="flex overflow-hidden relative items-center w-full h-screen bg-background selection:bg-primary selection:text-primary-foreground mt-[-10vh]"
		>
			{/* ── 01. SYSTEM DEBRIS ────────────────────────── */}
			<div className="overflow-hidden absolute inset-0 z-0 pointer-events-none select-none">
				<svg
					className="absolute inset-0 w-full h-full opacity-[0.12]"
					viewBox="0 0 100 100"
					preserveAspectRatio="none"
				>
					<defs>
						<pattern
							id="grid-pattern"
							width="10"
							height="10"
							patternUnits="userSpaceOnUse"
						>
							<path
								d="M 10 0 L 0 0 0 10"
								fill="none"
								stroke="var(--primary)"
								strokeWidth="0.1"
							/>
						</pattern>
					</defs>
					<rect width="100" height="100" fill="url(#grid-pattern)" />
				</svg>

				<div className="flex absolute inset-0 justify-around px-20 opacity-10">
					{[1, 2, 3, 4, 5].map((i) => (
						<motion.div
							key={i}
							variants={systemVariants.float}
							animate="animate"
							custom={{ duration: 6 + i, y: -30 }}
							className="h-full bg-gradient-to-b from-transparent to-transparent via-primary w-[1px]"
						/>
					))}
				</div>

				<TypewriterText
					text="[ SYSTEM_ESTABLISHED_2026 ]"
					delay={1.5}
					duration={3}
					loopDelay={10}
					className="text-primary/70 absolute top-[12%] left-[8%] font-mono text-[8px] tracking-[0.5em] uppercase"
				/>

				<motion.div
					variants={systemVariants.fadeRight}
					initial="hidden"
					animate="visible"
					custom={{ delay: 1 }}
					className="border-primary absolute bottom-[10%] left-[8%] border-l py-2 pl-4"
				>
					<div className="mb-1 w-20 bg-primary/30 h-[1px]" />
					<div className="w-12 bg-primary/30 h-[1px]" />

					{/* Character-by-character coordinate reveal */}
					<TypewriterText
						text="LAT: 40.7128° N // LNG: 74.0060° W"
						delay={1.5}
						duration={2.5}
						loopDelay={15}
						className="mt-2 font-mono tracking-widest uppercase opacity-60 text-primary text-[7px]"
					/>
				</motion.div>
			</div>

			{/* ── 02. CENTRAL VISUAL STACK ─────────────────── */}

			{/* Main Sneaker - Positioned to center optical weight */}
			<motion.div
				style={{
					x: mainX,
					y: mainY,
					rotateX: mainRotateX,
					rotateY: mainRotateY,
					transformPerspective: 1200,
				}}
				className="flex absolute inset-0 z-20 justify-center items-center pointer-events-none"
			>
				<motion.img
					variants={systemVariants.zoomOut}
					initial="hidden"
					animate="visible"
					custom={{ scale: 1.15, delay: 0.1 }}
					src={heroMain}
					alt="Core Silhouette"
					className="object-contain w-full opacity-95 max-w-[1000px] lg:max-w-[1250px]"
					style={{
						filter: "drop-shadow(0 0 60px rgba(0,0,0,0.7))",
						marginLeft: "2%", // Corrects horizontal balance vs text
						marginTop: "2%", // Lifts the shoe upward
					}}
				/>
			</motion.div>

			{/* Blurred Motion Layer */}
			<motion.div
				style={{ x: mainX, y: mainY }}
				className="absolute top-[38%] right-[18%] z-10 hidden h-72 w-72 opacity-25 blur-[8px] lg:block"
			>
				<img
					src={heroSeven}
					alt="Motion Blur"
					className="object-contain w-full h-full grayscale"
				/>
			</motion.div>

			{/* Right Side Detail Panels */}
			<div className="absolute right-[8%] top-1/2 z-40 flex -translate-y-1/2 flex-col gap-10 hidden sm:block">
				{[
					{ img: detailWeave1, label: "Surface_Detail // 002" },
					{ img: detailWeave2, label: "Archive_Ref // 004" },
				].map((item, idx) => (
					<motion.div
						key={idx}
						style={{ x: detailX, y: detailY }}
						variants={systemVariants.fadeUp}
						initial="hidden"
						animate="visible"
						custom={{ delay: 0.8 + idx * 0.2 }}
						className="overflow-hidden relative my-12 w-64 h-72 border border-white/10 bg-black/20 backdrop-blur-sm"
						style={{ clipPath: "polygon(12% 0, 100% 0, 88% 100%, 0% 100%)" }}
					>
						<motion.img
							whileHover={{
								scale: 1.3,
								filter: "grayscale(0) brightness(1.1)",
							}}
							src={item.img}
							alt="Detail"
							className="object-cover w-full h-full transition-all duration-700 scale-110 grayscale"
						/>

						{/* ── Fixed Centered Label ── */}
						<div className="absolute bottom-4 left-1/2 w-full text-center -translate-x-1/2">
							<div className="py-1.5 px-3 bg-black/60 backdrop-blur-md">
								<TypewriterText
									text={item.label}
									delay={1.2 + idx * 0.2}
									duration={1.5}
									className="font-mono font-bold uppercase text-primary text-[7px] tracking-[0.25em]"
								/>
							</div>
						</div>
					</motion.div>
				))}
			</div>

			{/* ── 03. CONTENT LAYER ────────────────────────── */}
			<div className="container relative z-30 px-12 mx-auto lg:px-20">
				<motion.div
					variants={systemVariants.staggerContainer}
					initial="hidden"
					animate="visible"
					className="flex flex-col items-start mt-[-4vh]" // Moves text upward
				>
					<motion.div variants={systemVariants.fadeRight}>
						<p className="inline-block py-1 px-3 mb-6 font-bold text-black uppercase bg-primary text-[10px] tracking-[0.4em]">
							Limited Drop 2026
						</p>
					</motion.div>

					<h1 className="flex flex-col italic font-black uppercase select-none leading-[0.78]">
						<motion.span
							variants={systemVariants.fadeRight}
							className="tracking-tighter text-foreground text-[15vw] lg:text-[10.5vw]"
						>
							MOVE
						</motion.span>
						<motion.span
							variants={systemVariants.fadeRight}
							className="tracking-tighter text-transparent text-[15vw] lg:text-[12.5vw]"
							style={{ WebkitTextStroke: "2.5px var(--primary)" }}
						>
							DIFFERENT
						</motion.span>
					</h1>

					<motion.div
						variants={systemVariants.fadeUp}
						className="mt-12 space-y-8 max-w-sm"
					>
						<p className="pb-4 font-mono tracking-tight leading-relaxed uppercase border-b text-foreground/40 border-white/10 text-[9px]">
							Engineered for the blue hour. <br />
							Built with a focus on presence and ergonomic motion.
						</p>
						<motion.div variants={systemVariants.hoverGlow} whileHover="hover">
							<a
								href="/collections"
								className="flex justify-center items-center w-52 h-14 font-mono font-bold text-black uppercase transition-all active:scale-95 bg-primary text-[10px] tracking-[0.3em]"
							>
								[ EXPLORE DROP ]
							</a>
						</motion.div>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
