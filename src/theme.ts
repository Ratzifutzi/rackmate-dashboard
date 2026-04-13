import {
	createSystem,
	defaultConfig,
	defineConfig,
} from '@chakra-ui/react';

const config = defineConfig({
	conditions: {
		_hover: '&:where(.chakra-hover-disabled)',
	},
	theme: {
		tokens: {
			fonts: {
				body: {
					value: "'Lexend Variable', sans-serif",
				},
			},
		},
	},
});

export const system = createSystem(defaultConfig, config);
