import { redirect } from "next/navigation";
import ResultPage from "./ResultPage";
import { getProfessions } from "@/lib/methodic-data/getProfessionsServerAction";
import { auth } from "@/lib/auth/authConfig";
import { getResultRIASEC } from "@/lib/result/getResultRIASEC";

const Result = async () => {
  const session = await auth();

  const riasecCode = await getResultRIASEC();
  // if (riasecCode) {
  //   const { R, I, A, S, E, C } = riasecCode || {};
  //   const professions = await getProfessions(R, I, A, S, E, C);

  //   console.log(professions);
  // }

  if (!session) {
    redirect("/auth/sign-in");
  } else {
    return <ResultPage riasec={riasecCode} />;
  }
};

export default Result;
