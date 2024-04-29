import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { portfolioId: string; formId: string } }
) {
  try {
    const portfolioByUserId = await prismadb.portfolio.findFirst({
      where: {
        id: params.portfolioId,
      },
    });

    if (!portfolioByUserId) {
      return new NextResponse("Not allowed", { status: 403 });
    }

    const CONTACT = await prismadb.contact.findUnique({
      where: {
        id: parseInt(params.formId),
      },
    });

    await prismadb.contact.update({
      where: { id: parseInt(params.formId) },
      data: { IsViewed: false },
    });

    return NextResponse.json(CONTACT);
  } catch (error) {
    console.log("CONTACT_PATCH", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { portfolioId: string; formId: string } }
) {
  try {
    const portfolioByUserId = await prismadb.portfolio.findFirst({
      where: {
        id: params.portfolioId,
      },
    });

    if (!portfolioByUserId) {
      return new NextResponse("Not allowed", { status: 403 });
    }

    const contact = await prismadb.contact.deleteMany({
      where: {
        id: parseInt(params.formId),
      },
    });

    return NextResponse.json(contact);
  } catch (error) {
    console.log("CONTACT_DELETE", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
