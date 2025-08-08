"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Moon, LockKeyhole, Lock, LayoutDashboard, Lightbulb, Zap, ShieldBan } from "lucide-react";
import { TopbarItem } from "./topbarItem";
import { TopbarSeperator } from "./topbarSeperator";

export function Topbar() {
	return (
		<>
			<div className="flex h-16 flex-row items-center justify-start gap-2 border-b border-white/10 p-2">
				<TopbarItem text="00:00" bold={true} />
				<TopbarItem icon={<LockKeyhole />} />
				<TopbarItem icon={<Moon />} />
				<TopbarSeperator />
				<TopbarItem text="Dashboard" icon={<LayoutDashboard />} target="/" />
				<TopbarItem text="LEDs" icon={<Lightbulb />} target="/led" />
				<TopbarItem text="Power" icon={<Zap />} target="/power" />
				<TopbarItem text="Security" icon={<ShieldBan />} disabled={true} />
			</div>
		</>
	);
}
