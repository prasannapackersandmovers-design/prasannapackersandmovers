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

function serialize(
  id: string,
  data: FirebaseFirestore.DocumentData,
) {
  return {
    id,
    ...data,
    createdAt:
      data.createdAt?.toDate?.()?.toISOString() ??
      data.createdAt ??
      null,
    updatedAt:
      data.updatedAt?.toDate?.()?.toISOString() ??
      data.updatedAt ??
      null,
  };
}

export async function GET(
  request: Request,
) {
  try {
    await requireAdmin(request);

    const snapshot =
      await adminDb
        .collection("customers")
        .orderBy(
          "createdAt",
          "desc",
        )
        .limit(200)
        .get();

    return NextResponse.json({
      success: true,
      customers:
        snapshot.docs.map((doc) =>
          serialize(
            doc.id,
            doc.data(),
          ),
        ),
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}

export async function POST(
  request: Request,
) {
  try {
    await requireAdmin(request);

    const body = await request.json();

    const result =
      customerSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid customer information.",
          errors:
            result.error.flatten()
              .fieldErrors,
        },
        { status: 400 },
      );
    }

    const ref =
      adminDb
        .collection("customers")
        .doc();

    const now =
      FieldValue.serverTimestamp();

    await ref.set({
      ...result.data,
      createdAt: now,
      updatedAt: now,
    });

    return NextResponse.json(
      {
        success: true,
        customerId: ref.id,
      },
      { status: 201 },
    );
  } catch (error) {
    return authErrorResponse(error);
  }
}
