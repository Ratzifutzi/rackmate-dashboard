'use client';

import React, {
	createContext,
	useContext,
	useState,
} from 'react';

type LoadingStatesContextValue = {
	RelayLoading: boolean;
	setRelayLoading: React.Dispatch<
		React.SetStateAction<boolean>
	>;
};

const LoadingStatesContext = createContext<
	LoadingStatesContextValue | undefined
>(undefined);

export function LoadingStatesProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const [RelayLoading, setRelayLoading] = useState(false);

	return (
		<LoadingStatesContext.Provider
			value={{ RelayLoading, setRelayLoading }}
		>
			{children}
		</LoadingStatesContext.Provider>
	);
}

export function useLoadingStates(): LoadingStatesContextValue {
	const ctx = useContext(LoadingStatesContext);
	if (!ctx) {
		throw new Error(
			'useLoadingStates must be used within LoadingStatesProvider',
		);
	}
	return ctx;
}
