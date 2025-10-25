import { CollectionItem } from "../models/CollectionItem.js";

export class CollectionRepository {
    async create(data) {
        return await CollectionItem.create(data);
    }

    async findByUser(userId) {
        return await CollectionItem.findAll({ where: { userId } });
    }

    async findByVinyl(vinylId) {
        return await CollectionItem.findAll({ where: { vinylId } });
    }

    async findById(id) {
        return await CollectionItem.findByPk(id);
    }

    async update(id, data) {
        const item = await CollectionItem.findByPk(id);
        if (!item) return null;
        return await item.update(data);
    }

    async delete(id) {
        const item = await CollectionItem.findByPk(id);
        if (!item) return null;
        await item.destroy();
        return item;
    }
}
