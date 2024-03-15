import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { galleryId: string } }
) {
  try {
    if (!params.galleryId) {
      return new NextResponse("Gallery id is required", { status: 400 });
    }

    const gallery = await prismadb.gallery.findUnique({
      where: {
        id: params.galleryId,
      },
      include: {
        images: true,
        category: true,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.log("GALLERY_GET", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { portfolioId: string; galleryId: string } }
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
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!title) {
      return new NextResponse("Title is required", { status: 400 });
    }
    if (!featImage) {
      return new NextResponse("Featured image is required", { status: 400 });
    }
    if (!images || !images.length) {
      return new NextResponse("Gallerie images are required", { status: 400 });
    }
    if (!categoryId) {
      return new NextResponse("Category id is required", { status: 400 });
    }

    if (!params.galleryId) {
      return new NextResponse("Gallery id is required", { status: 400 });
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

    await prismadb.gallery.update({
      where: {
        id: params.galleryId,
      },
      data: {
        title,
        location,
        specs,
        featImage,
        images: {
          deleteMany: {},
        },
        categoryId,
        isFeatured,
        isArchived,
        gallerySlug,
      },
    });

    const gallery = await prismadb.gallery.update({
      where: {
        id: params.galleryId,
      },
      data: {
        images: {
          createMany: {
            data: [...images.map((image: { url: string }) => image)],
          },
        },
        gallerySlug,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.log("GALLERY_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { galleryId: string; portfolioId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }
    if (!params.galleryId) {
      return new NextResponse("GAllery id is required", { status: 400 });
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

    const gallery = await prismadb.gallery.deleteMany({
      where: {
        id: params.galleryId,
      },
    });

    return NextResponse.json(gallery);
  } catch (error) {
    console.log("GALLERY_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
