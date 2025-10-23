import { Vinyl } from "../models/Vinyl.js";

export class VinylRepository {
    constructor() {
        this.vinyls = [];
    }

    async findById(id) {
        return this.vinyls.find(v => v.id === id) || null;
    }

    async save(vinylData) {
        const vinyl = vinylData instanceof Vinyl ? vinylData : new Vinyl(
            vinylData.id,
            vinylData.title,
            vinylData.artist,
            vinylData.year,
            vinylData.label,
            vinylData.genres
        );

        this.vinyls.push(vinyl);
        return vinyl;
    }

    async search(query) {
        const q = query.toLowerCase();
        return this.vinyls.filter(v =>
            v.title.toLowerCase().includes(q) ||
            v.artist.toLowerCase().includes(q)
        );
    }
}
