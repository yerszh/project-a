"use server";

import { prisma } from "@/lib/prisma"; // Import the Prisma client
import { auth } from "@/lib/auth/authConfig";
import { UserInfo } from "@/types/UserInfo";

export const setUserInfo = async (userInfo: UserInfo) => {
  const session = await auth();

  if (!session) {
    console.warn("Unauthorized");
    return null;
  }

  const uuid: string = session.user!.id!;

  const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

  if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
    console.warn("Invalid UUID");
    return null;
  }

  try {
    const updatedUser = await prisma.user.update({
      where: { id: uuid },
      data: {
        name: userInfo.name,
        grade: userInfo.grade,
        age: userInfo.age,
        phoneNumber: userInfo.phoneNumber,
      },
    });

    return updatedUser;
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
};
