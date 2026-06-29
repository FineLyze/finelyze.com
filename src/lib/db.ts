import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

function createClient() {
  const url = process.env.DATABASE_URL;
  if (!url) return null;
  try {
    const adapter = new PrismaPg({ connectionString: url });
    return new PrismaClient({ adapter });
  } catch {
    return null;
  }
}

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient | null };

export const db = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
