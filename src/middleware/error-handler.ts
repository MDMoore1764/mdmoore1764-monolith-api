import type { Request, Response, NextFunction } from "express"
import type { ApiResponse } from "../types/index.js"
import { config } from "../config/index.js"

export class AppError extends Error {
	constructor(public statusCode: number, public message: string, public isOperational = true) {
		super(message)
		Object.setPrototypeOf(this, AppError.prototype)
	}
}

export function errorHandler(err: Error, _req: Request, res: Response<ApiResponse>, _next: NextFunction): void {
	if (err instanceof AppError) {
		res.status(err.statusCode).json({
			success: false,
			error: err.message
		})
		return
	}

	console.error("Unexpected error:", err)

	res.status(500).json({
		success: false,
		error: config.isDevelopment ? err.message : "Internal server error"
	})
}
