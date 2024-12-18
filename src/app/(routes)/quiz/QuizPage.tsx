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
  console.log(questionData);

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
      </div>

      {/* <div className="mt-10 flex flex-col items-center">
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-xl font-semibold">
                {questionData?.question_text_ru}
              </FormLabel>

              <FormControl className="my-20">
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col"
                >
                  {mockOptions.map((option) => (
                    <FormItem
                      key={option.value}
                      className="bg-[#F1F4F8] flex gap-2.5 p-[17px_13px] rounded-lg items-center"
                    >
                      <FormControl>
                        <RadioGroupItem value={option.value} />
                      </FormControl>
                      <FormLabel className="text-sm font-medium">
                        {option.label}
                      </FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Дальше</Button>
      </div> */}
    </div>
  );
};

export default QuizPage;
