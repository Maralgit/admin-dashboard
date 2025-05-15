import mongoose, { Schema, Model } from "mongoose";
import '@/models/Category';

export interface IProduct {
  _id: number;
  title: string;
  description: string;
  price: number;
  image?: string;
  stock: number;
  category: mongoose.Types.ObjectId;
  brand: mongoose.Types.ObjectId;
}

const ProductSchema = new Schema<IProduct>(
  {
    _id: { type: Number, required: true },
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: false },
    stock: { type: Number, required: true, default: 0 },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    brand: { type: mongoose.Schema.Types.ObjectId, ref: "Brand", required: true },
  },
  {
    timestamps: true,
    collection: 'products', // Explicit collection name
  }
);

// Model бүртгэл
const Product: Model<IProduct> =
  mongoose.models.Product || mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
