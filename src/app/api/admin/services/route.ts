import {
  NextResponse,
} from "next/server";

import {
  adminDb,
} from "@/lib/firebase/admin";

const defaultServices = [
  {
    id: "ac-services",
    name: "AC Services",
    slug: "ac-services",
    description:
      "AC installation, servicing and maintenance.",
    active: true,
  },
  {
    id: "tv-installation-service",
    name: "TV Installation & Service",
    slug: "tv-installation-service",
    description:
      "TV installation, wall mounting and service.",
    active: true,
  },
  {
    id: "water-purifier",
    name: "Water Purifier",
    slug: "water-purifier",
    description:
      "Water purifier installation, service and maintenance.",
    active: true,
  },
  {
    id: "geyser-services",
    name: "Geyser Services",
    slug: "geyser-services",
    description:
      "Geyser installation, service and maintenance.",
    active: true,
  },
  {
    id: "fan-services",
    name: "Fan Services",
    slug: "fan-services",
    description:
      "Fan installation, repair and replacement.",
    active: true,
  },
  {
    id: "electrical-work",
    name: "Electrical Work",
    slug: "electrical-work",
    description:
      "General electrical installation and repair.",
    active: true,
  },
  {
    id: "plumbing",
    name: "Plumbing",
    slug: "plumbing",
    description:
      "Household and office plumbing services.",
    active: true,
  },
];

export const runtime = "nodejs";
export const dynamic =
  "force-dynamic";

export async function GET() {
  try {
    const snapshot =
      await adminDb
        .collection("services")
        .get();

    if (snapshot.empty) {
      const batch =
        adminDb.batch();

      for (
        const service of
        defaultServices
      ) {
        const reference =
          adminDb
            .collection(
              "services",
            )
            .doc(
              service.id,
            );

        batch.set(
          reference,
          {
            ...service,
            createdAt:
              new Date(),
            updatedAt:
              new Date(),
          },
        );
      }

      await batch.commit();

      return NextResponse.json(
        {
          success: true,
          services:
            defaultServices,
        },
      );
    }

    const services =
      snapshot.docs.map(
        (doc) => ({
          id: doc.id,
          ...doc.data(),
        }),
      );

    return NextResponse.json(
      {
        success: true,
        services,
      },
    );
  } catch (error) {
    console.error(
      "Services API error:",
      error,
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load services.",
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