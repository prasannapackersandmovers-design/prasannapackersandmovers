import {
  NextResponse,
} from "next/server";

import {
  FieldValue,
} from "firebase-admin/firestore";

import {
  adminDb,
} from "@/lib/firebase/admin";

import {
  authErrorResponse,
  requireAdmin,
} from "@/lib/admin-auth";

import {
  bookingSchema,
} from "@/lib/validations";

import {
  generateBookingReference,
} from "@/lib/utils";

export const runtime = "nodejs";
export const dynamic =
  "force-dynamic";

function serialize(
  id: string,
  data: FirebaseFirestore.DocumentData,
) {
  return {
    id,

    ...data,

    createdAt:
      data.createdAt
        ?.toDate?.()
        ?.toISOString() ??
      data.createdAt ??
      null,

    updatedAt:
      data.updatedAt
        ?.toDate?.()
        ?.toISOString() ??
      data.updatedAt ??
      null,
  };
}

export async function GET(
  request: Request,
) {
  try {
    await requireAdmin(
      request,
    );

    const snapshot =
      await adminDb
        .collection("bookings")
        .orderBy(
          "createdAt",
          "desc",
        )
        .limit(200)
        .get();

    return NextResponse.json(
      {
        success: true,

        bookings:
          snapshot.docs.map(
            (doc) =>
              serialize(
                doc.id,
                doc.data(),
              ),
          ),
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/bookings error:",
      error,
    );

    if (
      error instanceof Error &&
      (
        error.message ===
          "UNAUTHORIZED" ||
        error.message ===
          "FORBIDDEN"
      )
    ) {
      return authErrorResponse(
        error,
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load bookings.",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(
  request: Request,
) {
  try {
    await requireAdmin(
      request,
    );

    const body =
      await request.json();

    const result =
      bookingSchema.safeParse(
        body,
      );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid booking information.",
          errors:
            result.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const ref =
      adminDb
        .collection("bookings")
        .doc();

    const now =
      FieldValue.serverTimestamp();

    await ref.set({
      bookingReference:
        generateBookingReference(),

      ...result.data,

      enquiryId:
        result.data.enquiryId ||
        "",

      finalPrice:
        result.data.finalPrice ??
        null,

      createdAt:
        now,

      updatedAt:
        now,
    });

    if (
      result.data.enquiryId
    ) {
      await adminDb
        .collection("enquiries")
        .doc(
          result.data.enquiryId,
        )
        .update({
          status:
            "CONVERTED",

          updatedAt:
            now,
        });
    }

    return NextResponse.json(
      {
        success: true,
        bookingId:
          ref.id,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "POST /api/admin/bookings error:",
      error,
    );

    if (
      error instanceof Error &&
      (
        error.message ===
          "UNAUTHORIZED" ||
        error.message ===
          "FORBIDDEN"
      )
    ) {
      return authErrorResponse(
        error,
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create booking.",
        error:
          error instanceof Error
            ? error.message
            : String(error),
      },
      {
        status: 500,
      },
    );
  }
}