import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Portfolio name is required", { status: 400 });
    }

    const portfolio = await prismadb.portfolio.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(portfolio);
  } catch (error) {
    console.log("PORTFOLIO_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
