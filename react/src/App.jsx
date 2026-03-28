import React from "react";
import {
	BrowserRouter as Router,
	Routes,
	Route,
	useLocation,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { SectionProvider } from "@components/context/SectionContext";
import { CartProvider } from "@components/context/CartContext";

// Layout & UI
import Layout from "@components/layout/Layout";
import PageTransition from "@components/motion/PageTransition";

// Pages
import Home from "@pages/Home";
import NotFound from "@pages/NotFound";
import Cart from "@pages/Cart";
import Collections from "@pages/Collections";
import Product from "@pages/Product";
import Search from "@pages/Search";

// ── Navigation Wrapper ──────────────────────────
const AnimatedRoutes = () => {
	const location = useLocation();

	// ── EXCLUSION LOGIC ─────────────────────────────
	// Detect if current path is a product detail page
	const isProductPage = location.pathname.startsWith("/products/");

	return (
		<>
			{/* Shutter: Only mounts if NOT on a product page */}
			<AnimatePresence mode="wait" initial={true}>
				{!isProductPage && (
					<PageTransition key={`${location.pathname}-shutter`} />
				)}
			</AnimatePresence>

			{/* Routes: Standard AnimatePresence for content */}
			<AnimatePresence mode="wait">
				<Routes location={location} key={location.pathname}>
					<Route path="/" element={<Home />} />
					<Route path="/cart" element={<Cart />} />
					<Route path="/collections" element={<Collections />} />
					<Route path="/search" element={<Search />} />

					{/* Keying the Product page here helps keep data fresh without shutter */}
					<Route
						path="/products/:handle"
						element={<Product key={location.pathname} />}
					/>

					<Route path="*" element={<NotFound />} />
				</Routes>
			</AnimatePresence>
		</>
	);
};

function App() {
	return (
		<SectionProvider>
			<CartProvider>
				<Router>
					<Layout>
						<AnimatedRoutes />
					</Layout>
				</Router>
			</CartProvider>
		</SectionProvider>
	);
}

export default App;
