import { PaymentStatus } from "./enums/PaymentStatus.js";

export class Payment {
    constructor(id, buyerId, listingId, amount, currency, status = PaymentStatus.PENDING, createdAt = new Date()) {
        this.id = id;
        this.buyerId = buyerId;
        this.listingId = listingId;
        this.amount = amount;
        this.currency = currency;
        this.status = status;
        this.createdAt = createdAt;
    }
}
