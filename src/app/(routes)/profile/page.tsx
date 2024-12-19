import { redirect } from "next/navigation";
import { getUserInfo } from "@/lib/profile/getUserInfoServerAction";
import UserProfile from "@/app/(routes)/profile/UserProfile";
import { User } from "@prisma/client";
import { auth } from "@/lib/auth/authConfig";

const Profile: React.FC = async () => {
  const session = await auth();

  if (session) {
    const userData: User | null = await getUserInfo();
    return <UserProfile userData={userData} type="profile" />;
  } else {
    redirect("/auth/sign-in");
  }
};

export default Profile;
