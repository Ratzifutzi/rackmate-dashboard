'use client';

import StyledBox from '@/components/partials/styledBox';
import toggleAll from '@/helpers/relays/toggleAll';
import {
	Box,
	Button,
	ButtonProps,
	Spinner,
	Text,
} from '@chakra-ui/react';
import { ZapIcon, ZapOffIcon } from 'lucide-react';
import { useLoadingStates } from '@/contexts/LoadingStates';

function BigSwitch({
	children,
	...props
}: { children?: React.ReactNode } & ButtonProps) {
	return (
		<Button
			{...props}
			width={'120px'}
			height={'90px'}
			variant={'surface'}
			flexDirection={'column'}
			spinner={<Spinner size={'lg'} />}
		>
			{children}
		</Button>
	);
}

function IndividualSwitch({ id }: { id: number }) {
	return (
		<StyledBox height={'full'} width={'115px'}>
			<Text
				textAlign={'center'}
				color={'fg.subtle'}
				padding={'7px'}
				fontSize={'sm'}
			>
				Relay #{id}
			</Text>
		</StyledBox>
	);
}

export default function Relay() {
	const { RelayLoading, setRelayLoading } =
		useLoadingStates();

	return (
		<Box
			display={'flex'}
			gap={'10px'}
			justifyContent={'space-evenly'}
			height={'full'}
		>
			<StyledBox
				height={'full'}
				width={'220px'}
				padding={'10px'}
				gap={'15px'}
				display={'flex'}
				justifyContent={'center'}
				alignItems={'center'}
				flexDirection={'column'}
			>
				<Text
					fontSize={'2xl'}
					fontWeight={'bold'}
					textAlign={'center'}
				>
					Master
				</Text>

				<BigSwitch
					loading={RelayLoading}
					colorPalette={'green'}
					onClick={() => toggleAll(true, setRelayLoading)}
				>
					<ZapIcon /> All ON
				</BigSwitch>
				<BigSwitch
					loading={RelayLoading}
					colorPalette={'red'}
					onClick={() => toggleAll(false, setRelayLoading)}
				>
					<ZapOffIcon /> All OFF
				</BigSwitch>
			</StyledBox>

			{[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
				<IndividualSwitch key={id} id={id} />
			))}
		</Box>
	);
}
