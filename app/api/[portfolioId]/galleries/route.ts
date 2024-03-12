import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { portfolioId: string; gallerySlug: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const {
      title,
      location,
      specs,
      featImage,
      images,
      categoryId,
      isFeatured,
      isArchived,
      gallerySlug,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthorised", { status: 401 });
    }
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }
    if (!featImage) {
      return new NextResponse("Featured image url is required", {
        status: 400,
      });
    }
    if (!images || !images.length) {
      return new NextResponse("Gallery images are required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
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

    const gallery = await prismadb.gallery.create({
      data: {
        title,
        gallerySlug,
        location,
        specs,
        featImage,
        categoryId,
        isFeatured,
        isArchived,
        portfolioId: params.portfolioId,
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.log("GALLERY_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { portfolioId: string; gallerySlug: string } }
) {
  try {
    const { searchParams } = new URL(req.url);
    const categoryId = searchParams.get("categoryId") || undefined;
    const isFeatured = searchParams.get("isFeatured");
    if (!params.portfolioId) {
      return new NextResponse("Portfolio id is required", {
        status: 400,
      });
    }

    const gallery = await prismadb.gallery.findMany({
      where: {
        portfolioId: params.portfolioId,
        categoryId,
        isFeatured: isFeatured ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        category: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.log("GALLERY_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
