import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import ResultPage from "./ResultPage";
import { getRIASECcodes } from "@/lib/result/getRIASECcodesServerAction";
import { getProfessions } from "@/lib/methodic-data/getProfessionsServerAction";

const Result = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  // getRIASECcodes("cm4v4shm1003gujzs9mcyx9g7");

  const professions = await getProfessions(25, 25, 10, 65, 60, 45);
  console.log(professions);

  // const activeQuiz = await checkActiveQuiz();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <ResultPage />;
  }
};

export default Result;
