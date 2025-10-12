import { PaymentStatus } from "../../models/enums/PaymentStatus";
import { Payment } from "../../models/Payment";

export interface IPaymentProvider {
    initiatePayment(payment: Payment): Promise<string>;
    checkStatus(paymentId: string): Promise<PaymentStatus>;
    refund(paymentId: string): Promise<boolean>;
}
