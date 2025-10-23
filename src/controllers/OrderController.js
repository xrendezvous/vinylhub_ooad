import { PaymentService } from "../services/PaymentService.js";

export class OrderController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }

    async pay(req, res) {
        try {
            const { buyerId, listingId } = req.body;
            const payment = await this.paymentService.pay(buyerId, listingId);
            res.json(payment);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    async refund(req, res) {
        try {
            const { paymentId } = req.params;
            const result = await this.paymentService.refund(paymentId);
            res.json({ refunded: result });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }
}
