"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "../auth/authConfig";
import { User } from "@prisma/client";

export const getUserInfo = async () => {
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

    const user = await prisma.user.findUnique({
      where: { id: uuid },
    });

    if (!user) {
      console.warn(`No user found with ID: ${uuid}`);
      return null;
    }

    return user as User;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
