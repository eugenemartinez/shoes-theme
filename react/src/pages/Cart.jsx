import React from "react";
import { MOCK_PRODUCTS } from "@/data/data";

// Context
import { ObservedSection } from "@components/context/ObservedSection";

// Components
import MainCart from "@components/sections/MainCart";
import RelatedProducts from "@components/sections/RelatedProducts";

const Cart = () => {
	return (
		<main className="min-h-screen bg-background">
			{/* ── Section 01: Active Manifest ── */}
			<ObservedSection id="manifest_index">
				{/* No props needed! MainCart uses useCart() internally */}
				<MainCart />
			</ObservedSection>

			{/* ── Section 02: Supplemental Units ── */}
			<ObservedSection id="supplemental_data">
				<RelatedProducts
					products={MOCK_PRODUCTS}
					heading="Supplemental_Units"
					limit={8}
				/>
			</ObservedSection>
		</main>
	);
};

export default Cart;
