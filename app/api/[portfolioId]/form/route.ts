import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  req: Request,
  {
    params,
  }: {
    params: {
      name: string;
      email: string;
      phone: string;
      message: string;
      date: string;
      time: string;
    };
  }
) {
  try {
    const body = await req.json();

    const {
      name,
      email,
      message = "",
      phone,
      date = "No date provided",
      time = "No time provided",
    } = body;

    const contact = await prismadb.contact.create({
      data: {
        name,
        email,
        message,
        phone,
        date,
        time,
      },
    });

    return NextResponse.json({ contact }, { headers: corsHeaders });
  } catch (error) {
    console.log("CONTACT_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
