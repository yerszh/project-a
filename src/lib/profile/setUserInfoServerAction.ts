"use server";

import { auth } from "@/lib/auth/authConfig";
import { pool } from "@/lib/postgres";

interface UserInfo {
  name: string;
  grade: string;
  age: number;
  phone_number: string;
}

export const setUserInfo = async (userInfo: UserInfo) => {
  const session = await auth();
  if (!session) {
    throw new Error("Unauthorized");
  }

  const uuid: string = session.user!.id!;

  const uuidRegExp: RegExp =
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
  if (typeof uuid !== "string" || !uuidRegExp.test(uuid)) {
    throw new Error("Invalid UUID");
  }

  try {
    const result = await pool.query(
      "UPDATE users SET name = $1, grade = $2, age = $3, phone_number = $4 WHERE id = $5 RETURNING *",
      [userInfo.name, userInfo.grade, userInfo.age, userInfo.phone_number, uuid]
    );

    if (result.rows.length === 0) {
      return null;
    }

    return result.rows[0];
  } catch (err) {
    console.error("Error updating user:", err);
    throw err;
  }
};
