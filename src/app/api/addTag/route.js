import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import prisma from "@/lib/prisma";

const domain = process.env.DOMAIN;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  // Making sure the word is valid
  if (!name || name.length > 10 || !/^[a-zA-ZÀ-ÖØ-öø-ÿ]+$/.test(name)) {
    return NextResponse.error(new Error("Invalid word"));
  }
  // Capitalizing the first letter and lowercasing the rest
  const formattedName =
    name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();

  try {
    const tag = await prisma.tag.create({
      data: {
        name: formattedName,
      },
    });
    const { haiku, tags } = await generateHaiku();
    return NextResponse.json({ haiku, tags, tag });
  } catch (err) {
    console.error(err);
  }
}

async function generateHaiku() {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  // Get the last 5 tags and format them for the prompt
  const { tags } = await fetch(`${domain}/api/getLastTags`).then((r) =>
    r.json()
  );
  const promptTags = tags.map((tag) => `${tag.name}`).join(", ");

  // Generate the haiku
  const responseOpenAI = await openai.createChatCompletion({
    model: "gpt-3.5-turbo-0301",
    messages: [
      {
        role: "system",
        content: "Your a genZ haiku writer.",
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

  return { haiku, tags };
}
