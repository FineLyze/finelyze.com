"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { db } from "@/lib/db";
import { Tier } from "@prisma/client";

type ActionResult = { success: boolean; error?: string };

export async function updateTierAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!db) return { success: false, error: "Database not configured" };
    const userId = formData.get("userId") as string;
    const tier = formData.get("tier") as Tier;

    await db.subscription.upsert({
      where: { clerkUserId: userId },
      create: { clerkUserId: userId, tier },
      update: { tier },
    });
    revalidatePath("/admin/subscriptions");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function toggleTrialAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!db) return { success: false, error: "Database not configured" };
    const userId = formData.get("userId") as string;
    const active = formData.get("active") === "true";

    await db.subscription.upsert({
      where: { clerkUserId: userId },
      create: {
        clerkUserId: userId,
        trialActive: active,
        trialStart: active ? new Date() : null,
        trialEnd: active ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) : null,
      },
      update: {
        trialActive: active,
        trialStart: active ? new Date() : null,
        trialEnd: active ? new Date(Date.now() + 14 * 24 * 60 * 60 * 1000) : null,
      },
    });
    revalidatePath("/admin/subscriptions");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed" };
  }
}

export async function updateNotesAction(formData: FormData): Promise<ActionResult> {
  try {
    await requireAdmin();
    if (!db) return { success: false, error: "Database not configured" };
    const userId = formData.get("userId") as string;
    const notes = formData.get("notes") as string;

    await db.subscription.upsert({
      where: { clerkUserId: userId },
      create: { clerkUserId: userId, notes },
      update: { notes },
    });
    revalidatePath("/admin/subscriptions");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Failed" };
  }
}
