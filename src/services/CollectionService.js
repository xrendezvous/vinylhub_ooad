export class CollectionService {
    constructor(repo) {
        this.repo = repo;
    }

    async addItem(userId, vinylId, condition, notes, photos) {
        if (!userId || !vinylId || !condition) {
            throw new Error("userId, vinylId, and condition are required");
        }

        return await this.repo.create({
            userId,
            vinylId,
            condition,
            notes: notes || null,
            photos: photos || null,
            addedAt: new Date()
        });
    }

    async getUserCollection(userId) {
        return await this.repo.findByUser(userId);
    }

    async updateItem(id, data) {
        const updated = await this.repo.update(id, data);
        if (!updated) throw new Error("Collection item not found");
        return updated;
    }

    async deleteItem(id) {
        const deleted = await this.repo.delete(id);
        if (!deleted) throw new Error("Collection item not found");
        return deleted;
    }
}
