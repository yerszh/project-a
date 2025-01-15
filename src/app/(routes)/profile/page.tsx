import { getUserInfo } from "@/lib/profile/getUserInfo";
import ProfilePage from "./_ProfilePage";
import { getSchools } from "@/lib/profile/getSchools";
import { cookies } from "next/headers";

const Profile = async () => {
  const userData = await getUserInfo();
  const schools = await getSchools()
  const cookieStore = await cookies();
  const schoolCookie = cookieStore.get("school")?.value || '';

  return <ProfilePage schoolCookie={schoolCookie}  schools={schools} userData={userData} pageType="profile" />;
};

export default Profile;
