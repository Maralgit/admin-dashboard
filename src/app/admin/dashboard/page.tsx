// src/app/admin/dashboard/page.tsx
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authConfig);

  // Double check role server-side (in addition to middleware)
  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
        <h1 className="text-3xl font-bold text-center">Системийн удирдлага</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Хэрэглэгчийн менежемэнт</CardTitle>
              <CardDescription>Системийн хэрэглэгчид</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/users">
                <Button className="w-full">Бүх хэрэглэгч</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Системийн тохиргоо</CardTitle>
              <CardDescription>Тохиргоо</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/settings">
                <Button className="w-full">Тохиргоо хийх</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Өгөгдлийн сангийн тохиргоо</CardTitle>
              <CardDescription>Шинэ хэрэглэгч үүсгэх</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/seed">
                <Button className="w-full">Тохиргоо хийх</Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Бараа</CardTitle>
              <CardDescription>Бараа засварлах</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/admin/products">
                <Button className="w-full">
                  Бүх бараа
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Хэрэглэгчийн хандалтруу буцах</CardTitle>
              <CardDescription>Буцах</CardDescription>
            </CardHeader>
            <CardContent>
              <Link href="/dashboard">
                <Button variant="outline" className="w-full">
                  /dashboard-руу буцах
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}
