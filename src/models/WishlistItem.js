export class WishlistItem {
    constructor(id, userId, vinylId = "", queryText = "", createdAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.vinylId = vinylId;
        this.queryText = queryText;
        this.createdAt = createdAt;
    }
}
