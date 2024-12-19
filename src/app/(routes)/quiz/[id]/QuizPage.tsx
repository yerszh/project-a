import Link from "next/link";
import Image from "next/image";
import AnswerSelect from "../../../../components/page-components/AnswerSelect";
import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuiz";
import { getUserQuestionsCount } from "@/lib/quiz/getUserQuestionsCount";
import { getUserQuestion } from "@/lib/quiz/getUserQuestion";
import { getUserAnswers } from "@/lib/quiz/getUserAnswers";

interface QuizPageProps {
  id: string;
}

const QuizPage: React.FC<QuizPageProps> = async ({ id }) => {
  const quizPageId = Number(id);
  const activeQuizData = await checkActiveQuiz();
  const activeQuizId = activeQuizData?.user_quizzes_id;

  if (activeQuizId) {
    const userQuestionsCount = await getUserQuestionsCount(activeQuizId);
    const userQuestionData = await getUserQuestion(activeQuizId, id);
    const userAnswersData = await getUserAnswers(activeQuizId, id);

    return (
      <div className="p-4 w-full flex flex-col items-center">
        <div className="w-full flex justify-between mt-4">
          <Link href={quizPageId !== 1 ? `/quiz/${quizPageId - 1}` : "1"}>
            <Image
              src="/icons/arrow-back.svg"
              alt={"arrow-back"}
              height={24}
              width={24}
            />
          </Link>

          <div className="flex gap-1 items-center">
            <Image src="/icons/logo.svg" alt={"logo"} height={24} width={24} />
            <h1 className="text-sm text-[#171A1D] font-semibold">
              AI Профориентатор
            </h1>
          </div>

          <Link href="/">
            <Image
              src="/icons/close-button.svg"
              alt={"close-button"}
              height={24}
              width={24}
            />
          </Link>
        </div>

        <div className="bg-[#212121] text-white w-fit text-xs font-semibold p-2.5 rounded-lg mt-4">
          {userQuestionData?.question_id} /{userQuestionsCount ?? 0} вопросов
        </div>

        <div className="mt-10 w-full flex flex-col items-center">
          <h1 className="text-xl font-semibold text-center">
            {userQuestionData?.question_text_ru}
          </h1>

          <AnswerSelect
            activeQuizId={activeQuizId}
            quizPageId={quizPageId}
            questionsId={userQuestionData?.user_questions_id}
            questionsCount={userQuestionsCount}
            answerData={userAnswersData ?? []}
          />
        </div>
      </div>
    );
  } else {
    return <>Error</>;
  }
};

export default QuizPage;
