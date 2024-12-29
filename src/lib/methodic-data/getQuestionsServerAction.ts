"use server";

import { prisma } from "@/lib/prisma";

export const getQuestions = async () => {
  try {
    const allQuestions = await prisma.methodic_questions.findMany();
    return allQuestions || null;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
