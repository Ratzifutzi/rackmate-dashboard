"use client";

import { usePathname } from "next/navigation";

export function TopbarItem({
	icon,
	text,
	bold,
	target,
}: {
	icon?: React.ReactNode;
	text?: string;
	bold?: boolean;
	target?: string;
}) {
	const pathname = usePathname();
	const isOnThisPage = target ? pathname === target : false;
	const className = `flex flex-row rounded-md border border-white/15 ${isOnThisPage ? "bg-blue-500/40" : "bg-gray-900"} p-1.5 text-white has-[span]:px-3 ${bold ? "font-bold" : ""}`;
	const content = (
		<>
			{icon && icon}
			{text && <span className="text-white/80">{text}</span>}
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
