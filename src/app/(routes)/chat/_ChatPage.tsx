"use client";

import React, { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { setUserChat } from "@/lib/chat/setUserChat";
import { useChat } from "ai/react";
import ChatHistory from "./_components/ChatHistory";
import ChatHelp from "./_components/ChatHelp";
import { ScrollArea } from "@/components/ui/scroll-area";
import { setChatMessages } from "@/lib/chat/setChatMessages";
import { useLocale, useTranslations } from "next-intl";
import ChatSelection from "./_components/ChatSelection";

interface Profession {
  occupation_id: string;
  name: string;
  name_ru: string;
  name_kz: string;
  percent: number;
}
interface Job {
  job_id: string;
  name: string;
  name_kz: string;
  name_ru: string;
  category_id: string;
}

interface Category {
  id: string;
  name: string;
  name_ru: string;
  name_kz: string;
}

interface Subject {
  subjects: string;
}

interface ChatPageProps {
  userProfessions?: Profession[];
  userChats?: {
    chat_id: string;
    chat_title: string;
  }[];
  allJobs: Job[];
  allCategories: Category[];
  allSubjects: Subject[];
}

const ChatPage = ({
  userProfessions,
  userChats,
  allJobs,
  allCategories,
  allSubjects,
}: ChatPageProps) => {
  const t = useTranslations("ChatPage");
  const locale = useLocale();
  const [currentChatId, setCurrentChatId] = useState("");
  const [copied, setCopied] = useState(false);
  const [isMessageFinish, setIsMessageFinish] = useState(false);
  const [selectedProfession, setSelectedProfession] = useState<
    Profession | Job | null
  >(null);

  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const {
    messages,
    setMessages,
    input,
    setInput,
    handleSubmit,
    handleInputChange,
  } = useChat({
    onFinish: (message) => {
      setIsMessageFinish(true);

      const assistantMessage = message.content;
      if (currentChatId === "" && selectedProfession) {
        const profId =
          selectedProfession && "occupation_id" in selectedProfession
            ? selectedProfession.occupation_id
            : selectedProfession?.job_id;

        setUserChat(
          profId,
          locale === "kz"
            ? selectedProfession.name_kz
            : selectedProfession.name_ru
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
  }, [messages, isMessageFinish]);

  const handleCopy = () => {
    if (messages.length > 0) {
      const lastMessage = messages[messages.length - 1].content;
      navigator.clipboard.writeText(lastMessage).then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      });
    }
  };

  const handleInput = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const target = e.currentTarget as HTMLTextAreaElement;
    target.style.height = "20px";
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleProfessionSelect = (profession: Profession | Job) => {
    setSelectedProfession(profession);
    setInput(locale === "kz" ? profession.name_kz : profession.name_ru);
  };

  useEffect(() => {
    if (selectedProfession) {
      if (formRef.current) {
        const formEvent = {
          preventDefault: () => {},
          stopPropagation: () => {},
        } as React.FormEvent;

        submitForm(formEvent);
      }
    }
  }, [selectedProfession]);

  const submitForm = (event: React.FormEvent | React.KeyboardEvent) => {
    const profId =
      selectedProfession && "occupation_id" in selectedProfession
        ? selectedProfession.occupation_id
        : selectedProfession?.job_id;

    setIsMessageFinish(false);
    handleSubmit(event, {
      body: {
        professionId: profId,
      },
    });

    if (textareaRef.current) {
      textareaRef.current.style.height = "20px";
    }
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    submitForm(event);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitForm(e);
    }
  };

  const resetState = () => {
    setSelectedProfession(null);
    setCurrentChatId("");
    setInput("");
    setIsMessageFinish(false);
    setMessages([]);
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
          {messages.map((m, index) => (
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
              <div>
                <ReactMarkdown>{m.content}</ReactMarkdown>
                {m.role !== "user" &&
                  index === messages.length - 1 &&
                  isMessageFinish && (
                    <div className="flex gap-2 mt-3">
                      <Button
                        variant={"outline"}
                        onClick={handleCopy}
                        className="!bg-[#fff] h-9 rounded-[20px] !py-3 px-4 font-semibold text-[11px]"
                      >
                        {copied ? (
                          <Image
                            src="/icons/message-copied.svg"
                            alt="copy"
                            height={12}
                            width={12}
                          />
                        ) : (
                          <Image
                            src="/icons/message-copy.svg"
                            alt="copied"
                            height={12}
                            width={12}
                          />
                        )}
                        {t("copyButton")}
                      </Button>

                      <Button
                        onClick={resetState}
                        variant={"outline"}
                        className="!bg-[#fff] h-9 rounded-[20px] !py-3 px-4 font-semibold text-[11px]"
                      >
                        <Image
                          src="/icons/message-search.svg"
                          alt="copy"
                          height={12}
                          width={12}
                        />
                        {t("discussAnotherProfession")}
                      </Button>
                    </div>
                  )}
              </div>
            </div>
          ))}
        </ScrollArea>
      ) : (
        <div className=" flex-1 px-4 flex flex-col items-center h-full">
          <ChatHelp />
          <ChatSelection
            userProfessions={userProfessions}
            onSelectProfession={handleProfessionSelect}
            allJobs={allJobs}
            allCategories={allCategories}
            allSubjects={allSubjects}
          />
        </div>
      )}

      <div className="px-4 mb-4">
        <form
          ref={formRef}
          onSubmit={handleFormSubmit}
          onKeyDown={handleKeyDown}
          className="bg-[#F5F5F5] flex w-full items-center rounded-3xl p-1.5 "
        >
          <Textarea
            ref={textareaRef}
            className="mx-3"
            placeholder={
              messages.length === 0 ? t("textareaSelect") : t("textareaMessage")
            }
            readOnly={messages.length === 0}
            value={input}
            onInput={handleInput}
            onChange={handleInputChange}
          />
          <div className="w-7 h-7">
            {messages.length !== 0 && (
              <Button
                type="submit"
                variant={"icon"}
                size={"icon"}
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
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChatPage;
