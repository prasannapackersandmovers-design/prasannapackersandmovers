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

import {
  enquiryUpdateSchema,
} from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic =
  "force-dynamic";

interface RouteContext {
  params: Promise<{
    id: string;
  }>;
}

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
 * GET /api/admin/enquiries/[id]
 */
export async function GET(
  request: Request,
  context: RouteContext,
) {
  try {
    await requireAdmin(
      request,
    );

    const { id } =
      await context.params;

    const db =
      getAdminDb();

    const doc =
      await db
        .collection("enquiries")
        .doc(id)
        .get();

    if (!doc.exists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Enquiry not found.",
        },
        {
          status: 404,
        },
      );
    }

    return NextResponse.json(
      {
        success: true,

        enquiry:
          serialize(
            doc.id,
            doc.data() ?? {},
          ),
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/enquiries/[id] error:",
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
          "Unable to load enquiry.",
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
 * PATCH /api/admin/enquiries/[id]
 */
export async function PATCH(
  request: Request,
  context: RouteContext,
) {
  try {
    await requireAdmin(
      request,
    );

    const { id } =
      await context.params;

    let body: unknown;

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

    const result =
      enquiryUpdateSchema.safeParse(
        body,
      );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid enquiry update.",
          errors:
            result.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const updateData: Record<
      string,
      unknown
    > = {
      updatedAt:
        FieldValue.serverTimestamp(),
    };

    if (
      result.data.status !==
      undefined
    ) {
      updateData.status =
        result.data.status;
    }

    if (
      result.data.adminNotes !==
      undefined
    ) {
      updateData.adminNotes =
        result.data.adminNotes;
    }

    if (
      result.data.assignedTo !==
      undefined
    ) {
      updateData.assignedTo =
        result.data.assignedTo;
    }

    const db =
      getAdminDb();

    const ref =
      db
        .collection("enquiries")
        .doc(id);

    const existing =
      await ref.get();

    if (!existing.exists) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Enquiry not found.",
        },
        {
          status: 404,
        },
      );
    }

    await ref.update(
      updateData,
    );

    return NextResponse.json(
      {
        success: true,
        message:
          "Enquiry updated successfully.",
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "PATCH /api/admin/enquiries/[id] error:",
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
          "Unable to update enquiry.",
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