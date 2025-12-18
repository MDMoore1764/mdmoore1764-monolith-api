import { createServer } from "http"
import { app } from "./app.js"
import { config } from "./config/index.js"
import { wsManager } from "./websocket/server.js"

const server = createServer(app)

// Initialize WebSocket
wsManager.initialize(server)

// Start server
server.listen(config.port, () => {
	console.log(`🚀 Server running on http://localhost:${config.port}`)
	console.log(`📡 WebSocket available at ws://localhost:${config.port}${config.wsPath}`)
	console.log(`🔧 Environment: ${config.nodeEnv}`)
})

// Graceful shutdown
const shutdown = () => {
	console.log("\nShutting down gracefully...")
	wsManager.shutdown()
	server.close(() => {
		console.log("Server closed")
		process.exit(0)
	})
}

process.on("SIGTERM", shutdown)
process.on("SIGINT", shutdown)
