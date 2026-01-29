'use client';

import { Box, Button } from '@chakra-ui/react';

export default function Header() {
	return (
		<>
			<Box
				width={'100dvw'}
				height={'3.5em'}
				bg={'bg.subtle'}
				display={'flex'}
				padding={'7px'}
				borderBottom={'solid 1.5px'}
				borderBottomColor={'border'}
			>
				<Button height={'100%'} variant={'surface'}>
					Test
				</Button>
			</Box>
		</>
	);
}
