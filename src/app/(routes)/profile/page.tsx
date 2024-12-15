import { redirect } from "next/navigation";
import { checkIsAuthenticated } from "@/lib/auth/checkIsAuthenticated";
import { UserInfo } from "@/types/UserInfo";
import { getUserInfo } from "@/lib/profile/getUserInfoServerAction";
import UserProfile from "@/components/page-components/UserProfile";

const Profile: React.FC = async () => {
  const isAuthenticated = await checkIsAuthenticated();

  if (isAuthenticated) {
    const userData: UserInfo | null = await getUserInfo();
    return <UserProfile userData={userData} type="profile" />;
  } else {
    redirect("/auth/sign-in");
  }
};

export default Profile;
