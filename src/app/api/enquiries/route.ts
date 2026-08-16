import { NextResponse } from "next/server";
import {
  FieldValue,
} from "firebase-admin/firestore";

import { adminDb } from "@/lib/firebase/admin";
import { enquirySchema } from "@/lib/validations";

export const runtime = "nodejs";

export async function POST(
  request: Request,
) {
  try {
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid request data. Please try again.",
        },
        { status: 400 },
      );
    }

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
        { status: 400 },
      );
    }

    const data = result.data;

    const customerRef =
      adminDb
        .collection("customers")
        .doc();

    const enquiryRef =
      adminDb
        .collection("enquiries")
        .doc();

    const now =
      FieldValue.serverTimestamp();

    const customerData = {
      fullName: data.fullName,
      phone: data.phone,
      email: data.email || "",
      createdAt: now,
      updatedAt: now,
    };

    const enquiryData = {
      customerId: customerRef.id,

      fullName: data.fullName,
      phone: data.phone,
      email: data.email || "",

      serviceType: data.serviceType,

      pickupLocation:
        data.pickupLocation,

      dropLocation:
        data.dropLocation,

      movingDate:
        data.movingDate,

      additionalRequirements:
        data.additionalRequirements ||
        "",

      status: "NEW",

      source: "WEBSITE",

      assignedTo: "",

      adminNotes: "",

      createdAt: now,

      updatedAt: now,
    };

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
      { status: 201 },
    );
  } catch (error) {
    console.error(
      "POST /api/enquiries error:",
      error,
    );

    const message =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      {
        success: false,
        message,
      },
      { status: 500 },
    );
  }
}