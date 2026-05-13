import { prisma } from "@/lib/prisma";
import { buildSeedItems } from "@/lib/seed-data";

async function main() {
  const existingCount = await prisma.drillItem.count();
  if (existingCount > 0) {
    console.log(`Seed skipped: ${existingCount} drill items already exist.`);
    return;
  }

  const items = buildSeedItems();

  await prisma.drillItem.createMany({
    data: items.map((item) => ({
      ...item,
      answerOptions: JSON.stringify(item.answerOptions),
      tags: JSON.stringify(item.tags),
    })),
  });

  console.log(`Seeded ${items.length} drill items.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
