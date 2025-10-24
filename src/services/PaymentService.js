import { Payment } from "../models/Payment.js";
import { PaymentStatus } from "../models/enums/PaymentStatus.js";

export class PaymentService {
    constructor(repo, provider, notif, userRepo, listingRepo) {
        this.repo = repo;
        this.provider = provider;
        this.notif = notif;
        this.userRepo = userRepo;
        this.listingRepo = listingRepo;
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

        const buyer = await this.userRepo.findById(buyerId);
        const listing = await this.listingRepo.findById(listingId);

        if (buyer && listing) {
            await this.notif.sendPaymentSuccess(
                buyer.email,
                "Listing #${listing.id}",
                payment.amount,
                payment.currency
            );
        }

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

            const payment = await this.repo.findById(paymentId);
            const buyer = payment ? await this.userRepo.findById(payment.buyerId) : null;

            if (buyer) {
                await this.notif.sendRefundNotice(
                    buyer.email,
                    paymentId,
                    payment.amount,
                    payment.currency
                );
            }
        }
        return ok;
    }
}
