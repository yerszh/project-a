import { redirect } from "next/navigation";

import { getUserInfo } from "@/lib/profile/getUserInfoServerAction";
import UserProfile from "@/app/(routes)/profile/UserProfile";
import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuizServerAction";
import { User } from "@prisma/client";
import { createUserQuiz } from "@/lib/quiz/createUserQuizServerAction";
import { auth } from "@/lib/auth/authConfig";

const Quiz = async () => {
  const session = await auth();
  const activeQuiz = await checkActiveQuiz();

  if (!session) {
    redirect("/auth/sign-in");
  } else {
    if (session) {
      const userData: User | null = await getUserInfo();

      const missingFieldsInfo = ["name", "grade", "age", "phoneNumber"].some(
        (field) => {
          return userData?.[field as keyof User] == null;
        }
      );

      if (missingFieldsInfo) {
        return <UserProfile userData={userData} type="quiz" />;
      } else {
        if (!activeQuiz) {
          await createUserQuiz();
        } else if (activeQuiz) {
          redirect(`/quiz/${activeQuiz.current_question} `);
        }
      }
    }
  }
};

export default Quiz;
