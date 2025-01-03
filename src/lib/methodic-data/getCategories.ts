"use server";

import { prisma } from "@/lib/prisma";

export const getCategories = async () => {
  try {
    const allCategories = await prisma.methodic_categories.findMany();
    return allCategories || null;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
