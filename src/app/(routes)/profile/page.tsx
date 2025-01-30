import { getUserInfo } from "@/lib/profile/getUserInfo";
import ProfilePage from "./_ProfilePage";
import { getSchoolByUrl } from "@/lib/profile/getSchoolByUrl";
import { cookies } from "next/headers";

const Profile = async () => {
  const userData = await getUserInfo();
  const cookieStore = await cookies();
  const schoolCookie = cookieStore.get("school")?.value || "gen";
  const selectedSchool = await getSchoolByUrl(schoolCookie);

  return <ProfilePage selectedSchool={selectedSchool} userData={userData} />;
};

export default Profile;
