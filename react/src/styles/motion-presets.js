import { easeIn, easeOut } from "motion";

/**
 * motion-presets.js
 * Centralized Motion variants for the SYSTEM_RECREATION.
 * Replaces imperative GSAP logic with declarative, dynamic functional variants.
 */

// ── Shared Transitions ──────────────────────────────────────
const TRANSITION_FLUID = { duration: 0.6, ease: [0.22, 1, 0.36, 1] };
const TRANSITION_BOUNCE = { type: "spring", stiffness: 300, damping: 20 };

export const systemVariants = {
	// ── Entrance Presets ────────────────────────────────────────

	// fadeUp now accepts an object for y, delay, and duration
	fadeUp: {
		hidden: (custom = {}) => ({
			opacity: 0,
			y: custom.y ?? 40,
		}),
		visible: (custom = {}) => ({
			opacity: 1,
			y: 0,
			transition: {
				...TRANSITION_FLUID,
				delay: custom.delay ?? 0,
				duration: custom.duration ?? 0.6,
			},
		}),
	},

	fadeDown: {
		hidden: (custom = {}) => ({
			opacity: 0,
			y: custom.y ?? -40,
		}),
		visible: (custom = {}) => ({
			opacity: 1,
			y: 0,
			transition: { ...TRANSITION_FLUID, delay: custom.delay ?? 0 },
		}),
	},

	fadeLeft: {
		hidden: (custom = {}) => ({
			opacity: 0,
			x: custom.x ?? -40,
		}),
		visible: (custom = {}) => ({
			opacity: 1,
			x: 0,
			transition: { ...TRANSITION_FLUID, delay: custom.delay ?? 0 },
		}),
	},

	fadeRight: {
		hidden: (custom = {}) => ({
			opacity: 0,
			x: custom.x ?? 40,
		}),
		visible: (custom = {}) => ({
			opacity: 1,
			x: 0,
			transition: { ...TRANSITION_FLUID, delay: custom.delay ?? 0 },
		}),
	},

	zoomIn: {
		hidden: (custom = {}) => ({
			opacity: 0,
			scale: custom.scale ?? 0.8,
		}),
		visible: (custom = {}) => ({
			opacity: 1,
			scale: 1,
			transition: { ...TRANSITION_BOUNCE, delay: custom.delay ?? 0 },
		}),
	},

	zoomOut: {
		hidden: (custom = {}) => ({
			opacity: 0,
			scale: custom.scale ?? 1.2,
		}),
		visible: (custom = {}) => ({
			opacity: 1,
			scale: 1,
			transition: { ...TRANSITION_FLUID, delay: custom.delay ?? 0 },
		}),
	},

	// ── Container & Stagger ─────────────────────────────────────

	staggerContainer: {
		hidden: { opacity: 1 },
		visible: (custom = {}) => ({
			opacity: 1,
			transition: {
				staggerChildren: custom.stagger ?? 0.1,
				delayChildren: custom.delay ?? 0.2,
			},
		}),
	},

	// ── Hover Interactions ──────────────────────────────────────

	hoverRise: {
		rest: { y: 0, scale: 1 },
		hover: {
			y: -6,
			scale: 1.03,
			transition: { duration: 0.3, ease: "easeOut" },
		},
	},

	hoverGlow: {
		rest: { filter: "drop-shadow(0 0 0px rgba(var(--primary-rgb), 0))" },
		hover: {
			filter: "drop-shadow(0 0 8px rgba(var(--primary-rgb), 0.5))",
			scale: 1.02,
		},
	},

	// ── Continuous / Looping ────────────────────────────────────

	pulse: {
		animate: (custom = {}) => ({
			scale: [1, custom.scale ?? 1.05, 1],
			transition: {
				duration: custom.duration ?? 2,
				repeat: Infinity,
				ease: "easeInOut",
			},
		}),
	},

	float: {
		animate: (custom = {}) => ({
			y: [0, custom.y ?? -15, 0],
			transition: {
				duration: custom.duration ?? 3,
				repeat: Infinity,
				ease: "easeInOut",
			},
		}),
	},

	spin: {
		animate: (custom = {}) => ({
			rotate: 360,
			transition: {
				duration: custom.duration ?? 8,
				repeat: Infinity,
				ease: "linear",
			},
		}),
	},

	// ── Specialized UI ──────────────────────────────────────────

	typewriter: {
		hidden: { width: 0 },
		visible: (custom = {}) => ({
			width: "fit-content", // Or "100%" if you prefer
			transition: {
				duration: custom.duration ?? 2,
				delay: custom.delay ?? 0, // Add this to capture your 1.5s delay
				ease: "linear", // "steps" is great for a chunky look, but linear is safer for testing
			},
		}),
	},

	typewriterLoop: {
		hidden: { opacity: 0 },
		visible: (custom = {}) => ({
			opacity: 1,
			transition: {
				duration: 0.01, // Instant opacity reveal
				delay: custom.delay || 0,
			},
		}),
	},
};
