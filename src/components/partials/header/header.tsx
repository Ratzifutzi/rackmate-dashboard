'use client';

import { Box } from '@chakra-ui/react';
import TabButton from './tabButton';
import { HomeIcon, PlugZapIcon } from 'lucide-react';
import { useLoadingStates } from '@/contexts/LoadingStates';

export default function Header() {
	const { RelayLoading } = useLoadingStates();

	return (
		<>
			<Box
				width={'100dvw'}
				height={'3.5em'}
				bg={'bg.subtle'}
				display={'flex'}
				gap={'7px'}
				padding={'7px'}
				paddingInline={"15px"}
				borderBottom={'solid 1.5px'}
				borderBottomColor={'border'}
			>
				<TabButton
					icon={<HomeIcon />}
					text="Home"
					href="/"
				/>
				<TabButton
					icon={<PlugZapIcon />}
					text="Relays"
					href="/relays"
					loadingState={RelayLoading}
				/>
			</Box>
		</>
	);
}
