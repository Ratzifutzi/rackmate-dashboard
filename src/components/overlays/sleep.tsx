"use client";

import { useEffect, useState } from "react";

export function SleepOverlay({ onAnimationComplete }: { onAnimationComplete?: () => void }) {
	const [isVisible, setIsVisible] = useState(false);

	useEffect(() => {
		const timeout = setTimeout(() => {
			setIsVisible(true);
		}, 10);

		const animationTimeout = setTimeout(() => {
			onAnimationComplete?.();
		}, 1010);

		return () => {
			clearTimeout(timeout);
			clearTimeout(animationTimeout);
		};
	}, [onAnimationComplete]);

	return (
		<div
			className={`pointer-events-none fixed inset-0 z-[9999] bg-black transition-opacity duration-1000 ease-in-out ${isVisible ? "opacity-100" : "opacity-0"} `}
		/>
	);
}
