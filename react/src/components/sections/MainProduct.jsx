import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { systemVariants } from "@motion";
import { useCart } from "@components/context/CartContext";

const MainProduct = ({ product }) => {
	// ── Context ──────────────────────────────────────
	const { addToCart } = useCart();

	// ── State ───────────────────────────────────────
	const [selectedImage, setSelectedImage] = useState(product.featured_image);
	const [quantity, setQuantity] = useState(1);
	const [isAdding, setIsAdding] = useState(false);
	const [selectedOptions, setSelectedOptions] = useState(
		product.options?.reduce(
			(acc, opt) => ({ ...acc, [opt.name]: opt.values[0] }),
			{},
		) || {},
	);

	// ── Logic ───────────────────────────────────────
	// Find the current variant based on selected options
	const currentVariant =
		product.variants && product.variants.length > 0
			? product.variants.find((v) =>
					v.options.every((opt) => selectedOptions[opt.name] === opt.value),
				) || product.variants[0]
			: {
					id: product.id,
					price: product.price / 100,
					available: true,
					title: "Default",
				};

	const handleOptionChange = (name, value) => {
		setSelectedOptions((prev) => ({ ...prev, [name]: value }));
	};

	const updateQty = (delta) => setQuantity((prev) => Math.max(1, prev + delta));

	// ── NEW: Add to Cart Handler ────────────────────
	const handleAddToManifest = () => {
		setIsAdding(true);

		// Map variant title for the manifest display
		const variantData = {
			id: currentVariant.id,
			title: Object.values(selectedOptions).join(" / ") || "Standard_Unit",
		};

		addToCart(product, variantData, quantity);

		// Reset button after 1.5s
		setTimeout(() => setIsAdding(false), 1500);
	};

	return (
		<section className="py-24 w-full bg-background mt-[-5vh]">
			<div className="px-6 mx-auto max-w-[1440px]">
				<div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
					{/* ── Left: Media Gallery (Unchanged) ── */}
					<motion.div
						variants={systemVariants.fadeRight}
						initial="hidden"
						animate="visible"
						className="flex flex-col gap-6"
					>
						<div className="overflow-hidden relative border bg-background/5 border-foreground/10 aspect-square">
							<AnimatePresence mode="wait">
								<motion.img
									key={selectedImage}
									src={selectedImage}
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
									exit={{ opacity: 0 }}
									className="object-cover w-full h-full transition-all duration-700 grayscale hover:grayscale-0"
								/>
							</AnimatePresence>

							<div className="absolute bottom-4 left-4">
								<div className="flex gap-2 items-center py-1 px-3 font-mono tracking-widest uppercase border bg-background/80 border-foreground/10 text-[9px] backdrop-blur-sm">
									<span
										className={`h-1 w-1 ${currentVariant.available ? "bg-primary animate-pulse" : "bg-red-500"}`}
									/>
									Status:{" "}
									{currentVariant.available ? "Active_Stock" : "Depleted"}
								</div>
							</div>
						</div>

						{product.images && product.images.length > 1 && (
							<div className="flex overflow-x-auto gap-2 pb-2 no-scrollbar">
								{product.images.map((img, i) => (
									<button
										key={i}
										onClick={() => setSelectedImage(img)}
										className={`shrink-0 border transition-all duration-300 w-20 h-20 ${selectedImage === img ? "border-primary" : "border-foreground/10"}`}
									>
										<img
											src={img}
											className="object-cover w-full h-full grayscale hover:grayscale-0"
										/>
									</button>
								))}
							</div>
						)}
					</motion.div>

					{/* ── Right: Product Specs ─────────────── */}
					<motion.div
						variants={systemVariants.fadeLeft}
						initial="hidden"
						animate="visible"
						className="flex flex-col gap-8"
					>
						<div className="flex flex-col gap-2">
							<p className="font-mono uppercase text-primary text-[10px] tracking-[0.4em]">
								Origin // {product.vendor}
							</p>
							<h1 className="text-5xl font-bold tracking-tighter uppercase lg:text-6xl text-foreground font-headline">
								{product.title}
							</h1>
							<div className="flex gap-4 items-center mt-2">
								<span className="font-mono text-2xl font-bold text-foreground">
									${currentVariant.price.toFixed(2)}
								</span>
							</div>
						</div>

						{/* Form Interface */}
						<div className="flex flex-col gap-8 pt-8 border-t border-foreground/10">
							{product.options &&
								product.options.map((option) => (
									<div key={option.name} className="flex flex-col gap-3">
										<div className="flex justify-between items-end">
											<label className="font-mono tracking-widest uppercase text-foreground/40 text-[9px]">
												Select_{option.name}:
											</label>
											<span className="font-mono uppercase text-foreground text-[10px]">
												{selectedOptions[option.name]}
											</span>
										</div>
										<div className="flex flex-wrap gap-2">
											{option.values.map((val) => (
												<button
													key={val}
													onClick={() => handleOptionChange(option.name, val)}
													className={`border px-6 py-2 font-mono text-[11px] uppercase transition-all ${
														selectedOptions[option.name] === val
															? "bg-primary text-background border-primary"
															: "border-foreground/10 text-foreground hover:border-foreground/40"
													}`}
												>
													{val}
												</button>
											))}
										</div>
									</div>
								))}

							{/* Qty & Action */}
							<div className="flex flex-col gap-4 pt-4">
								<div className="flex items-center border w-fit border-foreground/10 bg-background/5">
									<button
										onClick={() => updateQty(-1)}
										className="flex justify-center items-center w-12 h-12 font-mono cursor-pointer hover:bg-background/10"
									>
										-
									</button>
									<div className="flex justify-center items-center w-16 h-12 font-mono text-sm border-x border-foreground/10">
										{quantity}
									</div>
									<button
										onClick={() => updateQty(1)}
										className="flex justify-center items-center w-12 h-12 font-mono cursor-pointer hover:bg-background/10"
									>
										+
									</button>
								</div>

								<button
									disabled={!currentVariant.available || isAdding}
									onClick={handleAddToManifest} // ── TRIGGER ACTION
									className="relative py-5 w-full font-mono text-xs font-bold uppercase transition-all cursor-pointer hover:opacity-90 disabled:opacity-30 bg-primary text-background tracking-[0.3em] active:scale-[0.98]"
									style={{
										clipPath:
											"polygon(0 0, 100% 0, 100% 70%, 95% 100%, 0 100%)",
									}}
								>
									{isAdding
										? "[ Syncing_Manifest... ]"
										: currentVariant.available
											? "[ Execute_Add_To_Manifest ]"
											: "[ Unit_Unavailable ]"}
								</button>
							</div>
						</div>

						<div className="pt-8 border-t border-foreground/10">
							<div className="font-mono tracking-wide leading-relaxed uppercase text-foreground/50 text-[11px]">
								{product.description}
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default MainProduct;
