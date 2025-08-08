export function StyledButton({
	text,
	icon,
	onClick,
	disabled = false,
	className = "",
	style,
}: {
	text?: string;
	icon?: React.ReactNode;
	onClick?: () => void;
	disabled?: boolean;
	className?: string;
	style: "Primary" | "Secondary" | "Danger" | "Success" | "Warning";
}) {
	return (
		<button
			className={`flex items-center gap-2 rounded-md border-2 px-4 py-2 text-white disabled:opacity-50 ${className} ${
				style === "Primary" ? "border-white/15 bg-blue-500/40" : ""
			} ${style === "Secondary" ? "border-white/15 bg-gray-900" : ""} ${
				style === "Danger" ? "border-white/15 bg-red-500" : ""
			} ${style === "Success" ? "border-white/15 bg-green-500" : ""} ${
				style === "Warning" ? "border-white/15 bg-yellow-500" : ""
			}`}
			onClick={onClick}
			disabled={disabled}
		>
			{icon && <span className="text-lg">{icon}</span>}
			{text}
		</button>
	);
}
