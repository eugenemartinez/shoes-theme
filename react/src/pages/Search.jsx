import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { systemVariants } from "@motion";
import { ObservedSection } from "@components/context/ObservedSection";

// Mock Data - In a real app, this would come from an API or Global Context
const MOCK_INVENTORY = [
	{
		id: "AR-7701",
		handle: "tactical-shell-v1",
		title: "Tactical Shell _V1",
		vendor: "ARCHIVE_LABS",
		price: 240.0,
		featured_image: "/assets/hero-main.png",
	},
	{
		id: "AR-8802",
		handle: "neural-hoodie",
		title: "Neural_Link Hoodie",
		vendor: "SYSTEM_CORE",
		price: 120.0,
		featured_image: "/assets/hero-two.png",
	},
	// ... add more as needed
];

const Search = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const query = searchParams.get("q") || "";
	const [inputValue, setInputValue] = useState(query);
	const [results, setResults] = useState([]);
	const [performed, setPerformed] = useState(false);

	useEffect(() => {
		if (query.trim()) {
			const filtered = MOCK_INVENTORY.filter(
				(product) =>
					product.title.toLowerCase().includes(query.toLowerCase()) ||
					product.vendor.toLowerCase().includes(query.toLowerCase()),
			);
			setResults(filtered);
			setPerformed(true);
		} else {
			setResults([]);
			setPerformed(false);
		}
		setInputValue(query);
	}, [query]);

	const handleSearch = (e) => {
		e.preventDefault();
		setSearchParams({ q: inputValue });
	};

	return (
		<main className="py-20 min-h-screen bg-background mt-[-8vh]">
			<ObservedSection id="ARCHIVE_SEARCH">
				<div className="px-6 mx-auto max-w-[1440px]">
					{/* ── Search Header ────────────────────────── */}
					<motion.div
						className="pb-12 mb-16 border-b border-foreground/10"
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<div className="flex gap-3 items-center mb-4">
							<span className="w-2 h-2 rounded-full animate-pulse bg-primary" />
							<p className="font-mono uppercase text-primary text-[10px] tracking-[0.3em]">
								System_Query // Global_Search
							</p>
						</div>

						<h1 className="pb-2 mb-8 text-5xl font-bold tracking-tighter uppercase md:text-6xl text-foreground font-headline">
							Search
						</h1>

						<form
							onSubmit={handleSearch}
							className="flex flex-col gap-4 md:flex-row md:items-center"
						>
							<div className="relative flex-1 group">
								<input
									type="search"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									placeholder="INPUT PARAMETERS..."
									className="py-4 pr-4 pl-12 w-full font-mono text-xs border transition-all duration-300 outline-none bg-background/5 text-foreground placeholder:text-foreground/20 border-foreground/10 focus:border-primary/40"
									autoFocus
								/>
								<svg
									className="absolute left-4 top-1/2 transition-colors -translate-y-1/2 text-primary/40 group-focus-within:text-primary"
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="1.5"
								>
									<circle cx="11" cy="11" r="8" />
									<line x1="21" y1="21" x2="16.65" y2="16.65" />
								</svg>
								<div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-primary/30" />
							</div>

							<button
								type="submit"
								className="inline-flex gap-3 justify-center items-center py-4 px-8 font-mono uppercase transition-all duration-300 text-[10px] tracking-[0.2em] bg-primary text-background hover:brightness-125"
								style={{
									clipPath: "polygon(10% 0, 100% 0, 90% 100%, 0% 100%)",
								}}
							>
								Execute_Search
							</button>
						</form>
					</motion.div>

					{/* ── Results Logic ────────────────────────── */}
					<AnimatePresence mode="wait">
						{performed ? (
							results.length > 0 ? (
								<motion.div
									key="results-grid"
									initial="hidden"
									animate="visible"
									exit="hidden"
									variants={systemVariants.staggerContainer}
								>
									<div className="flex justify-between items-center mb-10">
										<p className="font-mono tracking-widest uppercase text-foreground/40 text-[10px]">
											Matches Found:{" "}
											<span className="text-foreground">{results.length}</span>{" "}
											// Query:
											<span className="text-primary"> "{query}"</span>
										</p>
									</div>

									<div className="grid overflow-hidden grid-cols-2 gap-px border md:grid-cols-3 lg:grid-cols-4 border-foreground/10 bg-background/10">
										{results.map((product) => (
											<motion.div
												key={product.id}
												variants={systemVariants.fadeUp}
												className="overflow-hidden relative p-4 bg-background group"
											>
												<Link
													to={`/product/${product.handle}`}
													className="flex flex-col gap-4"
												>
													<div className="overflow-hidden relative bg-background/5 aspect-[3/4]">
														<img
															src={product.featured_image}
															alt={product.title}
															className="object-cover w-full h-full transition-all duration-500 group-hover:scale-110 grayscale group-hover:grayscale-0"
														/>
														<div className="flex absolute inset-0 justify-center items-center opacity-0 transition-opacity pointer-events-none group-hover:opacity-100 bg-primary/10">
															<span className="py-1 px-2 font-mono border text-primary border-primary bg-background text-[9px]">
																VIEW_DETAILS
															</span>
														</div>
													</div>

													<div className="flex flex-col gap-1">
														<span className="font-mono tracking-tighter uppercase text-primary text-[8px]">
															Inventory_ID: {product.id.toString().slice(-6)}
														</span>
														<h3 className="text-sm font-bold tracking-tight leading-none uppercase text-foreground truncate">
															{product.title}
														</h3>
														<span className="font-mono text-xs text-foreground/60">
															${product.price.toFixed(2)}
														</span>
													</div>
												</Link>
											</motion.div>
										))}
									</div>
								</motion.div>
							) : (
								/* ── Error State ────────── */
								<motion.div
									key="empty"
									className="flex flex-col gap-6 justify-center items-center py-40 text-center"
									initial={{ opacity: 0 }}
									animate={{ opacity: 1 }}
								>
									<svg
										width="64"
										height="64"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										strokeWidth="0.5"
										className="animate-pulse text-primary"
									>
										<path d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2z" />
										<line x1="12" y1="8" x2="12" y2="12" />
										<line x1="12" y1="16" x2="12.01" y2="16" />
									</svg>
									<div className="space-y-2">
										<h2 className="text-3xl font-bold tracking-tighter uppercase text-foreground font-headline">
											Query_No_Matches
										</h2>
										<p className="mx-auto max-w-sm font-mono text-xs leading-relaxed uppercase text-foreground/40">
											Search parameter{" "}
											<span className="text-primary">"{query}"</span> yielded
											zero results.
										</p>
									</div>
									<Link
										to="/collections/all"
										className="inline-flex gap-3 items-center py-4 px-8 mt-6 font-mono uppercase border transition-all duration-300 text-foreground border-foreground/10 text-[10px] tracking-[0.2em] hover:bg-primary hover:text-background"
									>
										Return_to_Archive
									</Link>
								</motion.div>
							)
						) : null}
					</AnimatePresence>
				</div>
			</ObservedSection>
		</main>
	);
};

export default Search;
