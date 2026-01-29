import { Box, type BoxProps } from '@chakra-ui/react';

export default function StyledBox(props: BoxProps) {
	return (
		<Box
			{...props}
			bg={'bg.subtle'}
			border={'solid 1px'}
			borderColor={'border'}
			borderRadius={'md'}
		/>
	);
}
