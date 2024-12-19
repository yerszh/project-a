import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { getUserInfo } from "@/lib/profile/getUserInfoServerAction";
import UserProfile from "@/components/page-components/UserProfile";
import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuizServerAction";
import { User } from "@prisma/client";
import { createUserQuiz } from "@/lib/quiz/createUserQuizServerAction";

const Quiz = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  const activeQuiz = await checkActiveQuiz();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    if (isAuthenticated) {
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
