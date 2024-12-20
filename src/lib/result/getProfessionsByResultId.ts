"use server";

import { prisma } from "@/lib/prisma";

export const getProfessionsByResultId = async (resultId: string) => {
  try {
    const professions = await prisma.userProfessions.findMany({
      where: {
        result_id: resultId,
      },
    });
    const resultProfessions = professions.map(({ name, percent }) => ({
      name,
      percent,
    }));

    return resultProfessions;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
