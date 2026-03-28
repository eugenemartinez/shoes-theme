export function initNavSync() {
	const display = document.getElementById("nav-section-display");
	// Target only the main sections we want to track
	const sections = document.querySelectorAll("section[id]");

	if (!display || sections.length === 0) return;

	const observerOptions = {
		root: null, // use the viewport
		rootMargin: "-20% 0px -70% 0px", // Trigger when section is in the upper-middle of screen
		threshold: 0,
	};

	const observer = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			if (entry.isIntersecting) {
				const sectionId = entry.target.id;

				// Clean up the ID for display (e.g., "product-showcase" -> "ARCHIVE")
				let displayName = sectionId.replace("-", "_").toUpperCase();

				// Optional: Manual overrides for specific IDs
				if (sectionId === "product-showcase") displayName = "ARCHIVE_001";
				if (sectionId === "faq-technical") displayName = "SYSTEM_FAQ";

				// Update the header with a slight "glitch" or fade effect
				display.style.opacity = "0";
				setTimeout(() => {
					display.textContent = displayName;
					display.style.opacity = "1";
				}, 150);
			}
		});
	}, observerOptions);

	sections.forEach((section) => observer.observe(section));
}
