"use server";

import { prisma } from "@/lib/prisma";

export const getRIASECcodes = async (userQuizId: string) => {
  try {
    const userAnswers = await prisma.userAnswer.findMany({
      where: {
        user_quizzes_id: userQuizId,
        isPicked: true,
      },
      include: {
        userQuiz: {
          include: {
            userQuestions: true,
          },
        },
      },
    });

    const resultScores: { [key in "R" | "I" | "A" | "S" | "E" | "C"]: number } =
      {
        R: 0,
        I: 0,
        A: 0,
        S: 0,
        E: 0,
        C: 0,
      };

    userAnswers.forEach((answer) => {
      const score = answer.riasec_score * 5;
      const userQuestions = answer.userQuiz.userQuestions;
      const userQuestion = userQuestions.find(
        (question) => question.question_id === answer.question_id
      );

      if (userQuestion) {
        const riasecCode = userQuestion.riasec_code as
          | "R"
          | "I"
          | "A"
          | "S"
          | "E"
          | "C";

        if (riasecCode in resultScores) {
          resultScores[riasecCode] += score;
        }
      }
    });
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
