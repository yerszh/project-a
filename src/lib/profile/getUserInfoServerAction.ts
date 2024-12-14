"use server";

import { prisma } from "@/lib/prisma"; // Import prisma client
import { auth } from "../auth/authConfig";
import { UserInfo } from "@/types/UserInfo";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const session = await auth();

    if (!session) {
      console.warn("Unauthorized: Session object is null or undefined");
      return null;
    }
    if (!session.user || !session.user.id) {
      console.warn("Unauthorized: User object or ID is missing in session");
      return null;
    }
    const uuid = session.user.id;

    const uuidRegExp: RegExp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    if (!uuidRegExp.test(uuid)) {
      console.warn("Invalid UUID format");
      return null;
    }

    const user = await prisma.user.findUnique({
      where: { id: uuid },
      select: {
        name: true,
        grade: true,
        age: true,
        phoneNumber: true,
      },
    });

    if (!user) {
      console.warn(`No user found with ID: ${uuid}`);
      return null;
    }

    return user as UserInfo;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
