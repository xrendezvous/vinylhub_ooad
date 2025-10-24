import { Payment } from "../models/Payment.js";
import { PaymentStatus } from "../models/enums/PaymentStatus.js";

export class PaymentService {
    constructor(repo, provider, notif) {
        this.repo = repo;
        this.provider = provider;
        this.notif = notif;
    }

    async pay(buyerId, listingId) {
        const payment = await this.repo.save({
            buyerId,
            listingId,
            amount: 250,
            currency: "USD",
            status: PaymentStatus.PENDING,
            createdAt: new Date()
        });

        await this.provider.initiatePayment(payment);
        await this.notif.notifyUser(buyerId, "Payment initiated!");
        return payment;
    }

    async checkStatus(paymentId) {
        const status = await this.provider.checkStatus(paymentId);
        await this.repo.updateStatus(paymentId, status);
        return status;
    }

    async refund(paymentId) {
        const ok = await this.provider.refund(paymentId);
        if (ok) {
            await this.repo.updateStatus(paymentId, PaymentStatus.REFUNDED);
            await this.notif.notifyUser("admin", `Refunded ${paymentId}`);
        }
        return ok;
    }
}
