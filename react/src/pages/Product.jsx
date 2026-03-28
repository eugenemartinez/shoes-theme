import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { MOCK_PRODUCTS } from "@/data/data";

// Context
import { ObservedSection } from "@components/context/ObservedSection";

// Components
import MainProduct from "@components/sections/MainProduct";
import RelatedProducts from "@components/sections/RelatedProducts";

const Product = () => {
	const { handle } = useParams();

	// Immediate find to prevent flash
	const product =
		MOCK_PRODUCTS.find((p) => p.handle === handle) || MOCK_PRODUCTS[0];

	useEffect(() => {
		window.scrollTo(0, 0);
	}, [handle]);

	return (
		<main className="min-h-screen bg-background">
			{/* ── Section 01: Primary Unit Data ── */}
			<ObservedSection id="unit_specs">
				<MainProduct key={handle} product={product} />
			</ObservedSection>

			{/* ── Section 02: Neural Recommendations ── */}
			<ObservedSection id="recommendations">
				<RelatedProducts
					products={MOCK_PRODUCTS.filter(
						(p) => p.id !== product.id && p.vendor === product.vendor,
					)}
					heading="System_Recommendations"
					limit={4}
				/>
			</ObservedSection>
		</main>
	);
};

export default Product;
