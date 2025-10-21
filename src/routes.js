import { Router } from "express";
import { OrderController } from "./controllers/OrderController.js";
import { PaymentService } from "./services/PaymentService.js";
import { LiqPayFacade } from "./adapters/LiqPayFacade.js";
import { EmailProvider } from "./adapters/EmailProvider.js";
import { PaymentRepository } from "./repos/impl/PaymentRepository.js";

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
