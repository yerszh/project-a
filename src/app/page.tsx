import { checkActiveQuiz } from "@/lib/quiz/checkActiveQuiz";
import HomePage from "./_HomePage";
import { redirect } from "next/navigation";


const Home = async () => {
  const lastQuiz = await checkActiveQuiz();
 
  if (lastQuiz?.isActive) {
    redirect("/quiz");
  } else {
    redirect("/result");
  }


  return (
    <div className="bg-white h-screen max-480:h-screen max-480:bg-[#171A1D] max-480:flex max-480:items-center">
      <main className="max-w-[480px] max-h-[960px] h-full w-full mx-auto flex flex-col items-center bg-white max-480:rounded-3xl max-480:min-h-[800px]">
        <HomePage activeQuiz={lastQuiz} />
      </main>
    </div>
  );
};

export default Home;
