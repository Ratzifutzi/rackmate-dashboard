"use client";

import CircularProgress from "@/components/partials/circleGauge";
import * as React from "react";
import { useEffect, useState } from "react";
import GaugeComponent from "react-gauge-component";

export default function Home() {
	const [temperature, setTemperature] = useState(0);
	const [cpuLoad, setCpuLoad] = useState(0);
	const [ramUsage, setRamUsage] = useState(0);

	useEffect(() => {
		const fetchCpuLoad = async () => {
			try {
				const response = await fetch("/api/system/cpu", { cache: "no-store" });
				if (!response.ok) throw new Error("Failed to fetch CPU load");
				const data = await response.json();
				const load = Number(data);
				if (Number.isFinite(load)) setCpuLoad(load);
			} catch (error) {
				setCpuLoad(-1);
			}
		};

		const fetchramUsage = async () => {
			try {
				const response = await fetch("/api/system/ram", { cache: "no-store" });
				if (!response.ok) throw new Error("Failed to fetch RAM usage");
				const data = await response.json();
				const usage = Number(data);
				if (Number.isFinite(usage)) setRamUsage(usage);
			} catch (error) {
				setRamUsage(-1);
			}
		};

		const fetchTemperature = async () => {
			try {
				const response = await fetch("/api/system/temperature", { cache: "no-store" });
				if (!response.ok) throw new Error("Failed to fetch temperature");
				const data = await response.json();
				const t = Number(data.temperature);
				if (Number.isFinite(t)) setTemperature(t);
			} catch (error) {
				setTemperature(-1);
			}
		};

		fetchTemperature();
		fetchCpuLoad();
		fetchramUsage();
		const id = setInterval(() => {
			fetchTemperature();
			fetchCpuLoad();
			fetchramUsage();
		}, 1500);
		return () => clearInterval(id);
	}, []);

	return (
		<>
			<div className="flex h-full flex-row items-center px-10">
				<div className="flex h-[90%] flex-col justify-between">
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
					<div className="flex flex-row items-center justify-between">
						<CircularProgress value={cpuLoad} label="CPU:" />
						<CircularProgress value={ramUsage} label="RAM:" />
					</div>
				</div>
			</div>
		</>
	);
}
