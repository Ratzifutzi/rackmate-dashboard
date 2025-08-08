"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Moon, LockKeyhole, Lock } from "lucide-react";
import { TopbarItem } from "./topbarItem";
import { TopbarSeperator } from "./topbarSeperator";

export function Topbar() {
	return (
		<>
			<div className="flex h-13 flex-row items-center justify-start gap-2 border-b border-white/10 p-2">
				<TopbarItem text="00:00" bold={true} />
				<TopbarItem icon={<LockKeyhole />} />
				<TopbarSeperator />
				<TopbarItem text="Dashboard" target="/" />
				<TopbarItem text="LEDs" target="/led" />
			</div>
		</>
	);
}
