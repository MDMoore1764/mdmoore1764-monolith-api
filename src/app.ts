import express from "express"
import { generalRoutes, resumeRoutes } from "./routes/index.js"
import { errorHandler } from "./middleware/error-handler.js"

const app = express()

// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS headers (for development)
app.use((_req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
	res.header("Access-Control-Allow-Headers", "Content-Type, Authorization")
	next()
})

// Routes
app.use("/", generalRoutes)

// 404 handler
app.use((_req, res) => {
	res.status(404).json({ success: false, error: "Not found" })
})

// Error handler
app.use(errorHandler)

export { app }
