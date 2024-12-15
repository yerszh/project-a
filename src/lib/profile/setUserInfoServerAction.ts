"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/authConfig";
import { UserInfo } from "@/types/UserInfo";

export const setUserInfo = async (
  userInfo: UserInfo
): Promise<{ success: boolean; message: string }> => {
  const session = await auth();

  if (!session) {
    console.warn("Unauthorized");
    return { success: false, message: "Unauthorized access" };
  }

  const uuid: string = session.user!.id!;

  const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;

  if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
    console.warn("Invalid UUID");
    return { success: false, message: "Invalid UUID format" };
  }

  try {
    await prisma.user.update({
      where: { id: uuid },
      data: {
        name: userInfo.name,
        grade: userInfo.grade,
        age: userInfo.age,
        phoneNumber: userInfo.phoneNumber,
      },
    });

    return { success: true, message: "User updated successfully" };
  } catch (err) {
    console.error("Error updating user:", err);
    return { success: false, message: "Error updating user" };
  }
};
