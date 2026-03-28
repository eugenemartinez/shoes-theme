import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { systemVariants } from "@motion";
import { MOCK_PRODUCTS } from "@/data/data";
import { useCart } from "@components/context/CartContext"; // ── NEW

const MainCollections = () => {
	const [addingId, setAddingId] = useState(null);
	const { addToCart } = useCart(); // ── NEW

	const handleQuickAdd = (e, product) => {
		e.preventDefault();
		e.stopPropagation(); // ── Prevent Link navigation

		setAddingId(product.id);

		// ── Logic: Default to the first variant or base unit ──
		const defaultVariant = product.variants?.[0] || {
			id: product.id,
			title: "Standard_Issue",
		};

		addToCart(product, defaultVariant, 1);

		setTimeout(() => setAddingId(null), 1500);
	};

	return (
		<section className="py-20 w-full min-h-screen bg-background mt-[-10vh]">
			<div className="px-6 mx-auto max-w-[1440px]">
				{/* ── Collection Header ────────────────────────── */}
				<div className="pb-12 mb-16 border-b border-foreground/10">
					<div className="flex flex-col gap-8 justify-between md:flex-row md:items-end">
						<motion.div
							className="flex flex-col gap-4"
							initial="hidden"
							whileInView="visible"
							viewport={{ once: true }}
							variants={systemVariants.fadeUp}
						>
							<div className="flex gap-3 items-center">
								<span className="w-1.5 h-1.5 animate-pulse bg-primary" />
								<p className="font-mono uppercase text-primary text-[10px] tracking-[0.3em]">
									Directory // Archive_All_Units
								</p>
							</div>
							<h1 className="text-5xl font-bold tracking-tighter uppercase md:text-7xl text-foreground font-headline">
								Active_Archive
							</h1>
							<p className="max-w-xl font-mono text-xs tracking-wide leading-relaxed uppercase text-foreground/40">
								Synchronizing available hardware. All units are field-tested and
								deployment-ready for authorized personnel.
							</p>
						</motion.div>

						<div className="flex flex-col gap-4 items-start md:items-end">
							<p className="font-mono uppercase text-foreground/20 text-[9px] tracking-[0.2em]">
								Count: {MOCK_PRODUCTS.length} _Units_Detected
							</p>
						</div>
					</div>
				</div>

				{/* ── Product Grid ─────────────────────────────── */}
				<motion.div
					className="grid grid-cols-2 gap-px border lg:grid-cols-4 bg-foreground/5 border-foreground/10"
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					variants={systemVariants.staggerContainer}
				>
					{MOCK_PRODUCTS.map((product) => (
						<motion.div
							key={product.id}
							variants={systemVariants.fadeUp}
							className="flex overflow-hidden relative flex-col w-full h-full border bg-background group border-background/5"
						>
							{/* Quick Add Overlay */}
							<div className="absolute right-0 bottom-0 left-0 z-20 px-4 pb-4 transition-all duration-300 translate-y-full md:px-6 md:pb-6 group-hover:translate-y-0">
								<button
									onClick={(e) => handleQuickAdd(e, product)} // ── PASS PRODUCT DATA
									disabled={addingId === product.id}
									className="py-3 w-full font-mono font-bold uppercase transition-all cursor-pointer hover:opacity-90 active:scale-95 disabled:opacity-50 bg-primary text-background text-[9px] tracking-[0.2em]"
									style={{
										clipPath:
											"polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)",
									}}
								>
									{addingId === product.id
										? "[ Syncing_Data... ]"
										: "[ Initialize_Add ]"}
								</button>
							</div>

							<Link
								to={`/products/${product.handle}`}
								className="flex flex-col p-4 h-full transition-colors duration-300 md:p-6 hover:bg-background/[0.02]"
							>
								{/* Product Image */}
								<div className="overflow-hidden relative mb-6 bg-background/5 aspect-[4/5]">
									<img
										src={product.featured_image}
										alt={product.title}
										className="object-cover w-full h-full transition-all duration-700 group-hover:scale-105 grayscale group-hover:grayscale-0"
									/>
								</div>

								{/* Product Info */}
								<div className="flex flex-col gap-2 pt-1 mt-auto">
									<div className="flex gap-4 justify-between items-center">
										<p className="font-mono tracking-widest uppercase text-primary text-[9px]">
											ID: {product.id}
										</p>
										<p className="font-mono uppercase text-foreground/30 max-w-[100px] truncate text-[9px]">
											{product.vendor}
										</p>
									</div>

									<h3 className="text-lg font-bold tracking-tight leading-tight uppercase transition-colors text-foreground font-headline group-hover:text-primary">
										{product.title}
									</h3>

									<div className="flex gap-3 items-baseline pt-4 mt-2 border-t border-dashed border-foreground/10">
										<span className="font-mono text-sm font-bold text-foreground">
											${(product.price / 100).toFixed(2)}
										</span>
									</div>
								</div>
							</Link>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default MainCollections;
