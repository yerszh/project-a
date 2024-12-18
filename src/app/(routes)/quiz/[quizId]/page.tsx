import { redirect } from "next/navigation";
import QuizPage from "../QuizPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuizServerAction";
import { getUserQuestion } from "@/lib/quiz/getUserQuestion";
import { getUserAnswers } from "@/lib/quiz/getUserAnswers";
import { getUserQuestionsCount } from "@/lib/quiz/getUserQuestionsCount";

const QuizId = async ({ params }: { params: Promise<{ quizId: string }> }) => {
  const isAuthenticated = await checkIsAuthenticated();
  const { quizId } = await params;

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    const activeQuizData = await checkActiveQuiz();
    if (activeQuizData) {
      const userQuestionData = await getUserQuestion(
        activeQuizData?.user_quizzes_id,
        quizId
      );

      const userAnswersData = await getUserAnswers(
        activeQuizData?.user_quizzes_id,
        quizId
      );
      const userQuestionsCount = await getUserQuestionsCount(
        activeQuizData?.user_quizzes_id
      );

      return (
        <QuizPage
          questionData={userQuestionData}
          answerData={userAnswersData}
          questionsCount={userQuestionsCount}
        />
      );
    }
  }
};

export default QuizId;
