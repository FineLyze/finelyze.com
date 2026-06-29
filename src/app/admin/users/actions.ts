"use server";

import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";

type ActionResult = { success: boolean; error?: string };

export async function banUserAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const userId = formData.get("userId") as string;
    const client = await clerkClient();
    await client.users.banUser(userId);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function unbanUserAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const userId = formData.get("userId") as string;
    const client = await clerkClient();
    await client.users.unbanUser(userId);
    revalidatePath("/admin/users");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function deleteUserAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    const userId = formData.get("userId") as string;
    const client = await clerkClient();
    await client.users.deleteUser(userId);
    revalidatePath("/admin/users");
    revalidatePath("/admin/subscriptions");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed" };
  }
}
