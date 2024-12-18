import Link from "next/link";
import Image from "next/image";
import { UserAnswer, UserQuestion } from "@prisma/client";
import AnswerSelect from "./AnswerSelect";

interface QuizPageProps {
  questionData?: UserQuestion;
  answerData?: UserAnswer;
  questionsCount?: number;
}

const QuizPage: React.FC<QuizPageProps> = ({
  questionData,
  answerData,
  questionsCount,
}) => {
  const pickedAnswer: UserAnswer =
    (Array.isArray(answerData) ? answerData : [answerData]).find(
      (answer) => answer?.isPicked
    ) || null;

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <div className="w-full flex justify-between mt-4">
        <Link href="/">
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
        {questionData?.question_id} /{questionsCount ?? 0} вопросов
      </div>

      <div className="mt-10 w-full flex flex-col items-center">
        <h1 className="text-xl font-semibold text-center">
          {questionData?.question_text_ru}
        </h1>

        <AnswerSelect
          answerData={Array.isArray(answerData) ? answerData : []}
          pickedAnswer={pickedAnswer}
        />
      </div>
    </div>
  );
};

export default QuizPage;
