import {
  NextResponse,
} from "next/server";

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
    typeof value ===
      "object"
  ) {
    const timestamp =
      value as {
        toDate?: () => Date;
        toMillis?: () => number;
      };

    if (
      typeof timestamp.toDate ===
      "function"
    ) {
      return timestamp
        .toDate()
        .toISOString();
    }

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
    typeof value ===
    "string"
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
     * Verify Firebase ID token
     * and admin email.
     */
    await requireAdmin(
      request,
    );

    const db =
      getAdminDb();

    const [
      enquiriesSnapshot,
      customersSnapshot,
      bookingsSnapshot,
    ] = await Promise.all([
      db
        .collection("enquiries")
        .get(),

      db
        .collection("customers")
        .get(),

      db
        .collection("bookings")
        .get(),
    ]);

    const enquiries:
      DashboardEnquiry[] =
      enquiriesSnapshot.docs.map(
        (doc) => {
          const data =
            doc.data();

          return {
            id:
              doc.id,

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

    const recentEnquiries =
      [...enquiries]
        .sort(
          (a, b) => {
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

            return (
              bTime - aTime
            );
          },
        )
        .slice(0, 8);

    const newEnquiries =
      enquiries.filter(
        (item) =>
          item.status ===
          "NEW",
      ).length;

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

    const completedBookings =
      bookingsSnapshot.docs.filter(
        (doc) =>
          doc.data().status ===
          "COMPLETED",
      ).length;

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
          "Unable to load admin dashboard.",

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