"use server";

import { prisma } from "@/lib/prisma";

export const getUserQuestionAndAnswers = async (quizId: string) => {
  try {
    if (quizId) {
      const userQuestionAndAnswers = await prisma.userQuiz.findUnique({
        where: {
          user_quizzes_id: quizId,
        },

        select: {
          user_quizzes_id: true,
          quiz_id: true,
          isActive: true,
          current_question: true,

          userQuestions: {
            select: {
              user_questions_id: true,
              question_id: true,
              question_answered: true,
              question_text_kz: true,
              question_text_ru: true,
              question_type: true,
            },
          },

          UserAnswer: {
            orderBy: {
              user_answers_id: "asc",
            },
            select: {
              user_answers_id: true,
              answer_id: true,
              question_id: true,
              answer_text_kz: true,
              answer_text_ru: true,
              isPicked: true,
            },
          },
        },
      });

      return userQuestionAndAnswers;
    }
    return null;
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
