"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";

import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import { finishQuiz } from "@/lib/quiz/finishQuiz";
import { useRouter } from "next/navigation";

import { Checkbox } from "@/components/ui/checkbox";
import { submitAnswer } from "@/lib/quiz/submitAnswer";
import LocaleSwitcher from "@/components/LocaleSwitcher/LocaleSwitcher";

type QuizPageProps = {
  questionData: {
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
  };
};

const QuizPage: React.FC<QuizPageProps> = ({ questionData }) => {
  const t = useTranslations("QuizPage");
  const locale = useLocale();
  const router = useRouter();

  const [direction, setDirection] = useState<"next" | "previous">("next");
  const lastQuizNumber = questionData?.userQuestions.length;

  const [questionNumber, setQuestionNumber] = useState(
    questionData?.current_question > lastQuizNumber
      ? lastQuizNumber
      : questionData?.current_question
  );

  const isLastQuiz = lastQuizNumber === questionNumber;
  const currentQuestion = questionData?.userQuestions[questionNumber - 1];
  const [answers, setAnswers] = useState(questionData?.UserAnswer);

  const currentAnswers = answers?.filter(
    (item) => Number(item.question_id) === questionNumber
  );

  const handleNextQuestion = () => {
    setDirection("next");
    if (lastQuizNumber && questionNumber < lastQuizNumber) {
      setQuestionNumber(questionNumber + 1);
    }
  };
  const handlePreviousQuestion = () => {
    setDirection("previous");
    if (questionNumber > 1) {
      setQuestionNumber(questionNumber - 1);
    }
  };

  const handleAnswerChange = async (pickedAnswerId: string) => {
    const updatedAnswers = answers?.map((answer) => {
      if (answer.question_id === currentQuestion?.question_id) {
        if (currentQuestion.question_type === "multiple_choice") {
          if (answer.question_id === currentQuestion?.question_id) {
            if (answer.answer_id === pickedAnswerId) {
              return {
                ...answer,
                isPicked: !answer.isPicked,
              };
            }
          }
        } else {
          return {
            ...answer,
            isPicked: answer.answer_id === pickedAnswerId ? true : false,
          };
        }
      }
      return answer;
    });

    setAnswers(updatedAnswers);

    const selectedAnswers = updatedAnswers?.filter(
      (item) => Number(item.question_id) === questionNumber
    );

    if (currentQuestion.question_type === "single_choice") {
      if (!questionData || !currentQuestion?.question_id) return;
      await submitAnswer(
        questionData.user_quizzes_id,
        currentQuestion.question_id,
        selectedAnswers
      );
      handleNextQuestion();
    }
  };

  const handleMultipleAnswer = async () => {
    const selectedAnswers = answers?.filter(
      (item) => Number(item.question_id) === questionNumber
    );
    if (!questionData || !currentQuestion?.question_id) return;
    await submitAnswer(
      questionData.user_quizzes_id,
      currentQuestion.question_id,
      selectedAnswers
    );
    handleNextQuestion();
  };

  const handleFinishQuiz = async () => {
    if (currentQuestion?.question_type === "multiple_choice") {
      handleMultipleAnswer();
    }
    if (!questionData || !currentQuestion?.question_id) return;
    await finishQuiz(questionData?.user_quizzes_id).then(() => {
      router.push("/result");
    });
  };

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

        <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center gap-1">
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

        <div className="flex flex-row gap-2">
          <LocaleSwitcher />
          <Link href="/">
            <Image
              src="/icons/close-button.svg"
              alt={t("closeButton")}
              height={24}
              width={24}
            />
          </Link>
        </div>
      </div>

      <div className="bg-[#212121] text-white w-fit text-xs font-semibold p-2.5 rounded-lg mt-4">
        {questionNumber ?? 0} /{lastQuizNumber ?? 0}{" "}
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
          <p>{currentQuestion?.question_text_ru}</p>
        </h1>

        <div className="mt-10 w-full flex flex-col items-center">
          <RadioGroup
            className="flex flex-col w-full"
            value={currentAnswers?.find((item) => item.isPicked)?.answer_id}
            onClick={(event) => event.preventDefault()}
          >
            {currentAnswers.map((answer, index) => (
              <div
                key={index}
                className="bg-[#F1F4F8] flex gap-2.5 p-[17px_13px] rounded-lg items-center hover:bg-[#E2E8F0] cursor-pointer"
                onClick={() => handleAnswerChange(answer.answer_id)}
              >
                {currentQuestion.question_type === "multiple_choice" ? (
                  <Checkbox checked={answer.isPicked} />
                ) : (
                  <RadioGroupItem
                    value={answer.answer_id}
                    id={answer.answer_id}
                  />
                )}
                <Label
                  htmlFor={answer.answer_id}
                  className="text-sm font-medium"
                  onClick={(event) => event.preventDefault()}
                >
                  {answer.answer_text_ru}
                </Label>
              </div>
            ))}
          </RadioGroup>

          {(isLastQuiz ||
            currentQuestion?.question_type === "multiple_choice") && (
            <Button
              className="m-10"
              type="button"
              onClick={isLastQuiz ? handleFinishQuiz : handleMultipleAnswer}
            >
              {isLastQuiz ? "Завершить тест" : "Дальше"}
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default QuizPage;
