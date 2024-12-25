export interface Question {
  user_questions_id: string;
  question_id: string;
  question_answered: boolean;
  question_text_kz: string;
  question_text_ru: string;
  question_type: string;
}

export interface Answer {
  user_answers_id: string;
  answer_id: string;
  question_id: string;
  answer_text_kz: string;
  answer_text_ru: string;
  isPicked: boolean;
}

export interface UserQuiz {
  user_quizzes_id: string;
  quiz_id: string;
  isActive: boolean;
  current_question: number;
  userQuestions: Question[];
  UserAnswer: Answer[];
}
