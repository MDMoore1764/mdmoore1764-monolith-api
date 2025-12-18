import type { Request, Response, NextFunction } from "express"

export interface ApiResponse<T = unknown> {
	success: boolean
	data?: T
	error?: string
	message?: string
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
	page: number
	limit: number
	total: number
}

export interface WebSocketMessage<T = unknown> {
	type: string
	payload: T
	timestamp: number
}

export type AsyncHandler = (req: Request, res: Response, next: NextFunction) => Promise<void>

export interface ServiceResult<T> {
	success: boolean
	data?: T
	error?: string
}
