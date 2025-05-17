//product-actions.tsx
"use server"

import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"
import { redirect } from "next/navigation";
import { Types } from "mongoose"
import ProductModel from "@/models/Product";
import { IProduct } from "@/models/Product";


export type Product = {
    _id: string | Types.ObjectId;
    title: string;
    description: string;
    price: number;
    image?: string;
    stock: number;
    category: string | Types.ObjectId;
    brand: string | Types.ObjectId;
};

export const getProduct = async () => {
    await connectDB();
    const productsData = await ProductModel.find({}).lean();
    const session = await getServerSession(authConfig);

    if (!session || session.user.role !== "admin") {
        redirect("/unauthorized");
    }

    const products: Product[] = productsData.map((product) => ({
        ...product,
        _id: product._id.toString(),
        category: product.category.toString(),
        brand: product.brand.toString(),
    }));
    return products;


}

export const deleteProduct = async (productId: string) => {
    await connectDB();
    const productsData = await ProductModel.deleteOne({ _id: productId });
    if (productsData.deletedCount === 0) {
        throw new Error("Product not found");
    }

    return {success: true, message: "Product deleted successfully"};



}