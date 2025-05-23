import { createOpenAI } from "@ai-sdk/openai";
import { frontendTools } from "@assistant-ui/react-ai-sdk";
import { streamText } from "ai";

export const runtime = "edge";
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, system, tools } = await req.json();
  const openai = createOpenAI({
    baseURL: "https://api.chatanywhere.tech/v1",
    apiKey: process.env.OPENAI_API_KEY,

  });
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages,
    toolCallStreaming: true,
    system,
    tools: {
      ...frontendTools(tools),
      // add backend tools here
    },
  });

  return result.toDataStreamResponse();
}
