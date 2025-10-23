import { Router } from "express";
import { AuthController } from "./controllers/AuthController.js";
import { ListingController } from "./controllers/ListingController.js";
import { ProfileController } from "./controllers/ProfileController.js";
import { VinylController } from "./controllers/VinylController.js";
import { WishlistController } from "./controllers/WishlistController.js";
import { OrderController } from "./controllers/OrderController.js";

import { PaymentService } from "./services/PaymentService.js";
import { LiqPayFacade } from "./adapters/LiqPayFacade.js";
import { EmailProvider } from "./adapters/EmailProvider.js";
import { PaymentRepository } from "./repos/impl/PaymentRepository.js";

const router = Router();

const authController = new AuthController();
const listingController = new ListingController();
const profileController = new ProfileController();
const vinylController = new VinylController();
const wishlistController = new WishlistController();
const orderController = new OrderController(
    new PaymentService(new PaymentRepository(), new LiqPayFacade(), new EmailProvider())
);

// Auth
router.post("/auth/register", (req, res) => authController.register(req, res));
router.post("/auth/login", (req, res) => authController.login(req, res));

// Listings
router.post("/listings", (req, res) => listingController.createListing(req, res));

// Profiles
router.get("/profiles/:userId", (req, res) => profileController.getProfile(req, res));
router.get("/profiles/:userId/listings", (req, res) => profileController.getUserListings(req, res));

// Vinyls
router.get("/vinyls/:id", (req, res) => vinylController.getVinylById(req, res));
router.get("/vinyls", (req, res) => vinylController.search(req, res));

// Wishlist
router.post("/wishlist", (req, res) => wishlistController.addWishlist(req, res));

// Orders (Payments)
router.post("/order/pay", (req, res) => orderController.pay(req, res));
router.post("/order/refund/:paymentId", (req, res) => orderController.refund(req, res));

export { router as routes };

