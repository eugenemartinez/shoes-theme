import { gsap } from "gsap";
import { initPageTransition } from "./js/page-transition.js";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { initGsapMotion } from "./js/gsap-motion.js";
import { initHeader } from "./js/header.js";
import { initDarkMode } from "./js/dark-mode.js";
import { initHero } from "./js/hero.js";
import { initTicker } from "./js/ticker.js";
import { initProductShowcase } from "./js/showcase.js";
import { initFAQ } from "./js/faq.js";
import { initNavSync } from "./js/nav-sync.js";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
	initPageTransition();
	initGsapMotion();
	initHeader();
	initDarkMode();
	initHero();
	initTicker();
	initProductShowcase();
	initFAQ();
	initNavSync();
});
