//user-actions.tsx
"use server"

import { z } from "zod";
import { connectDB } from "@/lib/mongodb";
import { getServerSession } from "next-auth"
import { authConfig } from "@/lib/auth"
import { redirect } from "next/navigation";
import { Types } from "mongoose"
import { revalidatePath, unstable_cache } from "next/cache";
import { UserRole } from "@/models/User";
import UserModel from "@/models/User";


export type User = {
    name: string;
    email: string;
    phone: string;
    password: string;
    image?: string;
    role: UserRole;
    createdAt: Date;
    updatedAt: Date;
}

export async function deleteUser(userId: string){
    try {
        await connectDB();

        const session = await getServerSession(authConfig);
        if (!session || session.user.role !== "admin") {
            redirect("/unauthorized");
        }

        const deletedUser = await UserModel.findByIdAndDelete(userId);
        if (!deletedUser) {
            return { error: "User not found" };
        }

        revalidatePath("/admin/users");

        return { success: "User deleted successfully" };
    } catch (error){
        console.error("Error deleting user:", error);
        return { error: "Failed to delete user" };
    }
}