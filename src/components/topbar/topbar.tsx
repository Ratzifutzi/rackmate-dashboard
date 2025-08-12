"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import {
	Moon,
	LockKeyhole,
	Lock,
	LayoutDashboard,
	Lightbulb,
	Zap,
	ShieldBan,
	Shield,
	Printer,
	Ticket,
	StickyNote,
	Paintbrush,
	Settings,
	Cloud,
	Power,
} from "lucide-react";
import { TopbarItem } from "./topbarItem";
import { TopbarSeperator } from "./topbarSeperator";
import { SleepOverlay } from "../overlays/sleep";
import { useNotification } from "@/context/NotificationContext";

export function Topbar() {
	const [screenInSleepAnimation, setScreenInSleepAnimation] = useState(false);
	const { createNotification } = useNotification();

	function enableSleepMode() {
		setScreenInSleepAnimation(true);
	}

	return (
		<>
			<div className="flex h-16 flex-row items-center justify-start gap-2 border-b border-white/10 p-2">
				<TopbarItem text="00:00" bold={true} />
				<TopbarItem icon={<Power />} />
				<TopbarItem icon={<Moon />} onClick={enableSleepMode} />
				<TopbarItem icon={<LockKeyhole />} />
				<TopbarSeperator />
				<TopbarItem text="Dashboard" icon={<LayoutDashboard />} target="/" />
				<TopbarItem text="Lights" icon={<Lightbulb />} target="/led" />
				<TopbarItem text="Power" icon={<Zap />} target="/power" />
				<TopbarItem text="Printer" icon={<Printer />} target="/printer" />
				<TopbarItem text="System" icon={<Shield />} disabled={true} />
				<TopbarItem text="API" icon={<Cloud />} disabled={true} />
			</div>

			{screenInSleepAnimation && (
				<SleepOverlay
					onAnimationComplete={() => {
						// Request the API to put the screen to sleep
						fetch("/api/sleep").then(response => {
							setTimeout(() => {
								setScreenInSleepAnimation(false);
							}, 500);

							if (!response.ok) {
								createNotification(
									"Error",
									`The screen could not be put to sleep. API Error: ${response.statusText}`,
									"Close",
									() => {},
									"Retry",
									() => {
										enableSleepMode();
									}
								);
							}
						});
					}}
				/>
			)}
		</>
	);
}
