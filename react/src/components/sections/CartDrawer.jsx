import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useCart } from "@components/context/CartContext";

const CartDrawer = ({ isOpen, onClose }) => {
	const { cart, updateQty, removeItem } = useCart();
	const formatPrice = (price) => (price / 100).toFixed(2);

	return (
		<AnimatePresence>
			{isOpen && (
				<div className="flex fixed inset-0 justify-end z-[100]">
					{/* ── Backdrop ── */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={onClose}
						className="absolute inset-0 cursor-pointer bg-background/60 backdrop-blur-sm"
					/>

					{/* ── Drawer Panel ── */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="flex relative flex-col w-full max-w-md h-full border-l shadow-2xl border-foreground/10 bg-background"
					>
						{/* Header */}
						<div className="flex overflow-hidden justify-between items-center p-6 border-b border-foreground/10">
							<div className="flex gap-3 items-center min-w-0">
								<span className="w-2 h-2 animate-pulse bg-primary shrink-0" />
								<h2 className="font-mono font-bold uppercase text-foreground truncate text-[10px] tracking-[0.2em]">
									MANIFEST // SYNC_ACTIVE
								</h2>
							</div>
							<button
								onClick={onClose}
								className="font-mono uppercase transition-colors cursor-pointer hover:text-red-500 text-foreground/40 shrink-0 text-[10px]"
							>
								[ Close_X ]
							</button>
						</div>

						{/* Scroll Area */}
						<div className="flex overflow-y-auto flex-col flex-1 gap-6 p-6 no-scrollbar">
							{cart?.items?.length > 0 ? (
								<AnimatePresence mode="popLayout">
									{cart.items.map((item) => (
										<motion.div
											key={item.key}
											layout
											initial={{ opacity: 0, x: 20 }}
											animate={{ opacity: 1, x: 0 }}
											exit={{ opacity: 0, x: 20 }}
											className="flex relative gap-6 pb-8 border-b border-dashed border-foreground/10 group"
										>
											{/* ── Item Image (Clickable) ── */}
											<Link
												to={`/products/${item.handle}`}
												onClick={onClose}
												className="overflow-hidden w-24 h-24 border bg-background/5 shrink-0 border-foreground/10"
											>
												<img
													src={item.image}
													alt={item.title}
													className="object-cover w-full h-full transition-all duration-500 group-hover:scale-105 grayscale group-hover:grayscale-0"
												/>
											</Link>

											{/* Item Info */}
											<div className="flex flex-col flex-1 gap-1">
												<div className="flex justify-between items-start">
													<p className="font-mono tracking-tighter uppercase text-[8px] text-primary">
														REF_{item.id.toString().slice(-8)}
													</p>
													<button
														onClick={() => removeItem(item.key)}
														className="font-mono uppercase cursor-pointer hover:text-red-500 text-foreground/20 text-[8px]"
													>
														[ Purge ]
													</button>
												</div>

												{/* ── Item Title (Clickable) ── */}
												<Link
													to={`/products/${item.handle}`}
													onClick={onClose}
													className="block"
												>
													<h3 className="text-sm font-bold tracking-tight leading-tight uppercase transition-colors text-foreground hover:text-primary">
														{item.title}
													</h3>
												</Link>

												<p className="mt-1 font-mono uppercase text-[9px] text-foreground/40">
													{item.variant_title || "Base_Model"}
												</p>

												<div className="flex justify-between items-end pt-4 mt-auto">
													<div className="flex items-center border border-foreground/10 bg-background">
														<button
															onClick={() =>
																updateQty(item.key, item.quantity - 1)
															}
															className="py-1 px-2 font-mono text-xs cursor-pointer hover:text-red-500 text-foreground/40"
														>
															-
														</button>
														<span className="py-1 px-3 font-mono text-foreground text-[10px] border-x border-foreground/10">
															{item.quantity}
														</span>
														<button
															onClick={() =>
																updateQty(item.key, item.quantity + 1)
															}
															className="py-1 px-2 font-mono text-xs cursor-pointer text-foreground/40 hover:text-primary"
														>
															+
														</button>
													</div>
													<span className="font-mono text-xs font-bold text-foreground">
														${formatPrice(item.price * item.quantity)}
													</span>
												</div>
											</div>
										</motion.div>
									))}
								</AnimatePresence>
							) : (
								<div className="flex flex-col justify-center items-center py-20 h-full border border-dashed opacity-30 border-foreground/10">
									<p className="font-mono uppercase text-[9px] tracking-[0.2em]">
										Zero_Units_In_Manifest
									</p>
								</div>
							)}
						</div>

						{/* Footer */}
						<div className="p-6 border-t border-foreground/10 bg-background/[0.02]">
							<div className="flex flex-col gap-4">
								<div className="flex justify-between items-end pb-4 border-b border-dashed border-foreground/10">
									<span className="font-mono uppercase text-foreground/40 text-[9px]">
										Manifest_Total:
									</span>
									<span className="font-mono text-lg font-bold text-foreground">
										${formatPrice(cart.total_price)}
									</span>
								</div>

								<a
									href="/cart"
									onClick={onClose}
									className="py-4 w-full font-mono text-xs font-bold text-center uppercase transition-all hover:opacity-90 bg-primary text-background tracking-[0.3em]"
									style={{
										clipPath:
											"polygon(0 0, 100% 0, 100% 70%, 95% 100%, 0 100%)",
									}}
								>
									[ View_Full_Manifest ]
								</a>

								<button
									onClick={onClose}
									className="py-3 w-full font-mono uppercase border transition-colors cursor-pointer border-foreground/10 text-foreground/40 text-[9px] hover:text-foreground"
								>
									Continue_Browsing
								</button>
							</div>
						</div>
					</motion.div>
				</div>
			)}
		</AnimatePresence>
	);
};

export default CartDrawer;
