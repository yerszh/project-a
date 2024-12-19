"use server";

import { prisma } from "@/lib/prisma";

export const submitQuestion = async (
  activeQuizId: string,
  quizPageId: number,
  userQuestionsId: string,
  currentAnswers: {
    answer_id: string;
    isPicked: boolean;
    user_quizzes_id: string;
  }[],
  isLastQuiz: boolean
): Promise<{ success: boolean; message: string }> => {
  try {
    await prisma.userQuestion.update({
      where: {
        user_questions_id: userQuestionsId,
      },
      data: {
        question_answered: true,
      },
    });

    for (const answer of currentAnswers) {
      await prisma.userAnswer.updateMany({
        where: {
          answer_id: answer.answer_id,
          user_quizzes_id: answer.user_quizzes_id,
        },
        data: {
          isPicked: answer.isPicked,
        },
      });
    }

    await prisma.userQuiz.update({
      where: {
        user_quizzes_id: activeQuizId,
      },
      data: {
        current_question: isLastQuiz ? quizPageId : quizPageId + 1,
        finished: isLastQuiz ? new Date() : null,
        isActive: isLastQuiz ? false : true,
      },
    });

    if (isLastQuiz) {
    }

    return { success: true, message: "Updated successfully" };
  } catch (err) {
    return { success: false, message: "Error updating" };
  } finally {
    await prisma.$disconnect();
  }
};
