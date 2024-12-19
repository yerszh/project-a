import { redirect } from "next/navigation";
import QuizPage from "../QuizPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

const QuizId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const isAuthenticated = await checkIsAuthenticated();
  const { id } = await params;

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <QuizPage id={id} />;
  }
};

export default QuizId;
