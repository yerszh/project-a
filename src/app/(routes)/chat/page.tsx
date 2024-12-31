import React from "react";
import ChatPage from "./_ChatPage";
import { getLastUserResult } from "@/lib/result/getLastUserResult";
import { getUsesAllChat } from "@/lib/chat/getUsesAllChat";
import { getJobs } from "@/lib/methodic-data/getJobs";

const Chat: React.FC = async () => {
  const userResult = await getLastUserResult();
  const userChats = await getUsesAllChat();
  const allJobs = await getJobs();
  console.log(allJobs);
  return (
    <ChatPage
      userChats={userChats as any}
      userProfessions={userResult?.UserProfessions as any}
      allJobs={allJobs as any}
    />
  );
};

export default Chat;
