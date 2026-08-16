import { NextResponse } from "next/server";

import { adminDb } from "@/lib/firebase/admin";
import {
  authErrorResponse,
  requireAdmin,
} from "@/lib/admin-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type DashboardEnquiry = {
  id: string;
  fullName?: string;
  serviceType?: string;
  phone?: string;
  status?: string;
  movingDate?: string;
  createdAt?: string | null;
};

function serializeTimestamp(
  value: unknown,
): string | null {
  if (
    value &&
    typeof value === "object" &&
    "toDate" in value
  ) {
    const timestamp =
      value as {
        toDate?: () => Date;
      };

    if (
      typeof timestamp.toDate ===
      "function"
    ) {
      return timestamp
        .toDate()
        .toISOString();
    }
  }

  if (
    value &&
    typeof value === "object" &&
    "toMillis" in value
  ) {
    const timestamp =
      value as {
        toMillis?: () => number;
      };

    if (
      typeof timestamp.toMillis ===
      "function"
    ) {
      return new Date(
        timestamp.toMillis(),
      ).toISOString();
    }
  }

  if (
    typeof value === "string"
  ) {
    return value;
  }

  return null;
}

export async function GET(
  request: Request,
) {
  try {
    /*
     * Verify Firebase authenticated
     * administrator.
     */
    await requireAdmin(request);

    /*
     * Read Firestore collections.
     */
    const [
      enquiriesSnapshot,
      customersSnapshot,
      bookingsSnapshot,
    ] = await Promise.all([
      adminDb
        .collection("enquiries")
        .get(),

      adminDb
        .collection("customers")
        .get(),

      adminDb
        .collection("bookings")
        .get(),
    ]);

    /*
     * Convert Firestore data into
     * JSON-safe objects.
     */
    const enquiries: DashboardEnquiry[] =
      enquiriesSnapshot.docs.map(
        (doc) => {
          const data =
            doc.data();

          return {
            id: doc.id,

            fullName:
              typeof data.fullName ===
              "string"
                ? data.fullName
                : undefined,

            serviceType:
              typeof data.serviceType ===
              "string"
                ? data.serviceType
                : undefined,

            phone:
              typeof data.phone ===
              "string"
                ? data.phone
                : undefined,

            status:
              typeof data.status ===
              "string"
                ? data.status
                : undefined,

            movingDate:
              typeof data.movingDate ===
              "string"
                ? data.movingDate
                : undefined,

            createdAt:
              serializeTimestamp(
                data.createdAt,
              ),
          };
        },
      );

    /*
     * Most recent enquiries.
     */
    const recentEnquiries =
      [...enquiries]
        .sort((a, b) => {
          const aTime =
            a.createdAt
              ? new Date(
                  a.createdAt,
                ).getTime()
              : 0;

          const bTime =
            b.createdAt
              ? new Date(
                  b.createdAt,
                ).getTime()
              : 0;

          return bTime - aTime;
        })
        .slice(0, 8);

    /*
     * New enquiries.
     */
    const newEnquiries =
      enquiries.filter(
        (item) =>
          item.status === "NEW",
      ).length;

    /*
     * Pending bookings.
     */
    const pendingBookings =
      bookingsSnapshot.docs.filter(
        (doc) => {
          const status =
            doc.data().status;

          return [
            "PENDING",
            "CONFIRMED",
            "ASSIGNED",
            "IN_PROGRESS",
          ].includes(status);
        },
      ).length;

    /*
     * Completed bookings.
     */
    const completedBookings =
      bookingsSnapshot.docs.filter(
        (doc) =>
          doc.data().status ===
          "COMPLETED",
      ).length;

    /*
     * Always return valid JSON.
     */
    return NextResponse.json(
      {
        success: true,

        stats: {
          totalEnquiries:
            enquiriesSnapshot.size,

          newEnquiries,

          totalCustomers:
            customersSnapshot.size,

          totalBookings:
            bookingsSnapshot.size,

          pendingBookings,

          completedBookings,
        },

        recentEnquiries,
      },
      {
        status: 200,
      },
    );
  } catch (error) {
    console.error(
      "GET /api/admin/dashboard error:",
      error,
    );

    /*
     * Authentication errors.
     */
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

    /*
     * IMPORTANT:
     * Return the actual server error
     * as JSON instead of an empty 500.
     */
    const message =
      error instanceof Error
        ? error.message
        : "Unable to load dashboard.";

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load admin dashboard.",
        error: message,
      },
      {
        status: 500,
      },
    );
  }
}