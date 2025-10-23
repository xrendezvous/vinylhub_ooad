import { Vinyl } from "../models/Vinyl.js";

export class VinylRepository {
    async findAll() {
        return await Vinyl.findAll();
    }

    async findById(id) {
        return await Vinyl.findByPk(id);
    }

    async create(vinylData) {
        return await Vinyl.create(vinylData);
    }

    async update(id, vinylData) {
        const vinyl = await Vinyl.findByPk(id);
        if (!vinyl) return null;
        return await vinyl.update(vinylData);
    }

    async delete(id) {
        const vinyl = await Vinyl.findByPk(id);
        if (!vinyl) return null;
        await vinyl.destroy();
        return vinyl;
    }
}

