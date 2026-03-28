import React from "react";
import { ObservedSection } from "@components/context/ObservedSection";
import Hero from "@components/sections/Hero";
import BrandTicker from "@components/sections/BrandTicker";
import SplitManifesto from "@components/sections/SplitManifesto";
import TechSpecs from "@components/sections/TechSpecs";
import ProductShowcase from "@components/sections/ProductShowcase";
import Lookbook from "@components/sections/Lookbook";
import TechnicalIntelligence from "@components/sections/TechnicalIntelligence";
import FinalDeployment from "@components/sections/FinalDeployment";

const Home = () => (
	<main className="relative z-10">
		<ObservedSection id="hero-home">
			<Hero />
		</ObservedSection>
		<ObservedSection id="brand-ticker">
			<BrandTicker />
		</ObservedSection>
		<ObservedSection id="split-manifesto">
			<SplitManifesto />
		</ObservedSection>
		<ObservedSection id="tech-specs">
			<TechSpecs />
		</ObservedSection>
		<ObservedSection id="product-showcase">
			<ProductShowcase />
		</ObservedSection>
		<ObservedSection id="lookbook">
			<Lookbook />
		</ObservedSection>
		<ObservedSection id="technical-intelligence">
			<TechnicalIntelligence />
		</ObservedSection>
		<ObservedSection id="final-deployment">
			<FinalDeployment />
		</ObservedSection>
	</main>
);

export default Home;
