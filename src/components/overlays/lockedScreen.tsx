"use client";

import { StyledButton } from "../partials/button";
import { Dimmer } from "./dimmer";

import React from "react";

export const LockedScreen = ({
	code,
	onCorrectCode,
	onIncorrectCode,
}: {
	code: string;
	onCorrectCode?: () => void;
	onIncorrectCode?: () => void;
}) => {
	const [enteredCode, setEnteredCode] = React.useState<string[]>([]);

	const handleNumberClick = (digit: string) => {
		if (enteredCode.length < 4) {
			setEnteredCode([...enteredCode, digit]);
		}
	};

	const handleClear = () => {
		setEnteredCode([]);
	};

	const handleDelete = () => {
		setEnteredCode(enteredCode.slice(0, -1));
	};

	const handleConfirm = () => {
		if (enteredCode.length !== 4) return;

		const enteredCodeString = enteredCode.join("");
		if (enteredCodeString === code) {
			onCorrectCode?.();
		} else {
			onIncorrectCode?.();
		}
		handleClear();
	};

	return (
		<>
			<Dimmer />
			<div className="fixed inset-0 z-50 flex items-center justify-center">
				<div className="flex flex-col items-center justify-center gap-6 rounded-lg border border-white/15 bg-gray-950/90 p-6 px-8">
					{/* Code display */}
					<div className="flex w-45 items-center justify-between rounded-md border border-white/15 bg-gray-900 p-4">
						{[0, 1, 2, 3].map(index => (
							<div key={index} className="flex items-center justify-center">
								<div
									className={`h-3 w-3 rounded-full ${index < enteredCode.length ? "bg-white" : "bg-white/20"}`}
								></div>
							</div>
						))}
					</div>

					{/* Number pad */}
					<div className="grid grid-cols-3 gap-3">
						{/* First row */}
						<StyledButton
							text="1"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("1")}
						/>
						<StyledButton
							text="2"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("2")}
						/>
						<StyledButton
							text="3"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("3")}
						/>

						{/* Second row */}
						<StyledButton
							text="4"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("4")}
						/>
						<StyledButton
							text="5"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("5")}
						/>
						<StyledButton
							text="6"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("6")}
						/>

						{/* Third row */}
						<StyledButton
							text="7"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("7")}
						/>
						<StyledButton
							text="8"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("8")}
						/>
						<StyledButton
							text="9"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("9")}
						/>

						{/* Fourth row */}
						<StyledButton
							text="✕"
							style="Danger"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={handleDelete}
						/>
						<StyledButton
							text="0"
							style="Secondary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={() => handleNumberClick("0")}
						/>
						<StyledButton
							text="✓"
							style="Primary"
							textAlign="center"
							className="h-13 w-13 font-mono text-2xl"
							onClick={handleConfirm}
						/>
					</div>
				</div>
			</div>
		</>
	);
};
