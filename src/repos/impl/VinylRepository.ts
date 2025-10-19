import { IVinylRepository } from "../IVinylRepository";
import { Vinyl } from "../../models/Vinyl";

export class VinylRepository implements IVinylRepository {
    private vinyls: Vinyl[] = [];

    async findById(id: string): Promise<Vinyl | null> {
        return this.vinyls.find(v => v.id === id) || null;
    }

    async save(vinyl: Vinyl): Promise<Vinyl> {
        this.vinyls.push(vinyl);
        return vinyl;
    }

    async search(query: string): Promise<Vinyl[]> {
        return this.vinyls.filter(v =>
            v.title.toLowerCase().includes(query.toLowerCase()) ||
            v.artist.toLowerCase().includes(query.toLowerCase())
        );
    }
}
