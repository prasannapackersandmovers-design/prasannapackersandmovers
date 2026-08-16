import { NextResponse } from "next/server";
import {
  FieldValue,
} from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase/admin";

import {
  authErrorResponse,
  requireAdmin,
} from "@/lib/admin-auth";

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

    contactedAt:
      data.contactedAt?.toDate?.()?.toISOString() ??
      data.contactedAt ??
      null,
  };
}

/**
 * GET /api/admin/enquiries
 *
 * Returns the latest enquiries for the admin dashboard.
 */
export async function GET(
  request: Request,
) {
  try {
    await requireAdmin(request);

    const snapshot =
      await adminDb
        .collection("enquiries")
        .orderBy(
          "createdAt",
          "desc",
        )
        .limit(200)
        .get();

    const enquiries =
      snapshot.docs.map((doc) =>
        serialize(
          doc.id,
          doc.data(),
        ),
      );

    return NextResponse.json({
      success: true,
      enquiries,
    });
  } catch (error) {
    console.error(
      "GET /api/admin/enquiries error:",
      error,
    );

    return authErrorResponse(error);
  }
}

/**
 * POST /api/admin/enquiries
 *
 * Allows an admin to manually create an enquiry.
 */
export async function POST(
  request: Request,
) {
  try {
    await requireAdmin(request);

    const body =
      await request.json();

    const {
      fullName,
      phone,
      email,
      serviceType,
      pickupLocation,
      dropLocation,
      movingDate,
      additionalRequirements,
      customerId,
    } = body;

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

    const enquiryRef =
      adminDb
        .collection("enquiries")
        .doc();

    const now =
      FieldValue.serverTimestamp();

    await enquiryRef.set({
      customerId:
        customerId || "",

      fullName:
        String(fullName).trim(),

      phone:
        String(phone).trim(),

      email:
        email
          ? String(email).trim()
          : "",

      serviceType:
        String(serviceType).trim(),

      pickupLocation:
        String(
          pickupLocation,
        ).trim(),

      dropLocation:
        String(
          dropLocation,
        ).trim(),

      movingDate:
        String(movingDate).trim(),

      additionalRequirements:
        additionalRequirements
          ? String(
              additionalRequirements,
            ).trim()
          : "",

      status: "NEW",

      source: "ADMIN",

      assignedTo: "",

      adminNotes: "",

      createdAt: now,

      updatedAt: now,
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

    return authErrorResponse(error);
  }
}