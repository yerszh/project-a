"use server";

import { prisma } from "@/lib/prisma";

export const submitAnswer = async (
  quizId: string,
  questionId: string,
  answers: { user_answers_id: string; isPicked: boolean }[]
) => {
  try {
    const updatePromises = answers.map((answer) =>
      prisma.userAnswer.update({
        where: {
          user_answers_id: answer.user_answers_id,
        },
        data: {
          isPicked: answer.isPicked,
        },
      })
    );

    await Promise.all(updatePromises);

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
