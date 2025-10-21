import { PaymentStatus } from "../models/enums/PaymentStatus.js";

export class LiqPayFacade {
    async initiatePayment(payment) {
        console.log("💳 Simulated LiqPay payment init:", payment.id);
        return "https://liqpay.ua/simulated-checkout";
    }

    async checkStatus(paymentId) {
        console.log("🔍 Checking status for", paymentId);
        return PaymentStatus.COMPLETED;
    }

    async refund(paymentId) {
        console.log("↩️ Refund requested:", paymentId);
        return true;
    }
}
