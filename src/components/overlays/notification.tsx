"use client";

import * as React from "react";
import { useState } from "react";
import { Dimmer } from "./dimmer";
import { StyledButton } from "../partials/button";
import { Info } from "lucide-react";

export function NotificationOverlay({
	title,
	message,
	closeButtonText,
	customButtonText,
	closeCallback,
	customButtonCallback,
}: {
	title: string;
	message: string;
	closeButtonText?: string;
	customButtonText?: string;
	closeCallback?: () => void;
	customButtonCallback?: () => void;
}) {
	return (
		<>
			<Dimmer />
			<div className="fixed inset-0 z-20 flex items-center justify-center">
				<div className="flex h-80 w-70 flex-col items-center justify-evenly rounded-lg border border-white/15 bg-gray-950 p-4">
					<Info className="h-10 w-10 text-blue-500" />
					<div className="flex flex-col items-center">
						<h1 className="text-center text-5xl font-extrabold text-white">{title}</h1>
						<p className="mt-2 text-center text-lg text-gray-300">{message}</p>
					</div>
					<div className="mt-4 flex justify-center gap-5">
						<StyledButton
							text={closeButtonText || "Close"}
							style="Secondary"
							onClick={closeCallback}
							className="h-12 px-5"
						/>
						{customButtonText && (
							<StyledButton
								text={customButtonText}
								style="Primary"
								onClick={customButtonCallback || closeCallback}
								className="h-12 px-5"
							/>
						)}
					</div>
				</div>
			</div>
		</>
	);
}
