export class Vinyl {
    constructor(id, title, artist, year, label, genres = []) {
        this.id = id;
        this.title = title;
        this.artist = artist;
        this.year = year;
        this.label = label;
        this.genres = genres;
    }
}
