"use server";

import { prisma } from "@/lib/prisma";
import { setResultRIASEC } from "../result/setResultRIASEC";
import { setUserProfessions } from "../result/setUserProfessions";
import { getLastUserResult } from "../result/getLastUserResult";
import { auth } from "../auth/authConfig";

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

    const session = await auth();
    const userEmail = session?.user?.email
    const userResult = await getLastUserResult();

    const json = {
      email: userEmail,
      r: userResult?.R?.toString(),
      i: userResult?.I?.toString(),
      a: userResult?.A?.toString(),
      s: userResult?.S?.toString(),
      e: userResult?.E?.toString(),
      c: userResult?.C?.toString(),
    } as { [key: string]: string | undefined | null };
    
    userResult?.UserProfessions?.forEach((profession, index) => {
      const valueKey = `${index + 1}`;
      const profKey = `prof${valueKey}`;
    
      json[profKey] = profession.name_ru; 
      json[valueKey] = profession.percent.toString(); 
    });
    

      fetch(
      "https://script.google.com/macros/s/AKfycbzJXxoA9ZzgcgCxn9b5Ay73iFT2SqkojKBuxc9OvjkGjVN1uLXxkojzO0m3GDZS5u8K/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(json),
      }
    );

    return;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};
