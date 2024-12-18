import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserAnswer } from "@prisma/client";
import { Button } from "@/components/ui/button";

interface AnswerSelectProps {
  answerData: UserAnswer[];
  pickedAnswer?: UserAnswer;
  onAnswerChange?: (value: string) => void;
}

const AnswerSelect: React.FC<AnswerSelectProps> = ({
  answerData,
  pickedAnswer,
  onAnswerChange,
}) => {
  return (
    <div className="mt-10 w-full flex flex-col items-center">
      <RadioGroup
        defaultValue={pickedAnswer?.answer_id}
        className="flex flex-col w-full"
      >
        {answerData.map((answer) => (
          <div
            key={answer.answer_id}
            className="bg-[#F1F4F8] flex gap-2.5 p-[17px_13px] rounded-lg items-center"
          >
            <RadioGroupItem value={answer.answer_id} />
            <label htmlFor={answer.answer_id} className="text-sm font-medium">
              {answer.answer_text_ru}
            </label>
          </div>
        ))}
      </RadioGroup>
      <Button className="m-10" type="submit">
        Дальше
      </Button>
    </div>
  );
};

export default AnswerSelect;
