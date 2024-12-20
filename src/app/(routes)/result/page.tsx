import ResultPage from "./ResultPage";
import { getLastUserResult } from "@/lib/result/getLastUserResult";

const Result = async () => {
  const userResult = await getLastUserResult();

  return <ResultPage userResult={userResult} />;
};

export default Result;
