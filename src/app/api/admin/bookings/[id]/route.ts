import { NextResponse } from "next/server";
import {
  FieldValue,
} from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase/admin";

import {
  authErrorResponse,
  requireAdmin,
} from "@/lib/admin-auth";

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
        .collection("bookings")
        .doc(id)
        .get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found.",
        },
        { status: 404 },
      );
    }

    const data = doc.data()!;

    return NextResponse.json({
      success: true,
      booking: {
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

    const allowedFields = [
      "bookingStatus",
      "paymentStatus",
      "finalPrice",
      "vehicleId",
      "assignedStaffId",
      "specialInstructions",
    ];

    const updateData: Record<
      string,
      unknown
    > = {};

    for (const field of allowedFields) {
      if (
        Object.prototype.hasOwnProperty.call(
          body,
          field,
        )
      ) {
        updateData[field] =
          body[field];
      }
    }

    updateData.updatedAt =
      FieldValue.serverTimestamp();

    await adminDb
      .collection("bookings")
      .doc(id)
      .update(updateData);

    return NextResponse.json({
      success: true,
      message:
        "Booking updated successfully.",
    });
  } catch (error) {
    return authErrorResponse(error);
  }
}