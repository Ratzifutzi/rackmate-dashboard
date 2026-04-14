declare global {
	namespace NodeJS {
		interface ProcessEnv {
			RELAY_SERVER_IP: string;
		}
	}
}

export {};
