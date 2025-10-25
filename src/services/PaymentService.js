import { Payment } from "../models/Payment.js";
import { PaymentStatus } from "../models/enums/PaymentStatus.js";
import { ListingStatus } from "../models/enums/ListingStatus.js";

export class PaymentService {
    constructor(repo, provider, notif, userRepo, listingRepo) {
        this.repo = repo;
        this.provider = provider;
        this.notif = notif;
        this.userRepo = userRepo;
        this.listingRepo = listingRepo;
    }

    async pay(buyerId, listingId) {
        const listing = await this.listingRepo.findById(listingId);
        if (!listing) throw new Error("Listing not found");

        const payment = await this.repo.save({
            buyerId,
            listingId,
            amount: listing.price || 1200,
            currency: "UAH",
            status: PaymentStatus.PENDING,
            createdAt: new Date()
        });

        await this.provider.initiatePayment(payment);

        listing.status = ListingStatus.SOLD;
        await listing.save();

        const buyer = await this.userRepo.findById(buyerId);
        if (buyer) {
            await this.notif.sendPaymentSuccess(
                buyer.email,
                `Listing #${listing.id}`,
                payment.amount,
                payment.currency
            );
        }

        return payment;
    }

    async checkStatus(paymentId) {
        const status = await this.provider.checkStatus(paymentId);
        if (!Object.values(PaymentStatus).includes(status)) {
            throw new Error("Invalid payment status");
        }

        await this.repo.updateStatus(paymentId, status);
        return status;
    }

    async refund(paymentId) {
        const ok = await this.provider.refund(paymentId);
        if (ok) {
            await this.repo.updateStatus(paymentId, PaymentStatus.REFUNDED);

            const payment = await this.repo.findById(paymentId);
            if (!payment) throw new Error("Payment not found");

            const listing = await this.listingRepo.findById(payment.listingId);
            if (listing) {
                // повертаємо оголошення в активний стан
                listing.status = ListingStatus.ACTIVE;
                await listing.save();
            }

            const buyer = await this.userRepo.findById(payment.buyerId);
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
