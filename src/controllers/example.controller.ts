import type { Request, Response } from "express"
import { BaseController } from "./base.controller.js"
import { exampleService } from "../services/example.service.js"

export class ExampleController extends BaseController {
	async getAll(_req: Request, res: Response): Promise<void> {
		const result = await exampleService.getAll()
		this.handleServiceResult(res, result)
	}

	async getById(req: Request, res: Response): Promise<void> {
		const { id } = req.params

		if (!id) {
			this.sendError(res, "ID is required", 400)
			return
		}

		const result = await exampleService.getById(id)

		if (!result.success) {
			this.sendError(res, result.error!, 404)
			return
		}

		this.handleServiceResult(res, result)
	}

	async create(req: Request, res: Response): Promise<void> {
		const { name, description } = req.body

		if (!name || !description) {
			this.sendError(res, "Name and description are required")
			return
		}

		const result = await exampleService.create(name, description)
		this.handleServiceResult(res, result, 201)
	}

	async update(req: Request, res: Response): Promise<void> {
		const { id } = req.params
		const { name, description } = req.body

		if (!id) {
			this.sendError(res, "ID is required", 400)
			return
		}

		const result = await exampleService.update(id, { name, description })

		if (!result.success) {
			this.sendError(res, result.error!, 404)
			return
		}

		this.handleServiceResult(res, result)
	}

	async delete(req: Request, res: Response): Promise<void> {
		const { id } = req.params

		if (!id) {
			this.sendError(res, "ID is required", 400)
			return
		}

		const result = await exampleService.delete(id)

		if (!result.success) {
			this.sendError(res, result.error!, 404)
			return
		}

		this.sendSuccess(res, { deleted: true })
	}
}

export const exampleController = new ExampleController()
