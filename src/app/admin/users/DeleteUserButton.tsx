"use client"

import { deleteUserById } from "@/app/actions/user-action";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function DeleteUserButton({ userId }: { userId: string }) {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const handleDelete = () => {
    const confirmed = confirm("Та энэ хэрэглэгчийг устгахдаа итгэлтэй байна уу?");
    if (!confirmed) return;

    startTransition(async () => {
      const res = await deleteUserById(userId);
      if (!res?.error) {
        router.refresh(); // хүснэгтийг дахин ачаална
      } else {
        alert("Устгах үед алдаа гарлаа");
      }
    });
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      disabled={isPending}
      onClick={handleDelete}
    >
      {isPending ? "Устгаж байна..." : "Устгах"}
    </Button>
  );
}
