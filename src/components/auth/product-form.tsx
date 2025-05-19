// src/components/auth/product-form.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {getProductById, createProduct as createProductAction} from "@/app/actions/product-action";
import { toast } from "sonner";

import { productSchema } from "@/lib/validation/product";

type FormData = z.infer<typeof productSchema>;

export function ProductForm({ productId }: { productId?: number }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      image: "",
      title: "",
      desc: "",
      price: "",
      stock: "",
    },
  });
  
  useEffect(() => {
    async function fetchProduct() {
      if (productId) {
        try {
          const product = await getProductById(productId);
          reset({
            image: product.image,
            title: product.title,
            desc: product.description,
            price: String(product.price),
            stock: String(product.stock),
          });
        } catch (error) {
          toast("Бараа ачаалахад алдаа гарлаа");
        }
      }
    }

    fetchProduct();
  }, [productId, reset]);

  async function onSubmit(data: FormData) {
    try {
      setIsLoading(true);

      const result = await createProductAction(data);

      if (result.error) {
        toast("Error");

        return;
      }
      toast("Бараа амжилттай нэмэгдлээ");
      router.push("/products");
      router.refresh();
    } catch (error) {
      toast("Error");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Бараа засварлах</CardTitle>
        <CardDescription>Бараа засварлах</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="image">Барааны зургийн URL</Label>
            <Input id="image" placeholder="//https://image.png" {...register("image")} />
            {errors.image && (
              <p className="text-sm text-red-500">{errors.image.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="title">Барааны нэр</Label>
            <Input
              id="title"
              type="text"
              placeholder="The kids jersey"
              {...register("title")}
            />
            {errors.title && (
              <p className="text-sm text-red-500">{errors.title.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="desc">Барааны тайлбар</Label>
            <Input
              id="desc"
              type="text"
              placeholder="Өнгөний сонголт болон размерийн сонголт"
              {...register("desc")}
            />
            {errors.desc && (
              <p className="text-sm text-red-500">{errors.desc.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price">Барааны үнэ</Label>
            <Input
              id="price"
              type="number"
              placeholder="150000"
              {...register("price")}
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="stock">Барааны үлдэгдэл</Label>
            <Input
              id="stock"
              type="number"
              placeholder="40"
              {...register("stock")}
            />
            {errors.stock && (
              <p className="text-sm text-red-500">{errors.stock.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Хадгалж байна..." : "Хадгалах"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
