"use server";

import { pool } from "@/lib/postgres";
import { auth } from "../auth/authConfig";
import { UserInfo } from "@/types/UserInfo";

export const getUserInfo = async (): Promise<UserInfo | null> => {
  try {
    const session = await auth();

    if (!session) {
      throw new Error("Unauthorized: Session object is null or undefined");
    }
    if (!session.user || !session.user.id) {
      throw new Error("Unauthorized: User object or ID is missing in session");
    }
    const uuid = session.user.id;

    const uuidRegExp: RegExp =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
    if (!uuidRegExp.test(uuid)) {
      throw new Error("Invalid UUID format");
    }

    const { rows } = await pool.query(
      "SELECT name, grade, age, phone_number FROM users WHERE id = $1",
      [uuid]
    );

    if (rows.length === 0) {
      console.warn(`No user found with ID: ${uuid}`);
      return null;
    }

    return rows[0] as UserInfo;
  } catch (error) {
    console.error("Error fetching user info:", error);
    throw error;
  }
};
