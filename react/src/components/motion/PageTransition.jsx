import { motion } from "framer-motion";

const PageTransition = () => {
	return (
		<div className="flex fixed inset-0 pointer-events-none z-[9999]">
			{[...Array(5)].map((_, i) => (
				<motion.div
					key={i}
					className="flex-1 h-full bg-primary"
					// ── START: Covered (This happens the instant the new route mounts)
					initial={{ scaleY: 1 }}
					// ── ANIMATE: Retract (Revealing the new page)
					animate={{ scaleY: 0 }}
					// ── EXIT: Removed (No animation when clicking away)
					exit={{ opacity: 0 }}
					transition={{
						duration: 0.8,
						ease: [0.87, 0, 0.13, 1],
						delay: i * 0.05,
					}}
					style={{ originY: 1 }} // Retracts toward the bottom
				/>
			))}
		</div>
	);
};

export default PageTransition;
