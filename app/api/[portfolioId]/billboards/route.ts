import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }
    if (!label) {
      return new NextResponse("Label name is required", { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse("Image URL name is required", {
        status: 400,
      });
    }

    if (!params.portfolioId) {
      return new NextResponse("Portfolio id name is required", {
        status: 400,
      });
    }

    const portfolioByUserId = await prismadb.portfolio.findFirst({
      where: {
        id: params.portfolioId,
        userId,
      },
    });

    if (!portfolioByUserId) {
      return new NextResponse("Not allowed", { status: 403 });
    }

    const billboard = await prismadb.billboard.create({
      data: {
        label,
        imageUrl,
        portfolioId: params.portfolioId,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.log("BILLBOARDS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { portfolioId: string } }
) {
  try {
    if (!params.portfolioId) {
      return new NextResponse("Portfolio id name is required", {
        status: 400,
      });
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        portfolioId: params.portfolioId,
      },
    });

    return NextResponse.json(billboards);
  } catch (error) {
    console.log("BILLBOARDS_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
