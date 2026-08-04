import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["buyer", "seller"], required: true },

    // Seller-only profile fields. Left unset for buyer accounts.
    shopName: { type: String, trim: true, default: "" },
    bio: { type: String, trim: true, default: "" },
    avatarUrl: { type: String, default: null },
    location: { type: String, trim: true, default: "" },
    // Manually flipped by an admin directly in the database; purely a
    // display badge, not an access gate.
    sellerVerified: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
