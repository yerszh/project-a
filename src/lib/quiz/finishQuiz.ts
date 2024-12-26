"use server";

import { prisma } from "@/lib/prisma";
import { setResultRIASEC } from "../result/setResultRIASEC";
import { setUserProfessions } from "../result/setUserProfessions";

export const finishQuiz = async (quizId: string) => {
  try {
    await prisma.userQuiz.update({
      where: {
        user_quizzes_id: quizId,
      },
      data: {
        finished: new Date(),
        isActive: false,
      },
    });

    if (quizId) {
      const result = await setResultRIASEC(quizId);
      if (result) {
        await setUserProfessions(result);
      }
    }

    return;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};
