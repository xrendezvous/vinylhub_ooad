import { Router } from "express";
import { OrderController } from "./controllers/OrderController";
import { PaymentService } from "./services/PaymentService";
import { LiqPayFacade } from "./adapters/LiqPayFacade";
import { EmailProvider } from "./adapters/EmailProvider";
import { PaymentRepository } from "./repos/impl/PaymentRepository";

const router = Router();

const paymentService = new PaymentService(
    new PaymentRepository(),
    new LiqPayFacade(),
    new EmailProvider()
);
const orderController = new OrderController(paymentService);

router.post("/order/pay", (req, res) => orderController.pay(req, res));
router.post("/order/refund/:paymentId", (req, res) =>
    orderController.refund(req, res)
);

export { router as routes };

