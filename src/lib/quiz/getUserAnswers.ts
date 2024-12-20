"use server";

import { prisma } from "@/lib/prisma";

export const getUserAnswers = async (
  userQuizId: string,
  questionId: string
) => {
  try {
    const userAnswers = await prisma.userAnswer.findMany({
      where: {
        user_quizzes_id: userQuizId,
        question_id: questionId,
      },
    });

    userAnswers.sort((a, b) => parseInt(a.answer_id) - parseInt(b.answer_id));

    return userAnswers;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
