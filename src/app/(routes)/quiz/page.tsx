import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuiz";
import { getUserInfo } from "@/lib/profile/getUserInfo";
import { getUserQuestionAndAnswers } from "@/lib/quiz/getUserQuestionAndAnswers";
import { redirect } from "next/navigation";
import QuizPage from "./_QuizPage";
import { User } from "next-auth";
import { createUserQuiz } from "@/lib/quiz/createUserQuiz";

const Quiz = async () => {
  const userData = await getUserInfo();
  const missingFieldsInfo = ["name", "grade", "age", "phoneNumber"].some(
    (field) => {
      return userData?.[field as keyof User] == null;
    }
  );
  if (missingFieldsInfo) {
    redirect("/profile?type=quiz");
  }

  const activeQuiz = await checkActiveQuiz();

  if (!activeQuiz) {
    await createUserQuiz();
  }

  if (activeQuiz?.isActive) {
    const questionData = await getUserQuestionAndAnswers(
      activeQuiz?.user_quizzes_id
    );
    if (questionData) return <QuizPage questionData={questionData} />;
  } else {
    redirect(`/`);
  }
};

export default Quiz;
