"use server";

import { prisma } from "@/lib/prisma";

export const submitQuestion = async (
  userQuestionsId: string,
  currentAnswers: {
    answer_id: string;
    isPicked: boolean;
    user_quizzes_id: string;
  }[]
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

    return { success: true, message: "Updated successfully" };
  } catch (err) {
    console.error("Error updating:", err);
    return { success: false, message: "Error updating" };
  } finally {
    await prisma.$disconnect();
  }
};
