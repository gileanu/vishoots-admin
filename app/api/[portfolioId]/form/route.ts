import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { portfolioId: string; categorySlug: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, categorySlug, imageUrl, categoryDesc } = body;

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.portfolioId) {
      return new NextResponse("Portfolio Id name is required", {
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

    const category = await prismadb.category.create({
      data: {
        name,
        categorySlug,
        imageUrl,
        categoryDesc,
        portfolioId: params.portfolioId,
      },
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("CATEGORY_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { portfolioId: string; categorySlug: string } }
) {
  try {
    if (!params.portfolioId) {
      return new NextResponse("Portfolio id name is required", {
        status: 400,
      });
    }

    const categories = await prismadb.category.findMany({
      where: {
        portfolioId: params.portfolioId,
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.log("CATEGORY_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
