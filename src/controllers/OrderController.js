import { PaymentService } from "../services/PaymentService.js";
import { PaymentRepository } from "../repos/PaymentRepository.js";
import { PaymentProvider } from "../adapters/PaymentProvider.js";
import { EmailProvider } from "../adapters/EmailProvider.js";

const paymentService = new PaymentService(
    new PaymentRepository(),
    new PaymentProvider(),
    new EmailProvider()
);

export class OrderController {
    async pay(req, res) {
        try {
            const { buyerId, listingId } = req.body;
            const payment = await paymentService.pay(buyerId, listingId);
            res.json(payment);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async refund(req, res) {
        try {
            const { paymentId } = req.params;
            const result = await paymentService.refund(paymentId);
            res.json({ refunded: result });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
