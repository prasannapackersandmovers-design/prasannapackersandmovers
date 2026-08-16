import { NextResponse } from "next/server";
import {
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { FieldValue } from "firebase-admin/firestore";

import { enquirySchema } from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Get Firebase Admin Firestore for this request.
 *
 * Firebase is initialized inside the request handler,
 * so configuration errors can be caught and returned
 * as JSON instead of causing an empty 500 response.
 */
function getFirestoreAdmin() {
  const existingApps = getApps();

  if (existingApps.length > 0) {
    return getFirestore(existingApps[0]);
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID;

  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL;

  const privateKey =
    process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId) {
    throw new Error(
      "Missing FIREBASE_PROJECT_ID in Vercel environment variables.",
    );
  }

  if (!clientEmail) {
    throw new Error(
      "Missing FIREBASE_CLIENT_EMAIL in Vercel environment variables.",
    );
  }

  if (!privateKey) {
    throw new Error(
      "Missing FIREBASE_PRIVATE_KEY in Vercel environment variables.",
    );
  }

  let normalizedPrivateKey =
    privateKey.trim();

  /*
   * Remove surrounding quotes if they were
   * accidentally included in the Vercel value.
   */
  if (
    normalizedPrivateKey.startsWith('"') &&
    normalizedPrivateKey.endsWith('"')
  ) {
    normalizedPrivateKey =
      normalizedPrivateKey.slice(1, -1);
  }

  /*
   * Convert literal \\n into real newlines.
   */
  normalizedPrivateKey =
    normalizedPrivateKey.replace(
      /\\n/g,
      "\n",
    );

  if (
    !normalizedPrivateKey.includes(
      "-----BEGIN PRIVATE KEY-----",
    ) ||
    !normalizedPrivateKey.includes(
      "-----END PRIVATE KEY-----",
    )
  ) {
    throw new Error(
      "FIREBASE_PRIVATE_KEY format is invalid.",
    );
  }

  const app =
    initializeApp({
      credential: cert({
        projectId:
          projectId.trim(),

        clientEmail:
          clientEmail.trim(),

        privateKey:
          normalizedPrivateKey,
      }),

      storageBucket:
        process.env
          .NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });

  return getFirestore(app);
}

/**
 * GET /api/enquiries
 *
 * Simple production health check.
 *
 * This lets us verify that Vercel can execute
 * the API function and return JSON.
 */
export async function GET() {
  return NextResponse.json({
    success: true,
    message:
      "Enquiry API is running.",
  });
}

/**
 * POST /api/enquiries
 *
 * Public enquiry submission.
 */
export async function POST(
  request: Request,
) {
  try {
    /*
     * Parse JSON safely.
     */
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid form submission.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * Validate form.
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

    /*
     * Firebase initialization happens INSIDE
     * the try/catch.
     */
    const adminDb =
      getFirestoreAdmin();

    const data = result.data;

    /*
     * Customer document.
     */
    const customerRef =
      adminDb
        .collection("customers")
        .doc();

    /*
     * Enquiry document.
     */
    const enquiryRef =
      adminDb
        .collection("enquiries")
        .doc();

    const now =
      FieldValue.serverTimestamp();

    const customerData = {
      fullName:
        data.fullName,

      phone:
        data.phone,

      email:
        data.email || "",

      createdAt:
        now,

      updatedAt:
        now,
    };

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

    /*
     * Write customer + enquiry atomically.
     */
    const batch =
      adminDb.batch();

    batch.set(
      customerRef,
      customerData,
    );

    batch.set(
      enquiryRef,
      enquiryData,
    );

    await batch.commit();

    /*
     * Successful JSON response.
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
    /*
     * IMPORTANT:
     * Every server error is converted into JSON.
     */
    console.error(
      "POST /api/enquiries ERROR:",
      error,
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : String(error);

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to submit enquiry right now.",

        error:
          errorMessage,
      },
      {
        status: 500,
      },
    );
  }
}