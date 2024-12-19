"use client";

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserAnswer } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { submitQuestion } from "@/lib/quiz/submitQuestion";
import React from "react";
import { useRouter } from "next/navigation";

interface AnswerSelectProps {
  activeQuizId: string;
  quizPageId: number;
  questionsId?: string;
  questionsCount: string;
  answerData: UserAnswer[];
}

const AnswerSelect: React.FC<AnswerSelectProps> = ({
  activeQuizId,
  quizPageId,
  questionsId,
  questionsCount,
  answerData,
}) => {
  const router = useRouter();
  const [currentAnswers, setCurrentAnswers] = React.useState(
    answerData.map((item) => ({
      answer_id: item.answer_id,
      isPicked: item.isPicked,
      user_quizzes_id: item.user_quizzes_id,
    }))
  );

  const handleRadioChange = (selectedAnswerId: string) => {
    setCurrentAnswers((prevAnswers) =>
      prevAnswers.map((answer) => ({
        ...answer,
        isPicked: answer.answer_id === selectedAnswerId,
      }))
    );
  };

  const isLastQuiz = Number(questionsCount) === quizPageId;

  const handleSubmit = async () => {
    if (questionsId) {
      await submitQuestion(
        activeQuizId,
        quizPageId,
        questionsId,
        currentAnswers,
        isLastQuiz
      ).then(() => {
        if (isLastQuiz) {
          router.push("/result");
        } else {
          router.push(`/quiz/${quizPageId + 1}`);
        }
      });
    }
  };

  return (
    <div className="mt-10 w-full flex flex-col items-center">
      <RadioGroup
        className="flex flex-col w-full"
        onValueChange={(value) => handleRadioChange(value)}
      >
        {currentAnswers.map((currentAnswer) => (
          <div
            key={currentAnswer.answer_id}
            className="bg-[#F1F4F8] flex gap-2.5 p-[17px_13px] rounded-lg items-center"
          >
            <RadioGroupItem
              value={currentAnswer.answer_id}
              id={currentAnswer.answer_id}
              checked={currentAnswer.isPicked}
            />
            <label
              htmlFor={currentAnswer.answer_id}
              className="text-sm font-medium"
            >
              {answerData.find((a) => a.answer_id === currentAnswer.answer_id)
                ?.answer_text_ru || "Answer"}
            </label>
          </div>
        ))}
      </RadioGroup>

      <Button className="m-10" type="button" onClick={handleSubmit}>
        {quizPageId === Number(questionsCount) ? "Завершить тест" : "Дальше"}
      </Button>
    </div>
  );
};

export default AnswerSelect;
