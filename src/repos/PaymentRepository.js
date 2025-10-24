import { Payment } from "../models/Payment.js";

export class PaymentRepository {
    async save(paymentData) {
        return await Payment.create(paymentData);
    }

    async findById(id) {
        return await Payment.findByPk(id);
    }

    async findByListing(listingId) {
        return await Payment.findAll({ where: { listingId } });
    }

    async updateStatus(id, status) {
        const payment = await Payment.findByPk(id);
        if (!payment) return null;
        return await payment.update({ status });
    }
}
