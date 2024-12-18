import { redirect } from "next/navigation";
import QuizPage from "./QuizPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { UserInfo } from "@/types/UserInfo";
import { getUserInfo } from "@/lib/profile/getUserInfoServerAction";
import UserProfile from "@/components/page-components/UserProfile";
import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuizServerAction";

const Quiz: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  const activeQuiz = await checkActiveQuiz();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    if (isAuthenticated) {
      const userData: UserInfo | null = await getUserInfo();
      if (userData && Object.values(userData).includes(null)) {
        return <UserProfile userData={userData} type="quiz" />;
      } else {
        return <QuizPage />;
      }
    }
  }
};

export default Quiz;
