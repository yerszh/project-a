import { redirect } from "next/navigation";
import QuizPage from "../QuizPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

const QuizId = async ({ params }: { params: Promise<{ quizId: string }> }) => {
  const isAuthenticated = await checkIsAuthenticated();
  const { quizId } = await params;

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <QuizPage quizId={quizId} />;
  }
};

export default QuizId;
