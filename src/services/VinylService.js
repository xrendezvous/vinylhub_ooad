export class VinylService {
    constructor(repo) {
        this.repo = repo;
    }

    async getVinylById(id) {
        return this.repo.findById(id);
    }

    async searchVinyl(query) {
        return this.repo.search(query);
    }
}
