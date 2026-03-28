// Asset Imports
import heroMain from "@assets/hero-main.png";
import heroTwo from "@assets/hero-two.png";
import heroThree from "@assets/hero-three.png";
import heroFour from "@assets/hero-four.png";
import heroFive from "@assets/hero-five.png";
import heroSix from "@assets/hero-six.png";
import heroSeven from "@assets/hero-seven.png";

export const MOCK_PRODUCTS = [
	{
		id: "AR-7701-X",
		handle: "specter-shell-v1",
		title: "Specter_Shell // V1",
		vendor: "ARCHIVE_LABS",
		price: 24500, // $245.00
		featured_image: heroMain,
		category: "Footwear",
		description:
			"Multi-layered synthetic upper with reactive structural support. Optimized for high-velocity urban transit and low-light environments.",
		specs: ["Waterproof Membrane", "Carbon Fiber Plate", "Kinetic Grip System"],
	},
	{
		id: "AR-8802-N",
		handle: "neural-logic-runner",
		title: "Neural_Logic // Runner",
		vendor: "SYSTEM_CORE",
		price: 19800, // $198.00
		featured_image: heroTwo,
		category: "Performance",
		description:
			"Synchronized cushioning system designed to interface with natural movement patterns. Features a breathable knit mesh and adaptive lacing.",
		specs: [
			"Neural-Fit Mesh",
			"Impact-Dissipation Sole",
			"Reflective 3M Detail",
		],
	},
	{
		id: "AR-3309-E",
		handle: "emerald-protocol-01",
		title: "Emerald_Protocol // 01",
		vendor: "SERIES_V1",
		price: 32000, // $320.00
		featured_image: heroThree,
		category: "Heavy Duty",
		description:
			"Reinforced tactical silhouette. Part of the Emerald Series deployment. Built for extreme terrain navigation and structural durability.",
		specs: ["Abrasion Resistant", "Vibram Outsole", "Steel-Toe Integrity"],
	},
	{
		id: "AR-4404-V",
		handle: "void-walker-prime",
		title: "Void_Walker // Prime",
		vendor: "ARCHIVE_LABS",
		price: 21000, // $210.00
		featured_image: heroFour,
		category: "Lifestyle",
		description:
			"Minimalist design philosophy meeting maximalist performance. A sleek, matte-finish shell designed for seamless integration into the grid.",
		specs: ["Matte Synthetic Leather", "Internal Sock Liner", "Stealth Tread"],
	},
	{
		id: "AR-5505-S",
		handle: "static-shift-v2",
		title: "Static_Shift // V2",
		vendor: "SYSTEM_CORE",
		price: 18500, // $185.00
		featured_image: heroFive,
		category: "Footwear",
		description:
			"Updated V2 architecture. Features a redesigned heel counter for improved stability during lateral maneuvers. High-contrast visual markers.",
		specs: ["TPU Heel Cage", "High-Response Foam", "Digital Print Upper"],
	},
	{
		id: "AR-6606-P",
		handle: "phantom-trace-x",
		title: "Phantom_Trace // X",
		vendor: "SERIES_V1",
		price: 27500, // $275.00
		featured_image: heroSix,
		category: "Performance",
		description:
			"Experimental silhouette focusing on weight reduction. The 'Trace' series utilizes ultra-thin membranes for a second-skin experience.",
		specs: ["Featherweight Construction", "Laser-Cut Vents", "Precision Fit"],
	},
	{
		id: "AR-1107-C",
		handle: "cipher-core-07",
		title: "Cipher_Core // 07",
		vendor: "ARCHIVE_LABS",
		price: 23000, // $230.00
		featured_image: heroSeven,
		category: "Footwear",
		description:
			"The foundational model of the Archive. Reliable, robust, and versatile. Engineered for the everyday requirements of the modern operator.",
		specs: ["All-Weather Coating", "Dual-Density Midsole", "Nylon Pull Tabs"],
	},
];
