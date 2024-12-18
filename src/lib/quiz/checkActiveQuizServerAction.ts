"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../auth/authConfig";

export const checkActiveQuiz = async () => {
  try {
    const session = await auth();
    const uuid = session?.user?.id;

    const lastUserQuiz = await prisma.userQuiz.findFirst({
      where: {
        user_id: uuid,
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        isActive: true,
      },
    });

    if (lastUserQuiz) {
      return lastUserQuiz;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
