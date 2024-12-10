import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { UserInfo } from "@/types/UserInfo";
import { getUserInfo } from "@/lib/profile/getUserInfoServerAction";
import UserProfile from "@/components/page-components/UserProfile";

const Profile: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();
  const userData: UserInfo | null = await getUserInfo();

  if (!isAuthenticated) {
    redirect("/auth/sign-in");
  } else {
    return <UserProfile userData={userData} />;
  }
};

export default Profile;
