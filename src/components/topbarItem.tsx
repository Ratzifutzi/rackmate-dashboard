"use client";

import { usePathname } from "next/navigation";
import React from "react";

export function TopbarItem({
	icon,
	text,
	bold,
	target,
	disabled,
}: {
	icon?: React.ReactNode;
	text?: string;
	bold?: boolean;
	target?: string;
	disabled?: boolean;
}) {
	const pathname = usePathname();
	const isOnThisPage = target ? pathname === target : false;
	const className = `flex flex-row rounded-md items-center border h-12 min-w-12 justify-center border-white/15 ${isOnThisPage ? "bg-blue-500/40" : "bg-gray-900"} ${text ? "gap-2" : ""} p-1.5 has-[span]:px-3 ${bold ? "font-bold" : "font-semibold"} ${disabled ? "opacity-35 cursor-not-allowed" : ""}`;

	const renderIcon = () => {
		if (!icon || !React.isValidElement(icon)) return icon;

		return React.cloneElement(icon as React.ReactElement<React.SVGProps<SVGSVGElement>>, {
			fill: isOnThisPage ? "white" : "none",
			className: "w-6 h-6",
		});
	};

	const content = (
		<>
			{renderIcon()}
			{text && <span className="text-xl text-white/80">{text}</span>}
		</>
	);

	return target ? (
		<a href={target} className={className}>
			{content}
		</a>
	) : (
		<div className={className}>{content}</div>
	);
}
