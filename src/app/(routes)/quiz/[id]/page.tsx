import QuizPage from "./QuizPage";

const QuizId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  return <QuizPage id={id} />;
};

export default QuizId;
