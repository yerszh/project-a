import { getUserInfo } from "@/lib/profile/getUserInfo";
import ProfilePage from "./_ProfilePage";
import { getSchoolByUrl } from "@/lib/profile/getSchoolByUrl";
import { cookies } from "next/headers";
import { getAllSchool } from "@/lib/profile/getAllSchool";

const Profile = async () => {
  const userData = await getUserInfo();
  const cookieStore = await cookies();
  const schoolCookie = cookieStore.get("school")?.value || "gen";
  const schoolByUrl = await getSchoolByUrl(schoolCookie);
  const allSchools = await getAllSchool();

  return (
    <ProfilePage
      allSchools={allSchools}
      schoolByUrl={schoolByUrl}
      userData={userData}
    />
  );
};

export default Profile;
