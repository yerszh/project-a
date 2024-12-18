import { redirect } from "next/navigation";
import QuizPage from "../QuizPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuizServerAction";
import { getUserQuestion } from "@/lib/quiz/getUserQuestion";

const QuizId = async ({ params }: { params: Promise<{ quizId: string }> }) => {
  const isAuthenticated = await checkIsAuthenticated();
  const { quizId } = await params;

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    const activeQuizData = await checkActiveQuiz();
    if (activeQuizData) {
      const questionData = await getUserQuestion(
        activeQuizData?.user_quizzes_id,
        quizId
      );
      return <QuizPage questionData={questionData} />;
    }
  }
};

export default QuizId;
