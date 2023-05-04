import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";
import prisma from "@/lib/prisma";

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
    const { haiku, tags } = await fetch(
      `${request.nextUrl.origin}/api/generateHaiku`
    ).then((r) => r.json());
    return NextResponse.json({ haiku, tags, tag });
  } catch (err) {
    console.error(err);
  }
}
