import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import prisma from "@/lib/prisma";

export async function GET(request) {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Get the last 5 tags and format them for the prompt
  const { tags } = await fetch(`${process.env.DOMAIN}/api/getLastTags`).then(
    (r) => r.json()
  );
  const promptTags = tags.map((tag) => `${tag.name}`).join(", ");

  // Generate the haiku
  const responseOpenAI = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: "Your a fun and poetic haiku writer.",
      },
      {
        role: "user",
        content: `A haiku is a short, unrhymed poem that adheres to a specific three-line, seventeen-syllable format. Write only 1 haiku including the following topics: ${promptTags}.`,
      },
    ],
    max_tokens: 50,
  });

  // Remove the first line breaks
  let haiku = responseOpenAI.data.choices[0].message.content;
  // Add a dot if needed
  if (haiku.charAt(haiku.length - 1) !== ".") {
    haiku += ".";
  }

  await prisma.haiku.create({
    data: {
      text: haiku,
    },
  });

  return NextResponse.json({ haiku, tags });
}
