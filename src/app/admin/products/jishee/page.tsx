import { getProduct } from "@/app/actions/product-action";
import JisheeTable from "./components/table"; // client component

export default async function Page() {
  const products = await getProduct(); // ⬅ 1-р алхмыг энд хийж байна
  return <JisheeTable products={products} />;
}