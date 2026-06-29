import { PrismaClient } from "@prisma/client";
import { DEFAULT_CMS } from "../src/lib/cms";

const db = new PrismaClient();

async function main() {
  const sections = Object.entries(DEFAULT_CMS) as [string, unknown][];

  for (const [section, data] of sections) {
    await db.siteContent.upsert({
      where: { section },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      create: { section, data: data as any },
      update: {},
    });
    console.log(`  seeded: ${section}`);
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => db.$disconnect());
