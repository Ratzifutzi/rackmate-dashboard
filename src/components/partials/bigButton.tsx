"use client";

export function BigButton({
	offIcon,
	onIcon,
	onClick,
	currentState,
}: {
	offIcon: React.ReactNode;
	onIcon: React.ReactNode;
	onClick: (newState: boolean) => void;
	currentState: boolean;
}) {
	const handleClick = () => {
		onClick(!currentState);
	};

	return (
		<button
			className="flex h-[200px] w-[200px] items-center justify-center rounded-lg border-2 border-white/15 bg-gray-900 text-3xl text-white transition-all hover:bg-gray-800 active:scale-95"
			onClick={handleClick}
		>
			<div className="flex h-16 w-16 items-center justify-center">
				{currentState ? onIcon : offIcon}
			</div>
		</button>
	);
}
