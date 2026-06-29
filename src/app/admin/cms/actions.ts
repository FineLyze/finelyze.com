"use server";

import { revalidatePath } from "next/cache";
import { requireAdmin } from "@/lib/admin-auth";
import { upsertSection } from "@/lib/cms";
import type {
  HeroContent,
  HeaderContent,
  FooterContent,
  PricingContent,
  SectionVisibility,
} from "@/types/cms";

type ActionResult = { success: boolean; error?: string };

export async function saveHeroContent(data: HeroContent): Promise<ActionResult> {
  try {
    await requireAdmin();
    await upsertSection("hero", data);
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function saveHeaderContent(data: HeaderContent): Promise<ActionResult> {
  try {
    await requireAdmin();
    await upsertSection("header", data);
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function saveFooterContent(data: FooterContent): Promise<ActionResult> {
  try {
    await requireAdmin();
    await upsertSection("footer", data);
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function savePricingContent(data: PricingContent): Promise<ActionResult> {
  try {
    await requireAdmin();
    await upsertSection("pricing", data);
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}

export async function saveVisibility(data: SectionVisibility): Promise<ActionResult> {
  try {
    await requireAdmin();
    await upsertSection("visibility", data);
    revalidatePath("/");
    return { success: true };
  } catch (e) {
    return { success: false, error: e instanceof Error ? e.message : "Save failed" };
  }
}
