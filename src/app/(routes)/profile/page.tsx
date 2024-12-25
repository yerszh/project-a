import { getUserInfo } from "@/lib/profile/getUserInfo";
import ProfilePage from "./_ProfilePage";

const Profile = async () => {
  const userData = await getUserInfo();

  return <ProfilePage userData={userData} type="profile" />;
};

export default Profile;
