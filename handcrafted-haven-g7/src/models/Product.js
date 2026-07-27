import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Product title is required"], 
      trim: true  
    },
    description: {
      type: String,
      required: [true, "Product description is required"], 
      trim: true  
    },
    price: {
      type: Number,
      required: [true, "Product price is required"], 
      min: [0, "Price can not be negative"]
    },
    category: {
      type: String,
      required: [true, "Product category is required"], 
      trim: true  
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Seller ID is required"],
    },
  },
  {
    timestamps: true
  }
)

export default mongoose.models.Product || mongoose.model("Product", ProductSchema);
