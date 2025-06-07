"use client"

import React, { use } from "react";
import { notFound } from "next/navigation";
import { getProductById } from "@/lib/actions/product-action";
import ProductPageClient from "./ProductPageClient";

// export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
//   const { id } = use(params)
//   const product = await getProductById(Number(id));
//   if (!product) return;

//   return {
//     title: `${product.title ?? product._id}`,
//     description: product.description || "",
//     openGraph: {
//       title: "OG: гарчиг",
//       images: "",
//       description: "",
//     },
//   };
// }
async function productDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const product = await getProductById(Number(id));
  // const [product] = await Promise.all([
  //   getProductById(params.id)
  // ]);

  const data = JSON.parse(JSON.stringify(product));
  // const updatedProduct = { ...product, _id: product._id.toString() }

  return <ProductPageClient product={data} />;
}

export default productDetailPage;
