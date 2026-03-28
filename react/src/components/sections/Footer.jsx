import React from "react";
import { motion } from "framer-motion";
import { systemVariants } from "@motion";

const Footer = ({ menuLinks = [] }) => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className="flex flex-col justify-center items-center pt-24 pb-12 w-full bg-black border-t border-white/5">
			<motion.div
				className="flex flex-col items-center px-8 mx-auto w-full max-w-7xl"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={systemVariants.staggerContainer}
				custom={{ stagger: 0.15 }}
			>
				{/* Main Footer Grid */}
				<div className="grid grid-cols-1 gap-16 justify-items-center mb-24 w-full text-center md:grid-cols-2 lg:grid-cols-4">
					{/* Brand Info */}
					<motion.div
						variants={systemVariants.fadeUp}
						className="flex flex-col items-center space-y-6 w-full"
					>
						<div>
							<h2 className="text-2xl italic font-black tracking-tighter uppercase font-headline text-white/90">
								THE<span className="text-primary">_</span>THEME
							</h2>
							<p className="mx-auto mt-4 font-mono tracking-tight leading-relaxed uppercase text-muted-foreground max-w-[200px] text-[10px]">
								High-performance silhouettes engineered for high-velocity urban
								maneuvers.
							</p>
						</div>
						<div className="flex gap-3 justify-center items-center w-full">
							<motion.div
								variants={systemVariants.pulse}
								animate="animate"
								className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#4ade80]"
							/>
							<p className="font-mono uppercase text-[9px] tracking-[0.3em] text-white/90">
								Network_Online
							</p>
						</div>
					</motion.div>

					{/* Navigation Link List */}
					<motion.div
						variants={systemVariants.fadeUp}
						className="flex flex-col items-center space-y-6 w-full"
					>
						<p className="font-mono uppercase text-primary text-[10px] tracking-[0.4em]">
							Navigation_//
						</p>
						<ul className="space-y-4 w-full">
							{menuLinks.map((link, i) => (
								<li key={i}>
									<motion.a
										href={link.url}
										variants={systemVariants.hoverRise}
										initial="rest"
										whileHover="hover"
										className="inline-block font-mono tracking-widest uppercase transition-colors text-muted-foreground text-[11px] hover:text-primary"
									>
										{link.title}_
									</motion.a>
								</li>
							))}
						</ul>
					</motion.div>

					{/* Protocol Link List */}
					<motion.div
						variants={systemVariants.fadeUp}
						className="flex flex-col items-center space-y-6 w-full"
					>
						<p className="font-mono uppercase text-primary text-[10px] tracking-[0.4em]">
							Protocol_//
						</p>
						<ul className="space-y-4 w-full">
							{[
								"Terms_of_Service",
								"Privacy_Encryption",
								"Shipping_Logistics",
							].map((item, i) => (
								<li key={i}>
									<motion.a
										href="#"
										variants={systemVariants.hoverRise}
										initial="rest"
										whileHover="hover"
										className="inline-block font-mono tracking-widest uppercase text-muted-foreground text-[11px] hover:text-primary"
									>
										{item}
									</motion.a>
								</li>
							))}
						</ul>
					</motion.div>

					{/* Newsletter Section */}
					<motion.div
						variants={systemVariants.fadeUp}
						className="flex flex-col items-center space-y-6 w-full"
					>
						<p className="font-mono uppercase text-primary text-[10px] tracking-[0.4em]">
							Newsletter_Uplink_//
						</p>
						<div className="mx-auto w-full max-w-[260px]">
							<input
								type="email"
								placeholder="ENTER_EMAIL"
								className="py-3 px-4 w-full font-mono text-center border transition-colors focus:outline-none border-white/10 bg-white/[0.03] text-[10px] text-white/90 focus:border-primary"
							/>
							<motion.button
								variants={systemVariants.hoverGlow}
								initial="rest"
								whileHover="hover"
								className="mt-4 w-full font-mono uppercase transition-all cursor-pointer text-primary text-[10px] tracking-[0.3em]"
							>
								[ JOIN_TRANSMISSION ]
							</motion.button>
						</div>
					</motion.div>
				</div>

				{/* Bottom Bar */}
				<motion.div
					variants={systemVariants.fadeUp}
					className="flex flex-col gap-8 justify-center items-center pt-12 w-full text-center border-t border-white/5"
				>
					<div className="flex gap-12 justify-center w-full">
						{["Instagram", "X_Comm", "Discord"].map((social) => (
							<a
								key={social}
								href="#"
								className="font-mono tracking-widest uppercase transition-colors text-muted-foreground text-[9px] hover:text-primary"
							>
								{social}
							</a>
						))}
					</div>

					<div className="space-y-4 w-full">
						<p className="font-mono uppercase text-muted-foreground text-[9px] tracking-[0.2em]">
							&copy; {currentYear} THE_THEME_LABS. All Rights Reserved.
						</p>
						<p className="font-mono uppercase text-[8px] tracking-[0.4em] text-white/20">
							Ver: 1.0.4 // Lat: 7.2245 N // Long: 124.2429 E
						</p>
					</div>
				</motion.div>
			</motion.div>
		</footer>
	);
};

export default Footer;
