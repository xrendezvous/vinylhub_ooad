import { Router } from "express";
import { AuthController } from "./controllers/AuthController.js";
import { ListingController } from "./controllers/ListingController.js";
import { ProfileController } from "./controllers/ProfileController.js";
import { VinylController } from "./controllers/VinylController.js";
import { WishlistController } from "./controllers/WishlistController.js";
import { OrderController } from "./controllers/OrderController.js";
import { CollectionController } from "./controllers/CollectionController.js";

const router = Router();

const auth = new AuthController();
const vinyl = new VinylController();
const listing = new ListingController();
const wishlist = new WishlistController();
const collection = new CollectionController();
const order = new OrderController();
const profile = new ProfileController();

// Auth
router.post("/auth/register", (req, res) => auth.register(req, res));
router.post("/auth/login", (req, res) => auth.login(req, res));

// Listings
router.post("/listings", (req, res) => listing.createListing(req, res));
router.get("/listings", (req, res) => listing.getAll(req, res));
router.get("/listings/:id", (req, res) => listing.getById(req, res));
router.put("/listings/:id", (req, res) => listing.update(req, res));
router.delete("/listings/:id", (req, res) => listing.delete(req, res));

// Profiles
router.get("/profile/:userId", (req, res) => profile.getProfile(req, res));
router.get("/profile/:userId/listings", (req, res) => profile.getUserListings(req, res));

// Vinyls
router.get("/vinyls", (req, res) => vinyl.getAll(req, res));
router.get("/vinyls/:id", (req, res) => vinyl.getById(req, res));
router.post("/vinyls", (req, res) => vinyl.create(req, res));
router.put("/vinyls/:id", (req, res) => vinyl.update(req, res));
router.delete("/vinyls/:id", (req, res) => vinyl.delete(req, res));

// Wishlist
router.post("/wishlist", (req, res) => wishlist.addWishlist(req, res));
router.get("/wishlist/:userId", (req, res) => wishlist.getUserWishlist(req, res));

// Collection
router.post("/collection", (req, res) => collection.addItem(req, res));
router.get("/collection/:userId", (req, res) => collection.getUserCollection(req, res));
router.put("/collection/:id", (req, res) => collection.updateItem(req, res));
router.delete("/collection/:id", (req, res) => collection.deleteItem(req, res));

// Orders (Payments)
router.post("/order/pay", (req, res) => order.pay(req, res));
router.post("/order/refund/:paymentId", (req, res) => order.refund(req, res));

export default router;

