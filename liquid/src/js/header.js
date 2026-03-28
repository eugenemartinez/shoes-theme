import { gsap } from "gsap";

export function initHeader() {
	const header = document.querySelector("[data-header]");
	const toggle = document.getElementById("nav-toggle");
	const close = document.getElementById("nav-close");
	const menu = document.getElementById("mobile-menu");

	// Bar references for the hamburger animation
	const barTop = toggle?.querySelector('[data-bar="top"]');
	const barMid = toggle?.querySelector('[data-bar="mid"]');
	const barBot = toggle?.querySelector('[data-bar="bot"]');

	if (!header || !toggle || !menu) return;

	const isSticky = header.dataset.sticky === "true";
	let isOpen = false;

	// ── 01. Sticky & Scroll Logic ──────────────────
	if (isSticky) {
		let lastScroll = 0;
		window.addEventListener(
			"scroll",
			() => {
				const current = window.scrollY;
				if (current > 50) {
					gsap.to(header, {
						backgroundColor: "rgba(var(--background-rgb), 0.85)",
						backdropFilter: "blur(12px)",
						paddingTop: "1rem",
						paddingBottom: "1rem",
						borderBottom: "1px solid var(--border)",
						duration: 0.4,
						ease: "power2.out",
					});
				} else {
					gsap.to(header, {
						backgroundColor: "transparent",
						backdropFilter: "blur(0px)",
						paddingTop: "1.25rem",
						paddingBottom: "1.25rem",
						borderBottom: "1px solid transparent",
						duration: 0.4,
					});
				}

				if (current > lastScroll && current > 300) {
					gsap.to(header, { y: "-100%", duration: 0.4, ease: "power3.in" });
				} else {
					gsap.to(header, { y: "0%", duration: 0.5, ease: "power3.out" });
				}
				lastScroll = current;
			},
			{ passive: true },
		);
	}

	// ── 02. Mobile Navigation Logic ───────────────────────
	function openMenu() {
		isOpen = true;
		menu.classList.remove("pointer-events-none");
		menu.setAttribute("aria-hidden", "false");

		// Animate Menu Overlay
		gsap.to(menu, { opacity: 1, duration: 0.4, ease: "expo.out" });

		// Animate Hamburger Bars to 'X'
		gsap.to(barTop, { rotation: 45, y: 5, width: 20, duration: 0.3 });
		gsap.to(barMid, { x: 20, opacity: 0, duration: 0.2 });
		gsap.to(barBot, { rotation: -45, y: -5, width: 20, duration: 0.3 });

		// Stagger the Nav Links
		gsap.fromTo(
			".mobile-nav-link",
			{ y: 100, rotate: 5, opacity: 0 },
			{
				y: 0,
				rotate: 0,
				opacity: 1,
				duration: 0.8,
				stagger: 0.1,
				ease: "expo.out",
				delay: 0.2,
			},
		);

		// Stagger the Tech Specs
		gsap.fromTo(
			"#mobile-menu .flex-col.gap-1",
			{ opacity: 0, y: 10 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.05,
				ease: "power2.out",
				delay: 0.6,
			},
		);

		document.body.style.overflow = "hidden";
	}

	function closeMenu() {
		isOpen = false;
		menu.setAttribute("aria-hidden", "true");

		gsap.to(menu, {
			opacity: 0,
			duration: 0.3,
			ease: "power2.in",
			onComplete: () => menu.classList.add("pointer-events-none"),
		});

		// Reset Hamburger Bars
		gsap.to(barTop, { rotation: 0, y: 0, duration: 0.3 });
		gsap.to(barMid, { x: 0, opacity: 1, duration: 0.2 });
		gsap.to(barBot, { rotation: 0, y: 0, duration: 0.3 });

		document.body.style.overflow = "";
	}

	// ── 03. Event Listeners ──
	toggle.addEventListener("click", (e) => {
		e.preventDefault();
		isOpen ? closeMenu() : openMenu();
	});

	// Close Button (The 'X') - Updated with Safety
	if (close) {
		close.addEventListener("click", (e) => {
			e.preventDefault();
			e.stopPropagation(); // Prevents click from "bleeding" into the menu background
			closeMenu();
		});
	}

	// Close menu if a link is clicked
	menu.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", closeMenu);
	});

	// Close on Escape key
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && isOpen) closeMenu();
	});
}
