import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.portfolioId) {
      return new NextResponse("Portfolio id is required", { status: 400 });
    }
    const portfolio = await prismadb.portfolio.updateMany({
      where: {
        id: params.portfolioId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(portfolio);
  } catch (error) {
    console.log("PORTFOLIO_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.portfolioId) {
      return new NextResponse("Portfolio id is required", { status: 400 });
    }
    const portfolio = await prismadb.portfolio.deleteMany({
      where: {
        id: params.portfolioId,
        userId,
      },
    });
    return NextResponse.json(portfolio);
  } catch (error) {
    console.log("PORTFOLIO_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
