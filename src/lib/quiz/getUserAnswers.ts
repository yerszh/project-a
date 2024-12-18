"use server";

import { prisma } from "@/lib/prisma";

const calculateAnswerIdRange = (questionId: string): string[] => {
  const questionNumber = parseInt(questionId);
  const startRange = (questionNumber - 1) * 4 + 1;
  return Array.from({ length: 4 }, (_, index) =>
    (startRange + index).toString()
  );
};

export const getUserAnswers = async (
  userQuizId: string,
  questionId: string
): Promise<any> => {
  try {
    const answerIdRange = calculateAnswerIdRange(questionId);

    const userAnswers = await prisma.userAnswer.findMany({
      where: {
        user_quizzes_id: userQuizId,
        answer_id: {
          in: answerIdRange,
        },
      },
    });

    return userAnswers;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
