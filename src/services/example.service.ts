import { v4 as uuidv4 } from "uuid"
import { BaseService } from "./base.service.js"
import { exampleRepository, type ExampleEntity } from "../repositories/example.repository.js"
import type { ServiceResult } from "../types/index.js"

export class ExampleService extends BaseService {
	async getAll(): Promise<ServiceResult<ExampleEntity[]>> {
		const items = await exampleRepository.findAll()
		return this.success(items)
	}

	async getById(id: string): Promise<ServiceResult<ExampleEntity>> {
		const item = await exampleRepository.findById(id)
		if (!item) {
			return this.failure("Item not found")
		}
		return this.success(item)
	}

	async create(name: string, description: string): Promise<ServiceResult<ExampleEntity>> {
		const existing = await exampleRepository.findByName(name)
		if (existing) {
			return this.failure("Item with this name already exists")
		}

		const item: ExampleEntity = {
			id: uuidv4(),
			name,
			description,
			createdAt: new Date(),
			updatedAt: new Date()
		}

		const created = await exampleRepository.create(item)
		return this.success(created)
	}

	async update(
		id: string,
		updates: Partial<Pick<ExampleEntity, "name" | "description">>
	): Promise<ServiceResult<ExampleEntity>> {
		const updated = await exampleRepository.update(id, updates)
		if (!updated) {
			return this.failure("Item not found")
		}
		return this.success(updated)
	}

	async delete(id: string): Promise<ServiceResult<boolean>> {
		const deleted = await exampleRepository.delete(id)
		if (!deleted) {
			return this.failure("Item not found")
		}
		return this.success(true)
	}
}

export const exampleService = new ExampleService()
