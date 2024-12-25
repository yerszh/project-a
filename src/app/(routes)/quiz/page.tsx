import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuiz";
import { User } from "@prisma/client";
import { createUserQuiz } from "@/lib/quiz/createUserQuiz";

import { getUserInfo } from "@/lib/profile/getUserInfo";
import { getUserQuestionAndAnswers } from "@/lib/quiz/getUserQuestionAndAnswers";

import { redirect } from "next/navigation";
import ProfilePage from "../profile/_ProfilePage";
import QuizPage from "./_QuizPage";

const Quiz = async () => {
  const userData = await getUserInfo();
  // const missingFieldsInfo = ["name", "grade", "age", "phoneNumber"].some(
  //   (field) => {
  //     return userData?.[field as keyof User] == null;
  //   }
  // );
  // if (missingFieldsInfo) {
  //   return <ProfilePage userData={userData} type="quiz" />;
  // }

  const activeQuiz = await checkActiveQuiz();

  if (activeQuiz) {
    const questionData = await getUserQuestionAndAnswers(
      activeQuiz?.user_quizzes_id
    );

    return <QuizPage questionData={questionData} />;
  } else {
    redirect(`/`);
  }
};

export default Quiz;
