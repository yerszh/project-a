import { redirect } from "next/navigation";
import QuizPage from "./QuizPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

const Quiz: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <QuizPage />;
  }
 
}

export default Quiz;