import { generatePrompt } from "@/lib/chat/openAI/promptGenerator";
import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, professionId } = await req.json();
  const generatedPrompt = await generatePrompt(professionId);

  // messages.unshift({"role":"system", "content": ge})
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    system: generatedPrompt,
  });

  return result.toDataStreamResponse();
}
