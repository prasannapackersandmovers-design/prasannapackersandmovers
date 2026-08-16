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
  enquirySchema,
} from "@/lib/validations";

export const runtime = "nodejs";
export const dynamic =
  "force-dynamic";

export async function GET() {
  return NextResponse.json(
    {
      success: true,
      message:
        "Enquiry API is running.",
    },
    {
      status: 200,
    },
  );
}

export async function POST(
  request: Request,
) {
  try {
    let body: unknown;

    /*
     * Safely parse request JSON.
     */
    try {
      body =
        await request.json();
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
     * Validate the public enquiry.
     */
    const result =
      enquirySchema.safeParse(
        body,
      );

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

    const data =
      result.data;

    /*
     * Firebase Admin is initialized
     * only here, inside the try/catch.
     */
    const db =
      getAdminDb();

    const customerRef =
      db
        .collection("customers")
        .doc();

    const enquiryRef =
      db
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
     * Atomic Firestore write.
     *
     * Either both documents are written,
     * or neither is written.
     */
    const batch =
      db.batch();

    batch.set(
      customerRef,
      customerData,
    );

    batch.set(
      enquiryRef,
      enquiryData,
    );

    await batch.commit();

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
    console.error(
      "POST /api/enquiries error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,

        message:
          "Unable to submit enquiry right now. Please call us directly.",

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