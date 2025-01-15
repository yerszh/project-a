"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth/authConfig";
import { redirect } from "next/navigation";

interface UserInfoData {
  name: string | null;
  grade: string | null;
  age: string | null;
  phoneNumber: string | null;
  schoolId: string | null;
}

export const setUserInfo = async (formData: UserInfoData, pageType: "quiz" | "profile") => {

  try {
    const session = await auth();
    const uuid = session?.user?.id;

    if (uuid && formData) {
      const updateData: any = {
        name: formData.name,
        grade: formData.grade,
        age: formData.age,
        phoneNumber: formData.phoneNumber,
      };

      if (formData.schoolId) {
        
        updateData.school = {
          connect: { id: formData.schoolId },
        };
      } else {
        updateData.school = {
          disconnect: true,
        };
      }

      await prisma.user.update({
        where: { id: uuid },
        data: updateData,
      });

      if (pageType === 'quiz') {  
        return redirect("/quiz")
      }
    }
  } catch (error) {
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};