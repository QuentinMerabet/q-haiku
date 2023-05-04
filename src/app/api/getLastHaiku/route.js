import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const haiku = await prisma.haiku.findFirst({
      orderBy: { id: "desc" },
    });

    return NextResponse.json({ haiku });
  } catch (err) {
    console.error(err);
  }
}
