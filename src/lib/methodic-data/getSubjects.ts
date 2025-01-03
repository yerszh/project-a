"use server";

import { prisma } from "@/lib/prisma";

export const getSubjects = async () => {
  try {
    const allSubjects = await prisma.methodic_specs.findMany({
      distinct: ["subjects"],
      select: {
        subjects: true,
      },
    });
    return allSubjects || null;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
