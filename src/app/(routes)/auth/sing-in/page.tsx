import { redirect } from "next/navigation";
import { SingInPage } from "./SingInPage";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";

const SingIn: React.FC = async () => {
  // TODO
  
 const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect("/quiz");
  } else {
    return <SingInPage />;
  }
};

export default SingIn;
