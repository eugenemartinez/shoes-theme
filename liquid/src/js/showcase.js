import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initProductShowcase() {
	const section = document.querySelector('section[id^="showcase-"]');
	const track = document.querySelector(".product-track");
	const progressLine = document.querySelector("#showcase-progress");

	if (!section || !track) return;

	// Refresh ScrollTrigger to account for the new spacers
	ScrollTrigger.refresh();

	// The total distance the track needs to move
	const scrollDistance = () => track.scrollWidth - window.innerWidth;

	const tl = gsap.timeline({
		scrollTrigger: {
			trigger: section,
			start: "top top",
			end: () => `+=${scrollDistance()}`,
			pin: true,
			scrub: 1,
			invalidateOnRefresh: true,
		},
	});

	// Animate the track
	tl.to(
		track,
		{
			x: () => -scrollDistance(),
			ease: "none",
		},
		0,
	);

	// Animate the progress bar
	if (progressLine) {
		tl.to(
			progressLine,
			{
				width: "100%",
				ease: "none",
			},
			0,
		);
	}
}
