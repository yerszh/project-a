"use client";

import React, { useState, useEffect, useRef } from "react";
import { useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";

const ChatPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  const [messages, setMessages] = useState<
    { sender: "user" | "assistant"; content: string }[]
  >([]);
  const [inputText, setInputText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  if (!code) {
    return <div>Error: Code parameter is missing in the URL.</div>;
  }

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = inputText.trim();
    setMessages((prev) => [...prev, { sender: "user", content: userMessage }]);
    setInputText("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userMessage, code }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      const assistantMessage = data.response;

      setMessages((prev) => [
        ...prev,
        { sender: "assistant", content: assistantMessage },
      ]);
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: "assistant", content: "Sorry, an error occurred." },
      ]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !isLoading) {
      sendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Basic styles
  const containerStyle = {
    display: "flex",
    flexDirection: "column" as "column",
    height: "100vh",
    maxWidth: "800px",
    margin: "0 auto",
  };

  const headerStyle = {
    padding: "1rem",
    backgroundColor: "#00aaff",
    color: "#fff",
    textAlign: "center" as "center",
    fontSize: "1.5rem",
  };

  const chatWindowStyle = {
    flexGrow: 1,
    padding: "1rem",
    overflowY: "auto" as "auto",
    backgroundColor: "#f2f2f2",
  };

  const messageStyle = {
    marginBottom: "1rem",
    padding: "0.5rem 1rem",
    borderRadius: "10px",
    maxWidth: "80%",
    wordWrap: "break-word" as "break-word",
  };

  const userMessageStyle = {
    ...messageStyle,
    backgroundColor: "#0084ff",
    color: "#fff",
    alignSelf: "flex-end" as "flex-end",
  };

  const assistantMessageStyle = {
    ...messageStyle,
    backgroundColor: "#e5e5ea",
    color: "#000",
    alignSelf: "flex-start" as "flex-start",
  };

  const inputAreaStyle = {
    display: "flex",
    padding: "1rem",
    backgroundColor: "#fff",
    borderTop: "1px solid #ccc",
  };

  const inputStyle = {
    flexGrow: 1,
    padding: "0.5rem",
    fontSize: "1rem",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const buttonStyle = {
    marginLeft: "0.5rem",
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#00aaff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>Chat Interface</div>
      <div style={chatWindowStyle}>
        {messages.map((message, index) => (
          <div
            key={index}
            style={
              message.sender === "user"
                ? userMessageStyle
                : assistantMessageStyle
            }
          >
            {/* Use ReactMarkdown to render rich text */}
            <ReactMarkdown>{message.content}</ReactMarkdown>
          </div>
        ))}
        {isLoading && (
          <div style={assistantMessageStyle}>
            <p>Loading...</p>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div style={inputAreaStyle}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleInputKeyDown}
          disabled={isLoading}
          style={inputStyle}
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          disabled={!inputText.trim() || isLoading}
          style={buttonStyle}
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
