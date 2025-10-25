export class PaymentProvider {
    async initiatePayment(payment) {
        if (process.env.NODE_ENV === "test") {
            return `https://mockpay.local/checkout/${payment.id}`;
        }
        console.log(`Simulating payment for payment ID ${payment.id}...`);
        await new Promise(resolve => setTimeout(resolve, 500));
        console.log(`Payment ${payment.id} successfully initiated.`);
        return `https://mockpay.local/success/${payment.id}`
    }

    async checkStatus(paymentId) {
        if (process.env.NODE_ENV === "test") {
            return "SUCCESS";
        }
        console.log(`Checking payment status for ID ${paymentId}...`);
        return "COMPLETED";
    }

    async refund(paymentId) {
        if (process.env.NODE_ENV === "test") {
            return true;
        }
        console.log(`Simulating refund for payment ID ${paymentId}...`);
        await new Promise(resolve => setTimeout(resolve, 300));
        console.log(`Refund for payment ${paymentId} successful.`);
        return true;
    }
}
