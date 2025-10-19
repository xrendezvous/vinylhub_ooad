import { Vinyl } from "../models/Vinyl";

export interface IVinylRepository {
    findById(id: string): Promise<Vinyl | null>;
    save(vinyl: Vinyl): Promise<Vinyl>;
    search(query: string): Promise<Vinyl[]>;
}
