import { redirect } from "next/navigation";
import QuizPage from "../QuizPage";
import { auth } from "@/lib/auth/authConfig";

const QuizId = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await auth();
  const { id } = await params;

  if (!session) {
    redirect("/auth/sign-in");
  } else {
    return <QuizPage id={id} />;
  }
};

export default QuizId;
