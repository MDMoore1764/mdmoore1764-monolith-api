import { BaseRepository, type Entity } from "./base.repository.js"

export interface ExampleEntity extends Entity {
	name: string
	description: string
}

export class ExampleRepository extends BaseRepository<ExampleEntity> {
	async findByName(name: string): Promise<ExampleEntity | null> {
		const items = await this.findAll()
		return items.find((item) => item.name === name) || null
	}
}

export const exampleRepository = new ExampleRepository()
