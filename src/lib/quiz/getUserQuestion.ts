"use server";

import { prisma } from "@/lib/prisma";

export const getUserQuestion = async (
  userQuizId: string,
  questionId: string
) => {
  try {
    const question = await prisma.userQuestion.findFirst({
      where: {
        user_quizzes_id: userQuizId,
        question_id: questionId,
      },
    });

    if (question) {
      return question;
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
