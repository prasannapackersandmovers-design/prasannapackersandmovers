import { NextResponse } from "next/server";
import {
  FieldValue,
} from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase/admin";

import {
  authErrorResponse,
  requireAdmin,
} from "@/lib/admin-auth";

import {
  customerSchema,
} from "@/lib/validations";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(
  request: Request,
  context: RouteContext,
) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    const doc =
      await adminDb
        .collection("customers")
        .doc(id)
        .get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Customer not found.",
        },
        { status: 404 },
      );
    }

    const data = doc.data()!;

    return NextResponse.json({
      success: true,
      customer: {
        id: doc.id,
        ...data,
        createdAt:
          data.createdAt
            ?.toDate?.()
            ?.toISOString() ??
          null,
        updatedAt:
          data.updatedAt
            ?.toDate?.()
            ?.toISOString() ??
          null,
      },
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  try {
    await requireAdmin(request);

    const { id } = await context.params;

    const body = await request.json();

    const result =
      customerSchema.partial().safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid customer update.",
        },
        { status: 400 },
      );
    }

    await adminDb
      .collection("customers")
      .doc(id)
      .update({
        ...result.data,
        updatedAt:
          FieldValue.serverTimestamp(),
      });

    return NextResponse.json({
      success: true,
      message:
        "Customer updated successfully.",
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}