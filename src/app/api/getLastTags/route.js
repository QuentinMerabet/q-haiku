import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request) {
  try {
    const tags = await prisma.tag.findMany({
      orderBy: { id: "desc" },
      take: 3,
    });
    return NextResponse.json(
      { tags },
      {
        headers: {
          "Cache-Control": "no-store",
        },
      }
    );
  } catch (err) {
    console.error(err);
  }
}
