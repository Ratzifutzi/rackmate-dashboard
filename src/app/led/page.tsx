"use client";

import { useState, useEffect } from "react";
import { HexColorPicker } from "react-colorful";
import { GetColorName } from "hex-color-to-color-name";
import { CirclePicker } from "react-color";
import { BigButton } from "@/components/partials/bigButton";
import { Zap, ZapOff } from "lucide-react";
import { GridLoader } from "react-spinners";

export default function LedPage() {
	const [isOn, setIsOn] = useState(false);
	const [color, setColor] = useState("");
	const [colorName, setColorName] = useState("");

	useEffect(() => {
		setColorName(GetColorName(color));
	}, [color]);

	return (
		<>
			<div className="flex h-full flex-row items-center px-10">
				<BigButton
					onIcon={<Zap className="h-full w-full" />}
					offIcon={<ZapOff className="h-full w-full" />}
					onClick={setIsOn}
					currentState={isOn}
				/>

				<div className="mx-5 h-65 w-px bg-white/20"></div>

				<div className={`flex flex-row gap-5 ${isOn ? "" : "pointer-events-none opacity-15"}`}>
					<HexColorPicker
						color={color}
						onChange={setColor}
						className="w-[200px]"
						title="test"
					/>
					<CirclePicker
						color={color}
						circleSize={60}
						onChangeComplete={color => setColor(color.hex)}
						width="450px"
					/>
				</div>

				<div className="mx-5 h-65 w-px bg-white/20"></div>
			</div>
		</>
	);
}
