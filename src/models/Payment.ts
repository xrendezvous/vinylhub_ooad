import { PaymentStatus } from "./enums/PaymentStatus";

export interface Payment {
    id: string;
    buyerId: string;
    listingId: string;
    amount: number;
    currency: string;
    status: PaymentStatus;
    createdAt: Date;
}

