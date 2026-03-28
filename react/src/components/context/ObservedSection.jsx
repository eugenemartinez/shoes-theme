import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useSection } from "./SectionContext";

export const ObservedSection = ({ id, children }) => {
	const { updateSection } = useSection();

	// This hook detects when the section is in the viewport
	const { ref, inView } = useInView({
		/* rootMargin: Defines the "sweet spot" in the viewport. 
       -20% from top and -70% from bottom means the section 
       must be in the upper-third of the screen to trigger.
    */
		rootMargin: "-20% 0px -70% 0px",
		threshold: 0,
	});

	useEffect(() => {
		if (inView) {
			updateSection(id); // Send the ID to the SectionContext
		}
	}, [inView, id, updateSection]);

	return (
		<div ref={ref} id={id} className="relative w-full">
			{children}
		</div>
	);
};
