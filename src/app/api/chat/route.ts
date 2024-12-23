import { generatePrompt } from "@/lib/chat/openAI/promptGenerator";
import { setUserChat } from "@/lib/chat/setUserChat";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, professionId } = await req.json();

  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
  });

  return result.toDataStreamResponse();
}
