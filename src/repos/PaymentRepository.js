export class PaymentRepository {
    constructor() {
        this.payments = [];
    }

    async save(payment) {
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
