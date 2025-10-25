export class PaymentProvider {
    async initiatePayment(payment) {
        if (process.env.NODE_ENV === "test") {
            return `https://mockpay.local/checkout/${payment.id}`;
        }
        throw new Error("initiatePayment() must be implemented by subclass");
    }

    async checkStatus(paymentId) {
        if (process.env.NODE_ENV === "test") {
            return "SUCCESS";
        }
        throw new Error("checkStatus() must be implemented by subclass");
    }

    async refund(paymentId) {
        if (process.env.NODE_ENV === "test") {
            return true;
        }
        throw new Error("refund() must be implemented by subclass");
    }
}
