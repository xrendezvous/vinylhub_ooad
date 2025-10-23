import { VinylRepository } from "../repos/VinylRepository.js";

const vinylRepo = new VinylRepository();

export class VinylService {
    async getAll() {
        return await vinylRepo.findAll();
    }

    async getById(id) {
        return await vinylRepo.findById(id);
    }

    async create(data) {
        return await vinylRepo.create(data);
    }

    async update(id, data) {
        return await vinylRepo.update(id, data);
    }

    async delete(id) {
        return await vinylRepo.delete(id);
    }
}

