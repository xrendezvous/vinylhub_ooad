import { User } from "./User.js";
import { Vinyl } from "./Vinyl.js";
import { Listing } from "./Listing.js";
import { Payment } from "./Payment.js";
import { CollectionItem } from "./CollectionItem.js";
import { WishlistItem } from "./WishlistItem.js";

export function initModels() {
    User.hasMany(CollectionItem, { foreignKey: "userId" });
    CollectionItem.belongsTo(User, { foreignKey: "userId" });

    User.hasMany(WishlistItem, { foreignKey: "userId" });
    WishlistItem.belongsTo(User, { foreignKey: "userId" });

    User.hasMany(Listing, { foreignKey: "sellerId" });
    Listing.belongsTo(User, { foreignKey: "sellerId" });

    User.hasMany(Payment, { foreignKey: "buyerId" });
    Payment.belongsTo(User, { foreignKey: "buyerId" });

    Vinyl.hasMany(CollectionItem, { foreignKey: "vinylId" });
    CollectionItem.belongsTo(Vinyl, { foreignKey: "vinylId" });

    Vinyl.hasMany(Listing, { foreignKey: "vinylId" });
    Listing.belongsTo(Vinyl, { foreignKey: "vinylId" });

    Vinyl.hasMany(WishlistItem, { foreignKey: "vinylId" });
    WishlistItem.belongsTo(Vinyl, { foreignKey: "vinylId" });

    Listing.hasOne(Payment, { foreignKey: "listingId" });
    Payment.belongsTo(Listing, { foreignKey: "listingId" });
}

export {
    User,
    Vinyl,
    Listing,
    Payment,
    CollectionItem,
    WishlistItem,
};
