// CircularProgress.tsx
import React from "react";

type Props = {
	value: number;
	label?: string;
	size?: number;
	stroke?: number;
	trackClassName?: string;
	progressClassName?: string;
	showLabel?: boolean;
};

export default function CircularProgress({
	value,
	label,
	size = 120,
	stroke = 4,
	trackClassName = "stroke-gray-900",
	progressClassName = "stroke-blue-500",
	showLabel = true,
}: Props) {
	const clamped = Math.max(0, Math.min(100, value));
	const radius = (size - stroke) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference * (1 - clamped / 100);

	return (
		<div
			className="grid place-items-center"
			style={{ width: size, height: size }}
			role="img"
			aria-label={`Progress: ${clamped}%`}
		>
			<svg width={size} height={size} className="rotate-[-90deg]">
				{/* Track */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					className={trackClassName}
					fill="transparent"
					strokeWidth={stroke}
				/>
				{/* Progress */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					className={`${progressClassName} transition-[stroke-dashoffset] duration-500 ease-out`}
					fill="transparent"
					strokeWidth={stroke}
					strokeLinecap="round"
					strokeDasharray={circumference}
					strokeDashoffset={offset}
				/>
			</svg>
			{showLabel && (
				<div className="pointer-events-none absolute text-center text-xl font-medium">
					{label ? label + "\n" : ""}
					{label ? <br /> : ""}
					{clamped.toFixed(2)}%
				</div>
			)}
		</div>
	);
}
