import type { WebSocket } from "ws"
import type { WebSocketMessage } from "../types/index.js"

type MessageHandler = (ws: WebSocket, payload: unknown) => void

const handlers = new Map<string, MessageHandler>()

// Register a handler for a message type
export function registerHandler(type: string, handler: MessageHandler): void {
	handlers.set(type, handler)
}

// Process incoming message
export function handleMessage(ws: WebSocket, message: WebSocketMessage): void {
	const handler = handlers.get(message.type)

	if (handler) {
		handler(ws, message.payload)
	} else {
		sendMessage(ws, "error", { message: `Unknown message type: ${message.type}` })
	}
}

// Send a message to a client
export function sendMessage<T>(ws: WebSocket, type: string, payload: T): void {
	const message: WebSocketMessage<T> = {
		type,
		payload,
		timestamp: Date.now()
	}

	if (ws.readyState === ws.OPEN) {
		ws.send(JSON.stringify(message))
	}
}

// Register default handlers
registerHandler("ping", (ws) => {
	sendMessage(ws, "pong", { time: Date.now() })
})

registerHandler("echo", (ws, payload) => {
	sendMessage(ws, "echo", payload)
})
