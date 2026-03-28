import React from "react";
import MainCollections from "@components/sections/MainCollections";
import { ObservedSection } from "@components/context/ObservedSection";

const Collections = () => {
	return (
		<main className="min-h-screen bg-background">
			{/* This ID is what will appear in your Header typewriter */}
			<ObservedSection id="DIRECTORY_ARCHIVE">
				<MainCollections />
			</ObservedSection>

			{/* You can add more observed sections here later, like a "Newsletter" or "Footer_Info" */}
		</main>
	);
};

export default Collections;
