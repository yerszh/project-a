import { redirect } from "next/navigation";
import { SingInPage } from "./SingInPage";

const SingIn: React.FC = async () => {
  const isAuthenticated = false;

  if (isAuthenticated) {
    redirect("/");
  } else {
    return <SingInPage />;
  }
};

export default SingIn;
