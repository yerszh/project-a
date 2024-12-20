import { PrismaClient } from "@prisma/client";
import { auth } from "../auth/authConfig";
import { getProfessionsByResultId } from "./getProfessionsByResultId";

const prisma = new PrismaClient();

export const getLastUserResult = async () => {
  try {
    const session = await auth();
    const uuid = session?.user?.id;

    const lastResult = await prisma.results.findFirst({
      where: {
        user_id: uuid,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    if (lastResult) {
      const userResult = (({ R, I, A, S, E, C }) => ({
        R,
        I,
        A,
        S,
        E,
        C,
      }))(lastResult);

      const userProfessions = await getProfessionsByResultId(
        lastResult.result_id
      );

      return { ...userResult, userProfessions };
    }
  } catch (error) {
    console.error("Error fetching the last result: ", error);
  } finally {
    await prisma.$disconnect();
  }
};
