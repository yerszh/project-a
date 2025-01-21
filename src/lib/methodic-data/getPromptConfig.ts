"use server";

import { prisma } from "@/lib/prisma";

export const getPromptConfig = async () => {
  try {
    const config = await prisma.methodic_config.findMany();
    return config || null;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
