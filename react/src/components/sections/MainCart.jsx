import { React, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "@components/context/CartContext";
import DemoEndModal from "./DemoEndModal";

const MainCart = () => {
	// ── Context ──────────────────────────────────────
	const { cart, updateQty, removeItem } = useCart();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const isEmpty = !cart || cart.items.length === 0;

	const handleCheckout = () => {
		// You can add logic here (like a small delay or sound effect)
		setIsModalOpen(true);
	};

	// ── Helper for currency formatting ──────────────
	const formatPrice = (price) => {
		// Context provides price. If it's cents, divide by 100.
		// If it's already dollars, just use toFixed.
		return (price / 100).toFixed(2);
	};

	if (isEmpty) {
		return (
			<section className="py-40 w-full bg-background">
				<div className="flex flex-col gap-8 items-center py-40 px-6 mx-auto text-center border border-dashed max-w-[1440px] border-foreground/10">
					<h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground font-headline">
						Manifest_Empty
					</h2>

					{/* Use <a> instead of <Link> to force a clean system reload */}
					<a
						href="/collections"
						className="py-4 px-10 font-mono uppercase border transition-colors border-primary text-primary text-[10px] tracking-[0.2em] hover:bg-primary hover:text-background"
					>
						Initialize_Shop
					</a>
				</div>
			</section>
		);
	}

	return (
		<section className="py-20 w-full bg-background mt-[-10vh]">
			<div className="px-6 mx-auto max-w-[1440px]">
				{/* ── Header ────────────────────────── */}
				<div className="pb-12 mb-12 border-b border-foreground/10">
					<div className="flex gap-3 items-center mb-4">
						<span className="w-1.5 h-1.5 animate-pulse bg-primary" />
						<p className="font-mono uppercase text-primary text-[10px] tracking-[0.3em]">
							Current_Manifest // {cart.item_count} Units
						</p>
					</div>
					<h1 className="text-5xl font-bold tracking-tighter uppercase md:text-6xl text-foreground font-headline">
						Your Cart
					</h1>
				</div>

				<div className="grid grid-cols-1 gap-12 w-full lg:grid-cols-3">
					{/* ── Cart Items List ───────────────── */}
					<div className="flex flex-col gap-px w-full border lg:col-span-2 bg-background/10 h-fit border-foreground/10">
						<AnimatePresence mode="popLayout">
							{cart.items.map((item, index) => (
								<motion.div
									key={item.key}
									layout
									initial={{ opacity: 0, y: 20 }}
									animate={{ opacity: 1, y: 0 }}
									exit={{ opacity: 0, x: -20 }}
									transition={{ delay: index * 0.05 }}
									className="grid relative grid-cols-1 gap-6 p-6 w-full border bg-background group border-foreground/10 sm:grid-cols-[160px_1fr]"
								>
									{/* Item Image */}
									<Link
										to={`/products/${item.handle}`}
										className="overflow-hidden relative w-full border bg-background/5 border-foreground/10 aspect-square shrink-0"
									>
										<img
											src={item.image}
											alt={item.title}
											className="object-cover w-full h-full transition-all duration-500 grayscale group-hover:grayscale-0"
										/>
									</Link>

									{/* Item Content */}
									<div className="flex flex-col w-full min-w-0">
										<div className="flex gap-4 justify-between items-start w-full">
											<div className="flex flex-col gap-1 min-w-0">
												<p className="font-mono tracking-widest uppercase text-primary text-[9px]">
													Ref: {item.id.toString().slice(-8)}
												</p>
												<Link
													to={`/products/${item.handle}`}
													className="block text-xl font-bold tracking-tight uppercase transition-colors text-foreground truncate font-headline hover:text-primary"
												>
													{item.title}
												</Link>
												{item.variant_title && (
													<p className="mt-1 font-mono uppercase text-foreground/40 text-[10px]">
														Spec: {item.variant_title}
													</p>
												)}
											</div>
											<div className="text-right shrink-0">
												<span className="font-mono text-sm font-bold text-foreground">
													${formatPrice(item.price * item.quantity)}
												</span>
											</div>
										</div>

										{/* Bottom Row: Qty & Delete */}
										<div className="flex justify-between items-end pt-8 mt-auto w-full">
											<div className="flex items-center border bg-background/5 border-foreground/10">
												<button
													onClick={() => updateQty(item.key, item.quantity - 1)}
													className="flex justify-center items-center w-8 h-8 transition-colors cursor-pointer hover:text-red-500 text-foreground/40"
												>
													-
												</button>
												<span className="flex justify-center items-center w-10 h-8 font-mono text-xs text-foreground border-x border-foreground/10">
													{item.quantity}
												</span>
												<button
													onClick={() => updateQty(item.key, item.quantity + 1)}
													className="flex justify-center items-center w-8 h-8 transition-colors cursor-pointer text-foreground/40 hover:text-primary"
												>
													+
												</button>
											</div>

											<button
												onClick={() => removeItem(item.key)}
												className="font-mono uppercase transition-colors cursor-pointer hover:text-red-500 text-foreground/30 text-[9px] tracking-[0.2em]"
											>
												[ Delete_Entry ]
											</button>
										</div>
									</div>
								</motion.div>
							))}
						</AnimatePresence>
					</div>

					{/* ── Sidebar / Summary ─────────────── */}
					<div className="flex flex-col gap-6 w-full lg:sticky lg:top-24 h-fit">
						<div className="flex flex-col gap-8 p-8 border border-foreground/10 bg-background/[0.02]">
							<h2 className="font-mono uppercase text-primary text-[10px] tracking-[0.3em]">
								Order_Total_Calculation
							</h2>

							<div className="flex flex-col gap-4">
								<div className="flex justify-between items-center">
									<span className="font-mono uppercase text-foreground/40 text-[10px]">
										Subtotal
									</span>
									<span className="font-mono text-sm text-foreground">
										${formatPrice(cart.total_price)}
									</span>
								</div>
								<div className="flex justify-between items-center">
									<span className="font-mono uppercase text-foreground/40 text-[10px]">
										Shipping
									</span>
									<span className="font-mono tracking-tighter uppercase text-foreground/20 text-[9px]">
										Auto_Calc_At_Checkout
									</span>
								</div>
								<div className="flex justify-between items-center pt-4 mt-2 border-t border-dashed border-foreground/10">
									<span className="text-sm font-bold tracking-widest uppercase text-foreground">
										Grand_Total
									</span>
									<span className="font-mono text-xl font-bold text-primary">
										${formatPrice(cart.total_price)}
									</span>
								</div>
							</div>

							<button
								onClick={handleCheckout}
								className="flex relative gap-3 justify-center items-center py-5 w-full font-mono font-bold uppercase transition-all duration-300 cursor-pointer group text-[11px] tracking-[0.2em] bg-primary text-background"
								style={{
									clipPath: "polygon(0 0, 100% 0, 100% 70%, 90% 100%, 0 100%)",
								}}
							>
								Proceed_To_Checkout
								<span className="transition-transform group-hover:translate-x-1">
									→
								</span>
							</button>

							{/* ── RENDER MODAL ── */}
							<DemoEndModal
								isOpen={isModalOpen}
								onClose={() => setIsModalOpen(false)}
							/>

							<Link
								to="/collections"
								className="font-mono tracking-widest text-center uppercase text-foreground/40 text-[9px] hover:text-primary"
							>
								[ Continue_Shopping ]
							</Link>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default MainCart;
