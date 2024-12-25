import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuiz";
import HomePage from "./_HomePage";

const Home = async () => {
  const activeQuiz = await checkActiveQuiz();

  return <HomePage activeQuiz={activeQuiz} />;
};

export default Home;
