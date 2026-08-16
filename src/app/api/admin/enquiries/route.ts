import {
  NextResponse,
} from "next/server";

import {
  FieldValue,
} from "firebase-admin/firestore";

import {
  getAdminDb,
} from "@/lib/firebase/admin";

import {
  authErrorResponse,
  requireAdmin,
} from "@/lib/admin-auth";

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

    contactedAt:
      data.contactedAt
        ?.toDate?.()
        ?.toISOString() ??
      data.contactedAt ??
      null,
  };
}

/**
 * GET /api/admin/enquiries
 */
export async function GET(
  request: Request,
) {
  try {
    await requireAdmin(
      request,
    );

    const db =
      getAdminDb();

    const snapshot =
      await db
        .collection("enquiries")
        .orderBy(
          "createdAt",
          "desc",
        )
        .limit(200)
        .get();

    const enquiries =
      snapshot.docs.map(
        (doc) =>
          serialize(
            doc.id,
            doc.data(),
          ),
      );

    return NextResponse.json(
      {
        success: true,
        enquiries,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/enquiries error:",
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
          "Unable to load enquiries.",
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

/**
 * POST /api/admin/enquiries
 */
export async function POST(
  request: Request,
) {
  try {
    await requireAdmin(
      request,
    );

    let body: Record<
      string,
      unknown
    >;

    try {
      body =
        await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid JSON request.",
        },
        {
          status: 400,
        },
      );
    }

    const fullName =
      String(
        body.fullName ?? "",
      ).trim();

    const phone =
      String(
        body.phone ?? "",
      ).trim();

    const email =
      String(
        body.email ?? "",
      ).trim();

    const serviceType =
      String(
        body.serviceType ?? "",
      ).trim();

    const pickupLocation =
      String(
        body.pickupLocation ?? "",
      ).trim();

    const dropLocation =
      String(
        body.dropLocation ?? "",
      ).trim();

    const movingDate =
      String(
        body.movingDate ?? "",
      ).trim();

    const additionalRequirements =
      String(
        body.additionalRequirements ??
          "",
      ).trim();

    if (
      !fullName ||
      !phone ||
      !serviceType ||
      !pickupLocation ||
      !dropLocation ||
      !movingDate
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Required enquiry fields are missing.",
        },
        {
          status: 400,
        },
      );
    }

    const db =
      getAdminDb();

    const enquiryRef =
      db
        .collection("enquiries")
        .doc();

    const now =
      FieldValue.serverTimestamp();

    await enquiryRef.set({
      customerId:
        String(
          body.customerId ?? "",
        ),

      fullName,

      phone,

      email,

      serviceType,

      pickupLocation,

      dropLocation,

      movingDate,

      additionalRequirements,

      status:
        "NEW",

      source:
        "ADMIN",

      assignedTo:
        "",

      adminNotes:
        "",

      createdAt:
        now,

      updatedAt:
        now,
    });

    return NextResponse.json(
      {
        success: true,

        message:
          "Enquiry created successfully.",

        enquiryId:
          enquiryRef.id,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    console.error(
      "POST /api/admin/enquiries error:",
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
          "Unable to create enquiry.",
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