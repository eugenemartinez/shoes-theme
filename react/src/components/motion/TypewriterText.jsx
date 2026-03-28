import React, { useEffect } from "react";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";

export const TypewriterText = ({
	text,
	delay = 0,
	duration = 2,
	loopDelay = 10,
	className,
}) => {
	const count = useMotionValue(0);
	const rounded = useTransform(count, (latest) => Math.round(latest));
	const displayText = useTransform(rounded, (latest) => text.slice(0, latest));

	useEffect(() => {
		const controls = animate(count, text.length, {
			type: "tween",
			duration: duration,
			delay: delay,
			ease: "linear",
			repeat: Infinity,
			repeatType: "loop",
			repeatDelay: loopDelay,
		});
		return controls.stop;
	}, [text, delay, duration, loopDelay, count]);

	return (
		/* Changed 'whitespace-nowrap' to 'whitespace-pre-wrap' and added 'break-words' */
		<motion.div
			className={`${className} typewriter-cursor whitespace-pre-wrap break-words w-full`}
		>
			<motion.span>{displayText}</motion.span>
		</motion.div>
	);
};
