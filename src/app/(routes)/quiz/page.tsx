import { redirect } from "next/navigation";
import QuizPage from "./QuizPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

const Quiz: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  console.log(isAuthenticated);
  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    // if (isAuthenticated) {
    //   const userData: UserInfo | null = await getUserInfo();
    //   if (userData && Object.values(userData).includes(null)) {
    //     return <UserProfile userData={userData} />;
    //   } else {
    //     return <QuizPage />;
    //   }
    // }
    return <QuizPage />;
  }
};

export default Quiz;
