import { NextResponse } from "next/server";

import { adminDb } from "@/lib/firebase/admin";
import {
  authErrorResponse,
  requireAdmin,
} from "@/lib/admin-auth";

type DashboardEnquiry = {
  id: string;
  fullName?: string;
  serviceType?: string;
  phone?: string;
  status?: string;
  movingDate?: string;
  createdAt?: {
    toMillis?: () => number;
  };
};

export const runtime = "nodejs";

export async function GET(
  request: Request,
) {
  try {
    await requireAdmin(request);

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

    const enquiries: DashboardEnquiry[] =
      enquiriesSnapshot.docs.map((doc) => {
        const data = doc.data();

        return {
          id: doc.id,

          fullName:
            typeof data.fullName === "string"
              ? data.fullName
              : undefined,

          serviceType:
            typeof data.serviceType === "string"
              ? data.serviceType
              : undefined,

          phone:
            typeof data.phone === "string"
              ? data.phone
              : undefined,

          status:
            typeof data.status === "string"
              ? data.status
              : undefined,

          movingDate:
            typeof data.movingDate === "string"
              ? data.movingDate
              : undefined,

          createdAt:
            data.createdAt &&
            typeof data.createdAt.toMillis ===
              "function"
              ? {
                  toMillis: () =>
                    data.createdAt.toMillis(),
                }
              : undefined,
        };
      });

    const recentEnquiries =
      [...enquiries]
        .sort((a, b) => {
          const aTime =
            a.createdAt?.toMillis?.() ?? 0;

          const bTime =
            b.createdAt?.toMillis?.() ?? 0;

          return bTime - aTime;
        })
        .slice(0, 8);

    const newEnquiries =
      enquiries.filter(
        (item) =>
          item.status === "NEW",
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

    return NextResponse.json({
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
    });
  } catch (error) {
    console.error(
      "GET /api/admin/dashboard error:",
      error,
    );

    return authErrorResponse(error);
  }
}