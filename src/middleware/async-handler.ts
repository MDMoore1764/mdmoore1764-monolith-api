import type { Request, Response, NextFunction } from "express"
import type { AsyncHandler } from "../types/index.js"

export function asyncHandler(fn: AsyncHandler) {
	return (req: Request, res: Response, next: NextFunction): void => {
		Promise.resolve(fn(req, res, next)).catch(next)
	}
}
