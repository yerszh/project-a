
import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;




const { PrismaClient } = require('@prisma/client');
const fs = require('fs');


const prisma = new PrismaClient();

async function executeSqlFile() {
  try {
    // Path to your SQL file
    const sqlFilePath = path.join(__dirname, 'setup.sql');

    // Read the SQL file
    const sql = fs.readFileSync(sqlFilePath, 'utf-8');

    // Split the SQL file into individual statements based on semicolon
    // This regex handles semicolons within strings or comments
    const statements = sql
      .split(/;(?![^()]*\))/) // Adjust the regex as needed for your SQL complexity
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);

    // Start a transaction for atomicity
    await prisma.$transaction(async (tx) => {
      for (const statement of statements) {
        console.log(`Executing: ${statement}`);
        await tx.$executeRawUnsafe(statement);
      }
    });

    console.log('SQL file executed successfully.');
  } catch (error) {
    console.error('Error executing SQL file:', error);
  } finally {
    await prisma.$disconnect();
  }
}

executeSqlFile();