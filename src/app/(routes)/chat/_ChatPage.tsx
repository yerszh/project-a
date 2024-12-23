"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SelectProfession from "./_components/SelectProfession";
import { setUserChat } from "@/lib/chat/setUserChat";
import { UserProfessions } from "@prisma/client";
import { useChat } from "ai/react";
import ChatHistory from "./_components/ChatHistory";
import ChatHelp from "./_components/ChatHelp";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setChatMessages } from "@/lib/chat/setChatMessages";

interface ChatPageProps {
  userProfessions?: UserProfessions[];
  userChats?: {
    chat_id: string;
    chat_title: string;
  }[];
}

const ChatPage = ({ userProfessions, userChats }: ChatPageProps) => {
  const [currentChatId, setCurrentChatId] = useState("");

  const [selectedProfession, setSelectedProfession] =
    useState<UserProfessions | null>(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { messages, input, setInput, handleSubmit, handleInputChange } =
    useChat({
      onFinish: (message) => {
        const assistantMessage = message.content;

        if (currentChatId === "" && selectedProfession?.occupation_id) {
          setUserChat(
            selectedProfession?.occupation_id,
            selectedProfession?.name
          ).then((chatId) => {
            if (chatId) {
              setCurrentChatId(chatId);
              setChatMessages(chatId, input, assistantMessage);
            }
          });
        } else {
          if (currentChatId) {
            setChatMessages(currentChatId, input, assistantMessage);
          }
        }
      },
    });

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleProfessionSelect = (profession: UserProfessions) => {
    setSelectedProfession(profession);
    setInput(profession.name);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget as HTMLTextAreaElement;
    target.style.height = "20px";
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    handleSubmit(event, {
      body: {
        professionId: selectedProfession?.occupation_id,
      },
    });

    if (textareaRef.current) {
      textareaRef.current.style.height = "20px";
    }
  };

  return (
    <div className="relative h-full w-full flex-1 flex flex-col ">
      <div className="w-full flex justify-between px-4 my-8">
        <Link href="/result">
          <Image
            src="/icons/arrow-back.svg"
            alt={"arrow-back"}
            height={24}
            width={24}
          />
        </Link>

        <div className="flex gap-1 items-center">
          <h1 className="text-sm text-[#171A1D] font-bold">
            Smart Bolashaq AI chat
          </h1>
        </div>

        <ChatHistory userChats={userChats} />
      </div>

      {messages.length !== 0 ? (
        <ScrollArea ref={scrollAreaRef} className="flex-1 px-4 flex gap-2">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`whitespace-pre-wrap text-sm font-normal items-start mb-8 ${
                m.role === "user"
                  ? "bg-[#F5F5F5] rounded-lg p-3 ml-20"
                  : "flex gap-2"
              }`}
            >
              {m.role === "user" ? (
                ""
              ) : (
                <Image
                  src="/icons/ai-icon.svg"
                  alt={"ai-icon"}
                  height={24}
                  width={24}
                />
              )}
              {m.content}
            </div>
          ))}
        </ScrollArea>
      ) : (
        <div className=" flex-1 px-4 flex flex-col items-center h-full">
          <ChatHelp />
          <SelectProfession
            userProfessions={userProfessions}
            onSelectProfession={handleProfessionSelect}
          />
        </div>
      )}

      <div className="px-4 mb-4">
        <form
          onSubmit={handleFormSubmit}
          // action={
          //   selectedProfession
          //     ? setUserChat.bind(null, selectedProfession)
          //     : undefined
          // }
          onKeyDown={handleKeyDown}
          className="bg-[#F5F5F5] flex w-full items-center rounded-3xl p-1.5 "
        >
          <Textarea
            ref={textareaRef}
            className="mx-3"
            placeholder="Сообщение"
            value={input}
            // value={selectedProfession?.name || ""}
            onInput={handleInput}
            onChange={handleInputChange}
          />
          <div className="w-7 h-7">
            <Button
              type="submit"
              variant={"icon"}
              size={"icon"}
              // disabled={!selectedProfession}
              className={`${
                selectedProfession ? "bg-[#009688]" : "bg-[#BDBDBD]"
              } cursor-${
                selectedProfession ? "pointer" : "not-allowed"
              } w-7 h-7 rounded-full flex justify-center items-center`}
            >
              <Image
                className=""
                src="/icons/send-message-arrow.svg"
                alt={"send-message-arrow"}
                height={11}
                width={11}
              />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
