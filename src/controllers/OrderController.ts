import { Request, Response } from "express";
import { PaymentService } from "../services/PaymentService";

export class OrderController {
    constructor(private paymentService: PaymentService) {}

    async pay(req: Request, res: Response) {
        const { buyerId, listingId } = req.body;
        const payment = await this.paymentService.pay(buyerId, listingId);
        res.json(payment);
    }

    async refund(req: Request, res: Response) {
        const { paymentId } = req.params;
        const result = await this.paymentService.refund(paymentId);
        res.json({ refunded: result });
    }
}

