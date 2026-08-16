import { NextResponse } from "next/server";
import { FieldValue } from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase/admin";
import { enquirySchema } from "@/lib/validations";

export const runtime = "nodejs";

/**
 * POST /api/enquiries
 *
 * Public website enquiry submission.
 *
 * Creates:
 *
 * customers/{customerId}
 * enquiries/{enquiryId}
 *
 * using a Firestore batch so both documents
 * are written together.
 */
export async function POST(
  request: Request,
) {
  try {
    /**
     * Parse request body safely.
     */
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid request data.",
        },
        {
          status: 400,
        },
      );
    }

    /**
     * Validate submitted enquiry.
     */
    const result =
      enquirySchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please correct the form errors.",
          errors:
            result.error.flatten()
              .fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const data = result.data;

    /**
     * Create Firestore document references.
     */
    const customerRef = adminDb
      .collection("customers")
      .doc();

    const enquiryRef = adminDb
      .collection("enquiries")
      .doc();

    /**
     * Firestore server timestamp.
     */
    const now =
      FieldValue.serverTimestamp();

    /**
     * Customer document.
     */
    const customerData = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || "",

      createdAt: now,
      updatedAt: now,
    };

    /**
     * Enquiry document.
     */
    const enquiryData = {
      customerId:
        customerRef.id,

      fullName:
        data.fullName,

      phone:
        data.phone,

      email:
        data.email || "",

      serviceType:
        data.serviceType,

      pickupLocation:
        data.pickupLocation,

      dropLocation:
        data.dropLocation,

      movingDate:
        data.movingDate,

      additionalRequirements:
        data.additionalRequirements ||
        "",

      status:
        "NEW",

      source:
        "WEBSITE",

      assignedTo:
        "",

      adminNotes:
        "",

      createdAt:
        now,

      updatedAt:
        now,
    };

    /**
     * Firestore batch.
     */
    const batch =
      adminDb.batch();

    /**
     * Create customer.
     */
    batch.set(
      customerRef,
      customerData,
    );

    /**
     * Create enquiry.
     */
    batch.set(
      enquiryRef,
      enquiryData,
    );

    /**
     * Commit both documents.
     */
    await batch.commit();

    /**
     * Always return valid JSON.
     */
    return NextResponse.json(
      {
        success: true,

        message:
          "Enquiry submitted successfully.",

        enquiryId:
          enquiryRef.id,

        customerId:
          customerRef.id,
      },
      {
        status: 201,
      },
    );
  } catch (error) {
    /**
     * Log the complete server error.
     */
    console.error(
      "POST /api/enquiries error:",
      error,
    );

    /**
     * Never return an empty response.
     *
     * This is important because the frontend
     * expects JSON from this endpoint.
     */
    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to submit enquiry right now. Please call us directly.",

        error:
          process.env.NODE_ENV ===
          "production"
            ? "Server configuration or database error."
            : error instanceof Error
              ? error.message
              : "Unknown server error.",
      },
      {
        status: 500,
      },
    );
  }
}