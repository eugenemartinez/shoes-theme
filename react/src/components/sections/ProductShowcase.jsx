import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Link } from "react-router-dom";
import { TypewriterText } from "@TypewriterText";
import Magnetic from "@components/motion/Magnetic";
import { MOCK_PRODUCTS } from "@/data/data";

const ProductShowcase = ({ sectionId = "product-showcase" }) => {
	const targetRef = useRef(null);

	// Limit to first 7 for the specific "001-007" layout
	const displayProducts = MOCK_PRODUCTS.slice(0, 7);

	const { scrollYProgress } = useScroll({
		target: targetRef,
	});

	// Map vertical scroll (0 to 1) to horizontal movement
	const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);
	const width = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	return (
		<section
			ref={targetRef}
			id={sectionId}
			className="relative border-b h-[400vh] bg-background border-white/10"
		>
			{/* Sticky Container */}
			<div className="flex overflow-hidden sticky top-0 items-center h-screen">
				{/* Header Info */}
				<div className="absolute left-8 top-12 z-30">
					<TypewriterText
						text="The_Collection"
						className="font-mono uppercase text-primary text-[10px] tracking-[0.5em]"
					/>
					<h2 className="text-5xl italic font-black tracking-tighter uppercase lg:text-6xl text-foreground font-headline">
						Archive{" "}
						<span
							className="text-transparent"
							style={{ WebkitTextStroke: "1.5px var(--foreground)" }}
						>
							001-007
						</span>
					</h2>
				</div>

				{/* ── Horizontal Track ────────────────────────── */}
				<motion.div style={{ x }} className="flex gap-20 group/track pl-[34vw]">
					{displayProducts.map((product, idx) => (
						<Link
							key={product.id}
							to={`/products/${product.handle}`}
							className="group relative flex w-[300px] flex-none flex-col items-center justify-center lg:w-[500px] transition-all duration-500 cursor-pointer group-hover/track:opacity-30 group-hover/track:grayscale hover:!opacity-100 hover:!grayscale-0"
						>
							{/* Glow Effect */}
							<div className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-700 scale-75 group-hover:opacity-100 group-hover:scale-125 bg-primary/10 blur-[100px]" />

							{/* Magnetic Product Image */}
							<Magnetic strength={0.25}>
								<motion.img
									src={product.featured_image}
									alt={product.title}
									className="object-contain relative z-10 w-full h-auto transition-transform duration-700 group-hover:-rotate-6 drop-shadow-[0_20px_60px_rgba(0,0,0,0.4)]"
									whileHover={{ scale: 1.1 }}
								/>
							</Magnetic>

							{/* Hover Details */}
							<div className="mt-12 text-center opacity-0 transition-all duration-500 group-hover:opacity-100">
								<TypewriterText
									text={`Ref_${product.id.toString().slice(-4)}`}
									className="font-mono tracking-widest uppercase text-primary text-[10px]"
								/>
								<h3 className="text-3xl italic font-black tracking-tighter uppercase lg:text-3xl font-headline text-foreground">
									{product.title.split(" ").join("_")}
								</h3>
							</div>
						</Link>
					))}
				</motion.div>

				{/* Progress Bar */}
				<div className="absolute right-12 bottom-12 z-30">
					<div className="flex gap-6 justify-end items-center">
						<p className="font-mono tracking-widest uppercase text-white/20 text-[8px]">
							Scroll_to_Explore
						</p>
						<div className="overflow-hidden w-64 bg-white/10 h-[2px]">
							<motion.div style={{ width }} className="h-full bg-primary" />
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default ProductShowcase;
