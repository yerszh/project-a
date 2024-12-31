"use server";

import { prisma } from "@/lib/prisma";

export const getAnswers = async () => {
  try {
    const allAnswers = await prisma.methodic_answers.findMany();
    return allAnswers || null;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
