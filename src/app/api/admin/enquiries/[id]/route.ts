import { NextResponse } from "next/server";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  _request: Request,
  { params }: RouteContext,
) {
  const { id } = await params;

  return NextResponse.json({
    success: true,
    message: "Admin enquiry details API is ready.",
    id,
  });
}

export async function PATCH(
  _request: Request,
  { params }: RouteContext,
) {
  const { id } = await params;

  return NextResponse.json(
    {
      success: false,
      message: "Enquiry updates will be implemented with Firebase.",
      id,
    },
    { status: 501 },
  );
}