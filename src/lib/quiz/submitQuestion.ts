"use server";

import { prisma } from "@/lib/prisma";

export const submitQuestion = async (
  quizId: string,
  questionId: string,
  answerId: string
) => {
  try {
    await prisma.userAnswer.updateMany({
      where: {
        user_quizzes_id: quizId,
        question_id: questionId,
        answer_id: answerId,
      },
      data: {
        isPicked: true,
      },
    });

    await prisma.userQuestion.updateMany({
      where: {
        user_quizzes_id: quizId,
        question_id: questionId,
      },
      data: {
        question_answered: true,
      },
    });

    await prisma.userQuiz.update({
      where: {
        user_quizzes_id: quizId,
      },
      data: {
        current_question: Number(questionId) + 1,
      },
    });

    return;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};
