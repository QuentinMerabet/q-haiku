import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  console.log(request.headers.get("Cache-Control")); // no-cache
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { id: "desc" },
      take: 3,
    });
    const response = NextResponse.json({ tags });
    //response.headers.set("Cache-Control", "no-cache");
    return response;
  } catch (err) {
    console.error(err);
  }
}
