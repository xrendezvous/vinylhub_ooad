import { IPaymentProvider } from "./inter/IPaymentProvider";
import { Payment } from "../models/Payment";
import { PaymentStatus } from "../models/enums/PaymentStatus";

export class LiqPayFacade implements IPaymentProvider {
    // @ts-ignore
    async initiatePayment(payment: Payment): Promise<string> {
        console.log("Simulated LiqPay payment init:", payment.id);
        return "https://liqpay.ua/simulated-checkout";
    }

    // @ts-ignore
    async checkStatus(paymentId: string): Promise<PaymentStatus> {
        console.log("Checking status for", paymentId);
        return PaymentStatus.COMPLETED;
    }

    // @ts-ignore
    async refund(paymentId: string): Promise<boolean> {
        console.log("Refund requested:", paymentId);
        return true;
    }
}

