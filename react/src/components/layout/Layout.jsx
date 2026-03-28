import React from "react";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import { useCart } from "@components/context/CartContext";
import CartDrawer from "@/components/sections/CartDrawer";

const Layout = ({ children }) => {
	// ── 1. Connect to Global Cart System ──
	const { cart, isDrawerOpen, openDrawer, closeDrawer } = useCart();

	const shopName = "SYSTEM_01";
	const menuLinks = [
		{ title: "Archive", url: "/collections" },
		{ title: "Manifest", url: "/cart" },
		{ title: "Protocol", url: "/search" },
	];

	return (
		<div className="flex relative flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-black">
			{/* ── 2. Pass Context Actions to Header ── */}
			<Header
				shopName={shopName}
				menu={menuLinks}
				currentSectionId="SYSTEM_ROOT"
				onCartClick={openDrawer} // Now uses global trigger
				cartCount={cart.item_count} // Uses live count from context
			/>

			<main className="flex-grow pt-20 lg:pt-24">{children}</main>

			<Footer menuLinks={menuLinks} />

			{/* ── 3. Global Drawer ── */}
			{/* Logic for content and updates is handled inside CartDrawer via useCart */}
			<CartDrawer isOpen={isDrawerOpen} onClose={closeDrawer} />
		</div>
	);
};

export default Layout;
