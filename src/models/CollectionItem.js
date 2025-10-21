export class CollectionItem {
    constructor(id, userId, vinylId, condition, notes, photos = [], addedAt = new Date()) {
        this.id = id;
        this.userId = userId;
        this.vinylId = vinylId;
        this.condition = condition;
        this.notes = notes;
        this.photos = photos;
        this.addedAt = addedAt;
    }
}
