import { gsap } from "gsap";

export function initTicker() {
	const leftTrack = document.querySelector('[data-gsap="ticker-left"]');
	const rightTrack = document.querySelector('[data-gsap="ticker-right"]');

	if (!leftTrack || !rightTrack) return;

	// Infinite Loop for Left Track
	gsap.to(leftTrack, {
		xPercent: -50,
		ease: "none",
		duration: 20,
		repeat: -1,
	});

	// Infinite Loop for Right Track (Starting from the end)
	gsap.set(rightTrack, { xPercent: -50 });
	gsap.to(rightTrack, {
		xPercent: 0,
		ease: "none",
		duration: 30,
		repeat: -1,
	});
}
