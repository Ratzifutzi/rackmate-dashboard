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
				<TopbarItem icon={<LockKeyhole />} />
				<TopbarItem icon={<Moon />} onClick={enableSleepMode} />
				<TopbarSeperator />
				<TopbarItem text="Dashboard" icon={<LayoutDashboard />} target="/" />
				<TopbarItem text="LEDs" icon={<Lightbulb />} target="/led" />
				<TopbarItem text="Power" icon={<Zap />} target="/power" />
				<TopbarItem text="Security" icon={<Shield />} disabled={true} />
			</div>

			{screenInSleepAnimation && (
				<SleepOverlay
					onAnimationComplete={() => {
						setScreenInSleepAnimation(false);
						createNotification(
							"Error",
							"The screen could not be put to sleep. API error.",
							"Close",
							() => {},
							"Retry",
							() => {
								enableSleepMode();
							}
						);
					}}
				/>
			)}
		</>
	);
}
