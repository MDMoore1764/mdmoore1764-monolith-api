import { WebSocketServer, WebSocket } from "ws"
import type { Server } from "http"
import { v4 as uuidv4 } from "uuid"
import { config } from "../config/index.js"
import { handleMessage, sendMessage } from "./handlers.js"
import type { WebSocketMessage } from "../types/index.js"

interface ExtendedWebSocket extends WebSocket {
	id: string
	isAlive: boolean
}

class WebSocketManager {
	private wss: WebSocketServer | null = null
	private clients = new Map<string, ExtendedWebSocket>()
	private heartbeatInterval: NodeJS.Timeout | null = null

	initialize(server: Server): void {
		this.wss = new WebSocketServer({
			server,
			path: config.wsPath
		})

		this.wss.on("connection", (ws: WebSocket) => {
			const extWs = ws as ExtendedWebSocket
			extWs.id = uuidv4()
			extWs.isAlive = true

			this.clients.set(extWs.id, extWs)
			console.log(`WebSocket client connected: ${extWs.id}`)

			sendMessage(extWs, "connected", { id: extWs.id })

			extWs.on("pong", () => {
				extWs.isAlive = true
			})

			extWs.on("message", (data) => {
				try {
					const message: WebSocketMessage = JSON.parse(data.toString())
					handleMessage(extWs, message)
				} catch {
					sendMessage(extWs, "error", { message: "Invalid message format" })
				}
			})

			extWs.on("close", () => {
				this.clients.delete(extWs.id)
				console.log(`WebSocket client disconnected: ${extWs.id}`)
			})

			extWs.on("error", (error) => {
				console.error(`WebSocket error for ${extWs.id}:`, error)
			})
		})

		this.startHeartbeat()
		console.log(`WebSocket server initialized on path: ${config.wsPath}`)
	}

	private startHeartbeat(): void {
		this.heartbeatInterval = setInterval(() => {
			this.clients.forEach((ws) => {
				if (!ws.isAlive) {
					this.clients.delete(ws.id)
					return ws.terminate()
				}
				ws.isAlive = false
				ws.ping()
			})
		}, 30000)
	}

	broadcast<T>(type: string, payload: T, excludeId?: string): void {
		this.clients.forEach((ws) => {
			if (ws.id !== excludeId) {
				sendMessage(ws, type, payload)
			}
		})
	}

	sendTo<T>(clientId: string, type: string, payload: T): boolean {
		const client = this.clients.get(clientId)
		if (client) {
			sendMessage(client, type, payload)
			return true
		}
		return false
	}

	getClientCount(): number {
		return this.clients.size
	}

	shutdown(): void {
		if (this.heartbeatInterval) {
			clearInterval(this.heartbeatInterval)
		}
		this.clients.forEach((ws) => ws.close())
		this.wss?.close()
	}
}

export const wsManager = new WebSocketManager()
