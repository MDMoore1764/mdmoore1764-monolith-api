declare global {
	namespace NodeJS {
		interface ProcessEnv {
			PORT?: string
			NODE_ENV?: "development" | "production" | "test"
			WS_PATH?: string
		}
	}
}

export {}
