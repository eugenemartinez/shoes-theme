import { gsap } from "gsap";

export function initPageTransition() {
	// 1. Create the container
	const container = document.createElement("div");
	container.id = "shutter-transition";
	container.style.cssText = `
    position: fixed;
    inset: 0;
    display: flex;
    z-index: 9999;
    pointer-events: none;
  `;

	// 2. Create 5 vertical panels
	for (let i = 0; i < 5; i++) {
		const panel = document.createElement("div");
		panel.className = "shutter-panel";
		panel.style.cssText = `
      flex: 1;
      height: 100%;
      background: var(--primary);
      transform: scaleY(0);
      transform-origin: top;
    `;
		container.appendChild(panel);
	}

	document.body.appendChild(container);

	// IN-ANIMATION: Panels "falling" away to reveal the page
	gsap.to(".shutter-panel", {
		scaleY: 0,
		duration: 0.8,
		stagger: 0.05,
		ease: "expo.inOut",
		transformOrigin: "bottom",
	});

	// LINK HANDLING
	document.querySelectorAll("a[href]").forEach((link) => {
		const href = link.getAttribute("href");
		if (!href || href.startsWith("#") || link.hasAttribute("target")) return;
		if (href.startsWith("http") && !href.startsWith(window.location.origin))
			return;

		link.addEventListener("click", (e) => {
			e.preventDefault();
			const destination = link.href;

			// OUT-ANIMATION: Panels "closing" before the jump
			gsap.to(".shutter-panel", {
				scaleY: 1,
				duration: 0.6,
				stagger: 0.08,
				ease: "expo.inOut",
				transformOrigin: "top",
				onComplete: () => {
					window.location.href = destination;
				},
			});
		});
	});
}
