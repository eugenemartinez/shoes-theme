import { gsap } from "gsap";

export function initHero() {
	const hero = document.querySelector("#hero");
	if (!hero) return;

	const parallaxItems = hero.querySelectorAll(".hero-parallax");
	const mainShoe = hero.querySelector('[alt="Main Sneaker"]');
	const textureImg = hero.querySelector('[alt="Material Detail"]');

	// ── 01. Mouse Interaction Logic ───────────────────────
	const handleMouseMove = (e) => {
		const { clientX, clientY } = e;
		const centerX = window.innerWidth / 2;
		const centerY = window.innerHeight / 2;

		// Normalize coordinates (-1 to 1)
		const moveX = (clientX - centerX) / centerX;
		const moveY = (clientY - centerY) / centerY;

		parallaxItems.forEach((item) => {
			const depth = parseFloat(item.getAttribute("data-depth")) || 1;

			// Calculate smooth translation based on individual depth
			gsap.to(item, {
				x: moveX * 60 * depth,
				y: moveY * 60 * depth,
				duration: 1.2,
				ease: "power2.out",
			});

			// 3D Tilt for the Main Shoe (adds physical weight)
			if (item === mainShoe) {
				gsap.to(item, {
					rotationY: moveX * 12,
					rotationX: -moveY * 12,
					transformPerspective: 1200,
					ease: "power2.out",
					duration: 1.2,
				});
			}
		});
	};

	// ── 02. Spring-Back Reset ────────────────────────────
	const handleMouseLeave = () => {
		gsap.to(parallaxItems, {
			x: 0,
			y: 0,
			rotationY: 0,
			rotationX: 0,
			duration: 2,
			ease: "elastic.out(1, 0.6)", // High-end "snappy" return
		});
	};

	// ── 03. Texture Detail Interaction ───────────────────
	// Adds a "micro-zoom" effect when focusing on the texture crop
	if (textureImg) {
		const textureContainer = textureImg.parentElement;

		textureContainer.addEventListener("mouseenter", () => {
			gsap.to(textureImg, {
				scale: 1.45,
				filter: "grayscale(0%) brightness(1.1)",
				duration: 0.5,
				ease: "expo.out",
			});
		});

		textureContainer.addEventListener("mouseleave", () => {
			gsap.to(textureImg, {
				scale: 1.25,
				filter: "grayscale(100%) brightness(1)",
				duration: 0.8,
				ease: "power2.out",
			});
		});
	}

	// ── 04. Listeners ────────────────────────────────────
	hero.addEventListener("mousemove", handleMouseMove);
	hero.addEventListener("mouseleave", handleMouseLeave);
}
