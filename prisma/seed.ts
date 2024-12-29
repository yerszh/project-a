import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database with SQL files...");

  const sqlDirectoryPath = path.join("sql");

  const files = fs
    .readdirSync(sqlDirectoryPath)
    .filter((file) => file.endsWith(".sql"));

  for (const file of files) {
    const sqlFilePath = path.join(sqlDirectoryPath, file);
    console.log(`Processing file: ${file}`);

    const sqlQuery = fs.readFileSync(sqlFilePath, "utf-8");

    const queries = sqlQuery
      .split(/(?<=\;)\s*(?=INSERT)/)
      .map((query) => query.trim())
      .filter(Boolean);

    for (const query of queries) {
      await prisma.$executeRawUnsafe(query);
    }

    console.log(`Completed processing file: ${file}`);
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
