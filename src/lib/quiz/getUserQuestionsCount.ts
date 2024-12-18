"use server";

import { prisma } from "@/lib/prisma";

export const getUserQuestionsCount = async (
  userQuizId: string
): Promise<any> => {
  try {
    const userQuestionsCount = await prisma.userQuestion.count({
      where: {
        user_quizzes_id: userQuizId,
      },
    });

    if (userQuestionsCount) {
      return userQuestionsCount;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
