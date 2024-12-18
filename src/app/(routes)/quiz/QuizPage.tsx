"use client";

import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import Image from "next/image";
import { UserAnswer, UserQuestion } from "@prisma/client";

interface QuizPageProps {
  questionData?: UserQuestion;
  answerData?: UserAnswer;
}

const QuizPage: React.FC<QuizPageProps> = ({ questionData, answerData }) => {
  console.log(answerData);

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
        {questionData?.question_id} /32 вопросов
      </div>

      <div className="mt-10 w-full flex flex-col items-center">
        <h1 className="text-xl font-semibold text-center">
          {questionData?.question_text_ru}
        </h1>

        <RadioGroup
          // onValueChange={field.onChange}
          // defaultValue={field.value}
          className="mt-10 flex flex-col w-full"
        >
          {/* Check if answerData is an array */}
          {Array.isArray(answerData) &&
            answerData.map((answer) => (
              <div
                key={answer.answer_id}
                className="bg-[#F1F4F8] flex gap-2.5 p-[17px_13px] rounded-lg items-center"
              >
                <RadioGroupItem
                  value={answer.answer_id}
                  id={answer.answer_id}
                />
                <label
                  htmlFor={answer.answer_id}
                  className="text-sm font-medium"
                >
                  {answer.answer_text_ru}
                </label>
              </div>
            ))}
        </RadioGroup>
      </div>

      <Button className="m-10" type="submit">
        Дальше
      </Button>
    </div>
  );
};

export default QuizPage;
