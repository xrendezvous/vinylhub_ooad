import { IPaymentRepository } from "../repos/IPaymentRepository";
import { IPaymentProvider } from "../adapters/inter/IPaymentProvider";
import { INotificationService } from "../adapters/inter/INotificationService";
import { Payment } from "../models/Payment";
import { PaymentStatus } from "../models/enums/PaymentStatus";

export class PaymentService {
    constructor(
        private repo: IPaymentRepository,
        private provider: IPaymentProvider,
        private notif: INotificationService
    ) {}

    // @ts-ignore
    async pay(buyerId: string, listingId: string): Promise<Payment> {
        const payment: Payment = {
            id: buyerId,
            listingId,
            amount: 250,
            currency: "USD",
            status: PaymentStatus.PENDING,
            createdAt: new Date(),
        };

        await this.repo.save(payment);
        await this.provider.initiatePayment(payment);
        await this.notif.notifyUser(buyerId, "Payment initiated!");
        return payment;
    }

    // @ts-ignore
    async checkStatus(paymentId: string): Promise<PaymentStatus> {
        return await this.provider.checkStatus(paymentId);
    }

    // @ts-ignore
    async refund(paymentId: string): Promise<boolean> {
        const ok = await this.provider.refund(paymentId);
        if (ok) await this.notif.notifyUser("admin", `Refunded ${paymentId}`);
        return ok;
    }
}

