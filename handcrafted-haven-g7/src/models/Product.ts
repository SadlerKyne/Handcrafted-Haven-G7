import mongoose, { Schema, type Document, type Model } from "mongoose";

export interface IProduct extends Document {
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stockQuantity: number;
  sellerId: mongoose.Types.ObjectId;
  imageUrl: string | null;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    title: {
      type: String,
      required: [true, "Product title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Product description is required"],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, "Product price is required"],
      min: [0, "Price can not be negative"],
    },
    category: {
      type: String,
      required: [true, "Product category is required"],
      trim: true,
    },
    images: {
      type: [String],
      required: [true, "Product images are required"],
    },
    stockQuantity: {
      type: Number,
      required: [true, "Stock quantity is required"],
      default: 1,
      min: [0, "Stock cannot be negative"],
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller ID is required"],
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Existing UI code reads `product.imageUrl` as a single cover image;
// derive it from `images` instead of storing a duplicate field.
ProductSchema.virtual("imageUrl").get(function (this: IProduct) {
  return this.images?.[0] ?? null;
});

export default (mongoose.models.Product as Model<IProduct>) ||
  mongoose.model<IProduct>("Product", ProductSchema);
