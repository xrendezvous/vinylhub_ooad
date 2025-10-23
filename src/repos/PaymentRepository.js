import { Payment } from "../models/Payment.js";

export class PaymentRepository {
    constructor() {
        this.payments = [];
    }

    async save(paymentData) {
        const payment = paymentData instanceof Payment ? paymentData : new Payment(
            paymentData.id,
            paymentData.buyerId,
            paymentData.listingId,
            paymentData.amount,
            paymentData.currency,
            paymentData.status,
            paymentData.createdAt
        );

        this.payments.push(payment);
        return payment;
    }

    async findById(id) {
        return this.payments.find(p => p.id === id) || null;
    }

    async findByListing(listingId) {
        return this.payments.filter(p => p.listingId === listingId);
    }
}
