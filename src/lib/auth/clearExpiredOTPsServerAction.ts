import { prisma } from "@/lib/prisma";

export async function clearExpiredOTPs() {
  try {
    await prisma.oTP.deleteMany({
      where: {
        expiresAt: { lt: new Date() },
      },
    });
  } catch (error) {
    throw error;
  }
}
