import dotenv from "dotenv"
import path from "path"

dotenv.config()

const port = process.env.PORT

if (!port) {
	throw new Error("Port is required.")
}

const env = process.env.NODE_ENV

if (!env) {
	throw new Error("Environment is required.")
}

export const config = {
	port: parseInt(port, 10),
	nodeEnv: env,
	wsPath: process.env.WS_PATH || "/ws",
	isDevelopment: env === "development",
	isProduction: env === "production"
} as const
