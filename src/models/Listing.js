import { ListingStatus } from "./enums/ListingStatus.js";

export class Listing {
    constructor(id, sellerId, vinylId, price, currency = "USD", status = ListingStatus.ACTIVE, createdAt = new Date()) {
        this.id = id;
        this.sellerId = sellerId;
        this.vinylId = vinylId;
        this.price = price;
        this.currency = currency;
        this.status = status;
        this.createdAt = createdAt;
    }
}
