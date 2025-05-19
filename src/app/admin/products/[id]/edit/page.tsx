// src/app/admin/products/edit/page.tsx
"use client"
import { useParams } from "next/navigation"
import { ProductForm } from "@/components/auth/product-form";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function EditProductPage() {
  const params = useParams()
  const productId = params.id

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <ProductForm />
      </div>
    </main>
  )
}




