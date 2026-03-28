import React from "react";
import { motion } from "framer-motion";
import { systemVariants } from "@motion";
import { Link } from "react-router-dom";

const RelatedProducts = ({
	products,
	heading = "Related_Units",
	limit = 4,
}) => {
	// Fallback for empty state
	if (!products || products.length === 0) {
		return (
			<section className="py-12 w-full md:py-24 bg-background">
				<div className="px-4 mx-auto md:px-8 max-w-[1440px]">
					<div className="py-12 text-center border border-dashed md:py-24 border-foreground/10">
						<p className="font-mono uppercase text-foreground/20 text-[9px] tracking-[0.3em]">
							Data_Entry_Not_Found // System_Idle
						</p>
					</div>
				</div>
			</section>
		);
	}

	return (
		<section className="py-12 w-full border-t md:py-24 bg-background border-foreground/10">
			<div className="px-4 mx-auto md:px-8 max-w-[1440px]">
				{/* ── Section Header ────────────────────────── */}
				<motion.div
					className="flex gap-4 items-center mb-10 md:gap-6 md:mb-16"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={systemVariants.fadeUp}
				>
					<div className="flex-1 bg-background/10 h-[1px]" />
					<h2 className="font-mono font-bold uppercase whitespace-nowrap text-foreground text-[9px] tracking-[0.3em] md:text-[10px] md:tracking-[0.5em]">
						{heading}
					</h2>
					<div className="w-12 md:w-20 bg-primary h-[1px]" />
				</motion.div>

				{/* ── Responsive Grid ────────────────────────── */}
				<motion.div
					className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={systemVariants.staggerContainer}
				>
					{products.slice(0, limit).map((product) => {
						// ── Internal Logic for Data Normalization ──
						const productLink = `/products/${product.handle}`;
						const displayPrice =
							product.price > 1000
								? (product.price / 100).toFixed(2)
								: product.price.toFixed(2);

						return (
							<motion.div
								key={product.id}
								variants={systemVariants.fadeUp}
								className="flex relative flex-col p-5 border transition-all md:p-6 bg-background group border-foreground/10 hover:border-primary/50 hover:bg-background/[0.02]"
							>
								{/* Image Container */}
								<Link
									to={productLink}
									className="overflow-hidden relative mb-6 w-full border md:mb-8 bg-background/5 border-foreground/10 aspect-square"
								>
									{/* Unit ID Decal */}
									<span className="absolute top-3 right-3 z-10 py-0.5 px-1.5 font-mono tracking-tighter uppercase border text-foreground/40 bg-background/90 border-foreground/10 text-[8px] backdrop-blur-sm">
										REF_{product.id.toString().slice(-4)}
									</span>

									<img
										src={product.featured_image || product.img}
										alt={product.title}
										loading="lazy"
										className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
									/>
								</Link>

								{/* Product Info */}
								<div className="flex flex-col flex-1 gap-2">
									<Link
										to={productLink}
										className="text-xs font-bold tracking-tight leading-tight uppercase transition-colors md:text-sm text-foreground hover:text-primary"
									>
										{product.title}
									</Link>

									<div className="flex justify-between items-end pt-4 mt-auto border-t border-dashed md:pt-6 border-foreground/10">
										<span className="font-mono font-medium md:text-xs text-foreground/60 text-[10px]">
											${displayPrice}
										</span>

										<Link
											to={productLink}
											className="font-mono uppercase transition-colors text-primary text-[8px] tracking-[0.2em] md:text-[9px] hover:text-primary/80"
										>
											[ View_File ]
										</Link>
									</div>
								</div>
							</motion.div>
						);
					})}
				</motion.div>
			</div>
		</section>
	);
};

export default RelatedProducts;
