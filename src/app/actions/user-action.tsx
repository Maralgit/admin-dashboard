// //user-actions.tsx
// "use server"

// import { z } from "zod";
// import { connectDB } from "@/lib/mongodb";
// import { getServerSession } from "next-auth"
// import { authConfig } from "@/lib/auth"
// import { redirect } from "next/navigation";
// import { Types } from "mongoose"
// import { revalidatePath, unstable_cache } from "next/cache";
// import { UserRole } from "@/models/User";
// import UserModel from "@/models/User";


// export type User = {
//     name: string;
//     email: string;
//     phone: string;
//     password: string;
//     image?: string;
//     role: UserRole;
//     createdAt: Date;
//     updatedAt: Date;
// }

// export async function deleteUser(userId: string){
//     try {
//         await connectDB();

//         const session = await getServerSession(authConfig);
//         if (!session || session.user.role !== "admin") {
//             redirect("/unauthorized");
//         }

//         const deletedUser = await UserModel.findByIdAndDelete(userId);
//         if (!deletedUser) {
//             return { error: "User not found" };
//         }

//         revalidatePath("/admin/users");

//         return { success: "User deleted successfully" };
//     } catch (error){
//         console.error("Error deleting user:", error);
//         return { error: "Failed to delete user" };
//     }
// }

// src/actions/user-actions.ts
"use server";

import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { redirect } from "next/navigation";

export async function deleteUserById(userId: string) {
  const session = await getServerSession(authConfig);

  if (!session || session.user.role !== "admin") {
    redirect("/unauthorized");
  }

  try {
    await connectDB();
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      throw new Error("User not found");
    }

    // optionally revalidate cache here if needed
    return { success: true };
  } catch (error) {
    return { error: "Failed to delete user" };
  }
}
