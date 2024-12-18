"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../auth/authConfig";

export const checkActiveQuiz = async () => {
  try {
    const session = await auth();

    if (!session) {
      return;
    }

    const uuid = session?.user?.id;

    const lastUserQuiz = await prisma.userQuiz.findFirst({
      where: {
        user_id: uuid,
        isActive: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (lastUserQuiz) {
      return lastUserQuiz;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};
