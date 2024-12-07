import { redirect } from "next/navigation";
import { SingInPage } from "./SingInPage";

const SingIn: React.FC = async () => {
  // TODO
  const isAuthenticated = false;
// const isAuthenticated = await checkIsAuthenticated();
  if (isAuthenticated) {
    redirect("/");
  } else {
    return <SingInPage />;
  }
};

export default SingIn;
