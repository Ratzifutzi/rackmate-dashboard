import {
	createSystem,
	defaultConfig,
	defineConfig,
} from '@chakra-ui/react';

const config = defineConfig({
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
