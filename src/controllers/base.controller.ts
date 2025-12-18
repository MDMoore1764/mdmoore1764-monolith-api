import type { Response } from "express"
import type { ApiResponse, ServiceResult } from "../types/index.js"

export abstract class BaseController {
	protected sendSuccess<T>(res: Response, data: T, statusCode = 200): void {
		const response: ApiResponse<T> = {
			success: true,
			data
		}
		res.status(statusCode).json(response)
	}

	protected sendError(res: Response, error: string, statusCode = 400): void {
		const response: ApiResponse = {
			success: false,
			error
		}
		res.status(statusCode).json(response)
	}

	protected handleServiceResult<T>(res: Response, result: ServiceResult<T>, successStatus = 200): void {
		if (result.success && result.data !== undefined) {
			this.sendSuccess(res, result.data, successStatus)
		} else {
			this.sendError(res, result.error || "Unknown error", 400)
		}
	}
}
