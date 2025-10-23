export class PaymentProvider {
    async initiatePayment(payment) {
        throw new Error("initiatePayment() must be implemented by subclass");
    }

    async checkStatus(paymentId) {
        throw new Error("checkStatus() must be implemented by subclass");
    }

    async refund(paymentId) {
        throw new Error("refund() must be implemented by subclass");
    }
}
