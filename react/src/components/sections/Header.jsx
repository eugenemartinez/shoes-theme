import React, { useState, useEffect, useRef } from "react";
import {
	motion,
	AnimatePresence,
	useScroll,
	useMotionValueEvent,
} from "framer-motion";
import { Sun, Moon, ShoppingBag, X } from "lucide-react";
import { systemVariants } from "@motion";
import { useSection } from "@components/context/SectionContext";
import { TypewriterText } from "@TypewriterText";

// ── Added onCartClick and cartCount to props ──────────────────
const Header = ({
	shopName = "THE_THEME",
	menu = [],
	isSticky = true,
	onCartClick,
	cartCount = 0,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const { currentSectionId } = useSection();

	const [isDark, setIsDark] = useState(() => {
		const savedTheme = localStorage.getItem("theme");
		if (savedTheme) return savedTheme === "dark";
		return window.matchMedia("(prefers-color-scheme: dark)").matches;
	});

	const { scrollY } = useScroll();
	const lastScrollY = useRef(0);

	useMotionValueEvent(scrollY, "change", (latest) => {
		setIsScrolled(latest > 50);
		if (isSticky && latest > 300) {
			if (latest > lastScrollY.current) {
				setIsHidden(true);
			} else {
				setIsHidden(false);
			}
		} else {
			setIsHidden(false);
		}
		lastScrollY.current = latest;
	});

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
			localStorage.setItem("theme", "dark");
		} else {
			document.documentElement.classList.remove("dark");
			localStorage.setItem("theme", "light");
		}
	}, [isDark]);

	useEffect(() => {
		document.body.style.overflow = isOpen ? "hidden" : "";
		return () => {
			document.body.style.overflow = "";
		};
	}, [isOpen]);

	const toggleTheme = () => setIsDark((prev) => !prev);

	return (
		<>
			<motion.header
				variants={{
					visible: { y: 0 },
					hidden: { y: "-100%" },
				}}
				animate={isHidden ? "hidden" : "visible"}
				transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
				className={`fixed inset-x-0 top-0 z-50 w-full transition-colors duration-500 ${
					isScrolled
						? "bg-background/80 backdrop-blur-md border-b border-border py-3"
						: "bg-transparent py-5"
				}`}
			>
				<div className="flex justify-between items-center px-6 mx-auto w-full lg:px-10">
					{/* Logo & Typewriter */}
					<motion.div
						className="flex gap-6 items-center"
						variants={systemVariants.fadeDown}
						initial="hidden"
						animate="visible"
					>
						<a
							href="/"
							className="flex gap-3 items-center outline-none group shrink-0"
						>
							<div className="w-2 h-2 rounded-full animate-pulse bg-primary shadow-[0_0_8px_#4ade80]" />
							<span className="text-lg italic font-black tracking-tighter uppercase transition-colors text-foreground font-headline group-hover:text-primary">
								{shopName}
							</span>
						</a>

						<div className="hidden pl-6 border-l lg:block border-border">
							<div className="flex gap-3 items-center font-mono uppercase text-[8px] tracking-[0.3em]">
								<span className="opacity-50 text-muted-foreground">
									Current_Section
								</span>
								<span className="tracking-normal text-muted-foreground/30">
									//
								</span>
								<TypewriterText
									key={currentSectionId}
									text={currentSectionId}
									duration={1}
									className="font-bold text-foreground tracking-[0.4em]"
								/>
							</div>
						</div>
					</motion.div>

					{/* Desktop Nav */}
					<nav className="hidden absolute left-1/2 gap-10 items-center -translate-x-1/2 lg:flex">
						{menu.map((link, i) => (
							<motion.a
								key={i}
								href={link.url}
								variants={systemVariants.hoverRise}
								initial="rest"
								whileHover="hover"
								className="font-mono font-bold uppercase transition-colors text-muted-foreground text-[10px] tracking-[0.2em] hover:text-primary"
							>
								{link.title}_
							</motion.a>
						))}
					</nav>

					{/* Actions */}
					<div className="flex gap-2 items-center">
						<button
							onClick={toggleTheme}
							className="flex justify-center items-center w-10 h-10 transition-colors cursor-pointer text-muted-foreground hover:text-foreground"
						>
							{isDark ? <Sun size={16} /> : <Moon size={16} />}
						</button>

						{/* ── Shopping Bag Trigger ────────────────────────── */}
						<button
							onClick={onCartClick}
							className="flex relative justify-center items-center w-12 h-10 transition-colors cursor-pointer group text-muted-foreground hover:text-primary"
						>
							<div className="relative">
								<ShoppingBag
									size={18}
									className="transition-transform group-hover:scale-110"
								/>

								{/* ── System Status Dot ── */}
								<AnimatePresence>
									{cartCount > 0 && (
										<motion.span
											initial={{ scale: 0 }}
											animate={{ scale: 1 }}
											exit={{ scale: 0 }}
											className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(74,222,128,0.5)]"
										/>
									)}
								</AnimatePresence>
							</div>

							{/* ── Unit Count Label ── */}
							<AnimatePresence mode="wait">
								{cartCount > 0 && (
									<motion.span
										key={cartCount} // Key forces re-animation on count change
										initial={{ opacity: 0, x: -5 }}
										animate={{ opacity: 1, x: 0 }}
										exit={{ opacity: 0, x: 5 }}
										className="ml-2 font-mono font-bold tracking-tighter text-[10px] text-foreground"
									>
										[{cartCount.toString().padStart(2, "0")}]
									</motion.span>
								)}
							</AnimatePresence>
						</button>

						<button
							onClick={() => setIsOpen(true)}
							className="flex flex-col gap-1.5 justify-center items-center w-10 h-10 lg:hidden"
						>
							<motion.span
								animate={
									isOpen
										? { rotate: 45, y: 7, width: 20 }
										: { rotate: 0, y: 0, width: 20 }
								}
								className="block transition-transform bg-foreground h-[1px]"
							/>
							<motion.span
								animate={isOpen ? { opacity: 0, x: 20 } : { opacity: 1, x: 0 }}
								className="block w-3 translate-x-1 bg-foreground h-[1px]"
							/>
							<motion.span
								animate={
									isOpen
										? { rotate: -45, y: -7, width: 20 }
										: { rotate: 0, y: 0, width: 20 }
								}
								className="block transition-transform bg-foreground h-[1px]"
							/>
						</button>
					</div>
				</div>
			</motion.header>

			{/* Mobile Menu Overlay */}
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{
							opacity: 0,
							transition: { duration: 0.3, ease: "power2.in" },
						}}
						className="flex fixed inset-0 flex-col bg-background z-[60]"
					>
						{/* The Grid Grain Overlay */}
						<div
							className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]"
							style={{
								backgroundImage: `radial-gradient(var(--foreground) 1px, transparent 1px)`,
								backgroundSize: "20px 20px",
							}}
						/>

						<div className="flex relative z-10 flex-col px-8 pt-32 pb-12 h-full">
							<motion.nav
								className="flex flex-col gap-4"
								variants={systemVariants.staggerContainer}
								initial="hidden"
								animate="visible"
								custom={{ stagger: 0.1, delay: 0.2 }}
							>
								{menu.map((link, i) => (
									<div key={i} className="overflow-hidden">
										<motion.a
											variants={systemVariants.fadeUp}
											custom={{ y: 80 }}
											href={link.url}
											onClick={() => setIsOpen(false)}
											className="flex gap-4 items-baseline text-5xl italic font-black tracking-tighter uppercase text-foreground font-headline"
										>
											<span className="font-mono italic tracking-normal text-primary text-[10px]">
												0{i + 1}
											</span>
											{link.title}
										</motion.a>
									</div>
								))}
							</motion.nav>

							<div className="pt-8 mt-auto border-t border-border">
								<motion.div
									className="grid grid-cols-2 gap-y-6"
									variants={systemVariants.staggerContainer}
									initial="hidden"
									animate="visible"
									custom={{ stagger: 0.05, delay: 0.6 }}
								>
									{[
										{ label: "Shipping_Status", val: "Worldwide / Express" },
										{ label: "Support_Core", val: "24/7_Active" },
										{ label: "Payment_Gateway", val: "Encrypted_SSL" },
										{
											label: "Current_Drop",
											val: "Emerald_Series_v1",
											primary: true,
										},
									].map((item, i) => (
										<motion.div
											key={i}
											variants={systemVariants.fadeUp}
											custom={{ y: 10 }}
											className="flex flex-col gap-1"
										>
											<p className="font-mono uppercase text-muted-foreground text-[8px] tracking-[0.2em]">
												{item.label}
											</p>
											<p
												className={`text-[10px] font-bold uppercase ${item.primary ? "text-primary" : "text-foreground"}`}
											>
												{item.val}
											</p>
										</motion.div>
									))}
								</motion.div>
							</div>
						</div>

						<button
							onClick={() => setIsOpen(false)}
							className="flex absolute top-8 right-8 z-50 gap-2 items-center p-4 font-mono uppercase text-muted-foreground text-[10px] tracking-[0.3em]"
						>
							Close_Menu <X size={20} className="text-foreground" />
						</button>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
};

export default Header;
