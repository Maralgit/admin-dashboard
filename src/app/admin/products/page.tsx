// src/app/admin/users/page.tsx
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import Product from "@/models/Product";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminUsersPage() {
  const session = await getServerSession(authConfig);

  // Double check role server-side (in addition to middleware)
  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  await connectDB();
  // Fetch all users (excluding passwords)
  const products = await Product.find({}).lean();

  return (
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="w-full max-w-5xl space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold">Бараа засварлах</h1>
          <Link href="/admin/dashboard">
            <Button variant="outline">Буцах</Button>
          </Link>
        </div>

        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Зураг
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Нэр
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Тайлбар
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Үнэ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Үлдэгдэл
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Засварлах
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product: any) => (
                <tr key={product._id}>
                  <td className="px-6 py-6">
                    <div className="w-20 h-20">
                      <img src={product.image} alt={product.title} />
                    </div>
                  </td>
                  <td>
                    <div className="text-sm font-medium text-gray-900">{product.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{product.description}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className="px-2 text-s font-semibold rounded-full bg-purple-100 text-purple-800"
                    >
                      {product.price}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 text-s font-semibold rounded-full ${
                      product.stock <= 5
                      ? "bg-red-100 text-red-800"
                      : "bg-purple-100 text-purple-800"
                    }`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td>
                    <p className="text-sm text-center">
                      <Link href="/products" className="text-blue-600 hover:underline">
                        Засварлах
                      </Link>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
