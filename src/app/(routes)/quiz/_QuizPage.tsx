"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { submitQuestion } from "@/lib/quiz/submitQuestion";
import { useRouter } from "next/navigation";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";

type QuizPageProps = {
  questionData?: {
    user_quizzes_id: string;
    quiz_id: string;
    isActive: boolean;
    current_question: number;

    userQuestions: {
      user_questions_id: string;
      question_id: string;
      question_answered: boolean;
      question_text_kz: string;
      question_text_ru: string;
      question_type: string;
    }[];

    UserAnswer: {
      user_answers_id: string;
      answer_id: string;
      question_id: string;
      answer_text_kz: string;
      answer_text_ru: string;
      isPicked: boolean;
    }[];
  } | null;
};

const QuizPage: React.FC<QuizPageProps> = ({ questionData }) => {
  const t = useTranslations("QuizPage");
  const locale = useLocale();
  const [direction, setDirection] = useState<"next" | "previous">("next");

  const [questionNumber, setQuestionNumber] = useState(
    questionData?.current_question || 1
  );
  const isLastQuiz = questionData?.userQuestions.length === questionNumber;

  const currentQuestion = questionData?.userQuestions[questionNumber - 1];
  const [answers, setAnswers] = useState(questionData?.UserAnswer);

  const currentAnswer = answers
    ?.filter((item) => Number(item.question_id) === questionNumber)
    .find((answer) => answer.isPicked);

  const handleNextQuestion = () => {
    setDirection("next");
    setQuestionNumber(questionNumber + 1);
  };
  const handlePreviousQuestion = () => {
    setDirection("previous");
    if (questionNumber > 0) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    const updatedAnswers = answers?.map((answer) => {
      if (answer.question_id === currentQuestion?.question_id) {
        return {
          ...answer,
          isPicked: answer.answer_id === value ? true : false,
        };
      }
      return answer;
    });

    setAnswers(updatedAnswers);
    handleNextQuestion();
    console.log(value);
  };

  // const handleSubmit = async () => {
  //   if (questionData?.userQuestion?.question_id && currentAnswers) {
  //     await submitQuestion(
  //       isLastQuiz,
  //       questionData?.userQuestion?.question_id,
  //       currentAnswers
  //     ).then(() => {
  //       if (isLastQuiz) {
  //         router.push("/result");
  //       } else {
  //         router.push(`/quiz/${currentQuestion + 1}`);
  //       }
  //     });
  //   }
  // };

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <div className="w-full flex justify-between mt-4">
        <Button
          onClick={handlePreviousQuestion}
          variant={"ghost"}
          size={"icon"}
        >
          <Image
            src="/icons/arrow-back.svg"
            alt={t("arrowBack")}
            height={24}
            width={24}
          />
        </Button>

        <div className="flex gap-1 items-center">
          <Image
            src="/icons/logo.svg"
            alt={t("quizTitle")}
            height={24}
            width={24}
          />
          <h1 className="text-sm text-[#171A1D] font-semibold">
            {t("quizTitle")}
          </h1>
        </div>

        <Link href="/">
          <Image
            src="/icons/close-button.svg"
            alt={t("closeButton")}
            height={24}
            width={24}
          />
        </Link>
      </div>

      <div className="bg-[#212121] text-white w-fit text-xs font-semibold p-2.5 rounded-lg mt-4">
        {questionNumber ?? 0} /{questionData?.userQuestions.length ?? 0}{" "}
        {" " + t("questionCounter")}
      </div>

      <motion.div
        key={questionNumber}
        className="mt-10 w-full flex flex-col items-center"
        initial={{ opacity: 0, x: direction === "next" ? -20 : 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: direction === "next" ? 20 : -20 }}
        transition={{ duration: 0.2 }}
      >
        <h1 className="text-xl font-semibold text-center">
          <p>
            {currentQuestion?.question_text_ru}
            {currentQuestion?.question_text_kz}
          </p>
        </h1>

        <form
          onSubmit={(e) => {}}
          className="mt-10 w-full flex flex-col items-center"
        >
          <RadioGroup
            className="flex flex-col w-full"
            value={currentAnswer?.answer_id || ""}
            onValueChange={handleAnswerChange}
          >
            {answers
              ?.filter((item) => Number(item.question_id) === questionNumber)
              ?.map((answer, index) => (
                <div
                  key={index}
                  className="bg-[#F1F4F8] flex gap-2.5 p-[17px_13px] rounded-lg items-center"
                >
                  <RadioGroupItem
                    value={answer.answer_id}
                    id={answer.answer_id}
                  />
                  <Label
                    htmlFor={answer.answer_id}
                    className="text-sm font-medium"
                  >
                    {answer.answer_text_ru}
                  </Label>
                </div>
              ))}
          </RadioGroup>

          {isLastQuiz && (
            <Button className="m-10" type="button">
              Завершить тест
            </Button>
          )}
        </form>
      </motion.div>
    </div>
  );
};

export default QuizPage;
