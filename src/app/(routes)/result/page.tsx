import { redirect } from "next/navigation";
import ResultPage from "./ResultPage";
import { getProfessions } from "@/lib/methodic-data/getProfessionsServerAction";
import { auth } from "@/lib/auth/authConfig";

const Result = async () => {
  const session = await auth();
  // getRIASECcodes("cm4v4shm1003gujzs9mcyx9g7");

  const professions = await getProfessions(25, 25, 10, 65, 60, 45);
  console.log(professions);

  // const activeQuiz = await checkActiveQuiz();

  if (!session) {
    redirect("/auth/sign-in");
  } else {
    return <ResultPage />;
  }
};

export default Result;
