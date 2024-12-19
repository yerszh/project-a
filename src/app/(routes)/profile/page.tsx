import { getUserInfo } from "@/lib/profile/getUserInfo";
import UserProfile from "./UserProfile";

const Profile = async () => {
  const userData = await getUserInfo();

  return <UserProfile userData={userData} type="profile" />;
};

export default Profile;
