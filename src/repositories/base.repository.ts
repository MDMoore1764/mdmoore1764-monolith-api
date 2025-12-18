export interface Entity {
	id: string
	createdAt: Date
	updatedAt: Date
}

export abstract class BaseRepository<T extends Entity> {
	protected items: Map<string, T> = new Map()

	async findAll(): Promise<T[]> {
		return Array.from(this.items.values())
	}

	async findById(id: string): Promise<T | null> {
		return this.items.get(id) || null
	}

	async create(item: T): Promise<T> {
		this.items.set(item.id, item)
		return item
	}

	async update(id: string, updates: Partial<T>): Promise<T | null> {
		const existing = this.items.get(id)
		if (!existing) return null

		const updated = { ...existing, ...updates, updatedAt: new Date() }
		this.items.set(id, updated)
		return updated
	}

	async delete(id: string): Promise<boolean> {
		return this.items.delete(id)
	}

	async exists(id: string): Promise<boolean> {
		return this.items.has(id)
	}
}
