'use client';

import {
	Box,
	Button,
	Spinner,
	Text,
} from '@chakra-ui/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function TabButton({
	icon,
	text,
	href,
	loadingState,
}: {
	icon?: React.ReactNode;
	text: string;
	href: string;
	loadingState?: boolean;
}) {
	const pathname = usePathname();

	const isActive = pathname === href;

	return (
		<Link href={href}>
			<Button
				height={'100%'}
				variant={isActive ? 'solid' : 'surface'}
			>
				{!loadingState && icon}
				{loadingState && (
					<Box
						w={'20px'}
						h={'20px'}
						display={'flex'}
						alignItems={'center'}
						justifyContent={'center'}
					>
						<Spinner size={'sm'} />
					</Box>
				)}
				<Text fontSize={'md'}>{text}</Text>
			</Button>
		</Link>
	);
}
