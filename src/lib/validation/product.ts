// src/lib/validations/product.ts
import { z } from "zod";

export const productSchema = z.object({
  image: z.string().url({ message: "Зөв URL орууна уу" }),
  title: z.string().min(2, { message: "Доод тал нь 2 нэмдэгт байна" }),
  desc: z.string().min(8, { message: "Урт тайлбар оруулна уу" }),
  price: z.string().min(4, {message: "Үнийн дүнгээ зөв оруулна уу"}),
  stock: z.string().min(1, { message: "Барааны тоо оруулна уу" }),
});

export type ProductInput = z.infer<typeof productSchema>;