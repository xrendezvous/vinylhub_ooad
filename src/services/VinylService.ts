import { IVinylRepository } from "../repos/IVinylRepository";
import { Vinyl } from "../models/Vinyl";

export class VinylService {
    constructor(private repo: IVinylRepository) {}

    async getVinylById(id: string): Promise<Vinyl | null> {
        return this.repo.findById(id);
    }

    async searchVinyl(query: string): Promise<Vinyl[]> {
        return this.repo.search(query);
    }
}
