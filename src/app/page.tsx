"use client";

import * as React from "react";
import { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";

export default function Home() {
	const [temperature, setTemperature] = useState(0);

	useEffect(() => {
		const fetchTemperature = async () => {
			try {
				const response = await fetch("/api/system/temperature");
				if (!response.ok) {
					throw new Error("Failed to fetch temperature");
				}
				const data = await response.json();
				setTemperature(data.temperature);
			} catch (error) {
				console.error("Error fetching temperature:", error);
			}
		};

		fetchTemperature();
		const intervalId = setInterval(fetchTemperature, 5000);

		return () => clearInterval(intervalId);
	}, []);

	return (
		<>
			<div className="flex h-full flex-row items-center px-10">
				<GaugeComponent
					type="semicircle"
					arc={{
						width: 0.3,
						padding: 0.005,
						cornerRadius: 1,
						// gradient: true,
						subArcs: [
							{
								limit: 45,
								color: "#5BE12C", // Cool/Good (green)
								showTick: false, // Don't show tick for first section
							},
							{
								limit: 65,
								color: "#5BE12C", // Normal operating temp (green)
								showTick: false, // No tick since color doesn't change
							},
							{
								limit: 75,
								color: "#F5CD19", // Warm but acceptable (yellow)
								showTick: true, // Show tick at green to yellow transition
							},
							{
								color: "#EA4228", // Very hot, potential throttling (red)
							},
						],
					}}
					pointer={{
						color: "#345243",
						length: 0.8,
						width: 15,
					}}
					labels={{
						valueLabel: {
							formatTextValue: value => Number(value).toFixed(1) + "°C",
						},
						tickLabels: {
							type: "outer",
							defaultTickValueConfig: {
								formatTextValue: (value: any) => value + "°",
								style: { fontSize: 10 },
							},
							// Only show ticks at color transition points
							ticks: [{ value: 45 }, { value: 75 }],
						},
					}}
					value={temperature}
					minValue={0}
					maxValue={95}
				/>
			</div>
		</>
	);
}
