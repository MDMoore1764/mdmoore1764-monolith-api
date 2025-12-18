import type { ServiceResult } from "../types/index.js"

export abstract class BaseService {
	protected success<T>(data: T): ServiceResult<T> {
		return { success: true, data }
	}

	protected failure<T>(error: string): ServiceResult<T> {
		return { success: false, error }
	}
}
