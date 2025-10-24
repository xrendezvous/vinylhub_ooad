export class CollectionService {
    constructor(repo) {
        this.repo = repo;
    }

    async addItem(userId, vinylId, condition, notes, photos) {
        return await this.repo.create({
            userId,
            vinylId,
            condition,
            notes,
            photos,
            addedAt: new Date()
        });
    }

    async getUserCollection(userId) {
        return await this.repo.findByUser(userId);
    }

    async updateItem(id, data) {
        return await this.repo.update(id, data);
    }

    async deleteItem(id) {
        return await this.repo.delete(id);
    }
}
