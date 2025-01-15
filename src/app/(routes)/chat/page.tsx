import React from "react";
import ChatPage from "./_ChatPage";
import { getLastUserResult } from "@/lib/result/getLastUserResult";
import { getUsesAllChat } from "@/lib/chat/getUsesAllChat";
import { getJobs } from "@/lib/methodic-data/getJobs";
import { getCategories } from "@/lib/methodic-data/getCategories";
import { getSubjects } from "@/lib/methodic-data/getSubjects";

const Chat: React.FC = async () => {
  const userResult = await getLastUserResult();
  const userChats = await getUsesAllChat();
  const allJobs = await getJobs();
  const allCategories = await getCategories();
  const allSubjects = await getSubjects();

  return (
    <ChatPage
      userChats={userChats as any}
      userProfessions={userResult?.UserProfessions as any}
      allJobs={allJobs as any}
      allCategories={allCategories as any}
      allSubjects={allSubjects as any}
    />
  );
};

export default Chat;
