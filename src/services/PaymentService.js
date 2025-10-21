import { Payment } from "../models/Payment.js";
import { PaymentStatus } from "../models/enums/PaymentStatus.js";

export class PaymentService {
    constructor(repo, provider, notif) {
        this.repo = repo;
        this.provider = provider;
        this.notif = notif;
    }

    async pay(buyerId, listingId) {
        const payment = new Payment(
            buyerId,
            buyerId,
            listingId,
            250,
            "USD",
            PaymentStatus.PENDING,
            new Date()
        );

        await this.repo.save(payment);
        await this.provider.initiatePayment(payment);
        await this.notif.notifyUser(buyerId, "Payment initiated!");
        return payment;
    }

    async checkStatus(paymentId) {
        return await this.provider.checkStatus(paymentId);
    }

    async refund(paymentId) {
        const ok = await this.provider.refund(paymentId);
        if (ok) await this.notif.notifyUser("admin", `Refunded ${paymentId}`);
        return ok;
    }
}
