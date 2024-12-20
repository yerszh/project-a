import { generatePrompt } from "@/lib/chat/promptGenerator";
import { NextRequest, NextResponse } from "next/server";

import OpenAI from "openai";

export async function POST(request: NextRequest) {
  const { text, code } = await request.json();

  // Generate the prompt using the provided code
  const promptText = await generatePrompt(code);

  // Initialize OpenAI client
  const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    // Optionally, set the default organization
    organization: process.env.OPENAI_ORGANIZATION,
  });

  // Prepare the conversation
  const messages = [
    { role: "system", content: promptText },
    { role: "user", content: text },
  ];

  // Call the OpenAI Chat API
  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini", // or 'gpt-4' if you have access
    messages: messages,
  });

  // Extract the assistant's response
  const assistantResponse = completion.choices[0].message.content;

  // Return the response to the client
  return NextResponse.json({ response: assistantResponse });
}
