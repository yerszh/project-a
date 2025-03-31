"use server";

import { prisma } from "@/lib/prisma";
import { setResultRIASEC } from "../result/setResultRIASEC";
import { setUserProfessions } from "../result/setUserProfessions";
import { getLastUserResult } from "../result/getLastUserResult";
import { auth } from "../auth/authConfig";
import { getLocale } from "next-intl/server";

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
    const userEmail = session?.user?.email;
    const userResult = await getLastUserResult();
    const locale = await getLocale();

    const jsonData = {
      language: locale,
      email: userEmail,
      r: userResult?.R?.toString(),
      i: userResult?.I?.toString(),
      a: userResult?.A?.toString(),
      s: userResult?.S?.toString(),
      e: userResult?.E?.toString(),
      c: userResult?.C?.toString(),
    } as { [key: string]: any };

    userResult?.UserProfessions?.forEach((profession, index) => {
      const valueKey = `${index + 1}`;
      const profKey = `prof${valueKey}`;

      jsonData[profKey] = {
        ru: profession.name_ru,
        kz: profession.name_kz,
      };
      jsonData[valueKey] = profession.percent.toString();
    });

    fetch(
      "https://script.google.com/macros/s/AKfycbwn1muWS2at_SQDUVw9uAeVRTcFqblsEBjOJxjZE4L4BbgE48JUU8IWajVy7O00vtJw/exec",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(jsonData),
      }
    );

    return;
  } catch (err) {
    throw err;
  } finally {
    await prisma.$disconnect();
  }
};
