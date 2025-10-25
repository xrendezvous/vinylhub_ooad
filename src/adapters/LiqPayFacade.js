import { PaymentProvider } from "./PaymentProvider.js";
import { PaymentStatus } from "../models/enums/PaymentStatus.js";
import { Payment } from "../models/Payment.js";

export class LiqPayFacade extends PaymentProvider {
    async initiatePayment(payment) {
        const paymentUrl = `https://www.liqpay.ua/api/checkout?amount=${payment.amount}&order_id=${payment.id}`;
        return paymentUrl;
    }

    async checkStatus(paymentId) {
        const status = Math.random() > 0.5 ? "success" : "pending";
        return status === "success" ? PaymentStatus.SUCCESS : PaymentStatus.PENDING;
    }

    async refund(paymentId) {

        return true;
    }
}


