import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { SignInPage } from "./SignInPage";

const SignIn: React.FC = async () => {
 const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect("/quiz");
  } else {
    return <SignInPage />;
  }
};

export default SignIn;
