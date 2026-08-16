import { adminAuth } from "@/lib/firebase/admin";

export interface AuthenticatedAdmin {
  uid: string;
  email?: string;
  name?: string;
}

function getAllowedAdminEmails(): string[] {
  const configured =
    process.env.ADMIN_EMAILS ??
    process.env.NEXT_PUBLIC_ADMIN_EMAIL ??
    "";

  return configured
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export async function requireAdmin(
  request: Request,
): Promise<AuthenticatedAdmin> {
  const authorization =
    request.headers.get("authorization");

  if (!authorization?.startsWith("Bearer ")) {
    throw new Error("UNAUTHORIZED");
  }

  const token = authorization.slice(7).trim();

  if (!token) {
    throw new Error("UNAUTHORIZED");
  }

  let decodedToken;

  try {
    decodedToken =
      await adminAuth.verifyIdToken(token);
  } catch (error) {
    console.error(
      "Admin token verification failed:",
      error,
    );

    throw new Error("UNAUTHORIZED");
  }

  const allowedEmails =
    getAllowedAdminEmails();

  const email =
    decodedToken.email
      ?.trim()
      .toLowerCase();

  if (
    allowedEmails.length === 0 ||
    !email ||
    !allowedEmails.includes(email)
  ) {
    throw new Error("FORBIDDEN");
  }

  return {
    uid: decodedToken.uid,
    email: decodedToken.email,
    name:
      decodedToken.name ??
      decodedToken.email ??
      undefined,
  };
}

export function authErrorResponse(
  error: unknown,
) {
  const message =
    error instanceof Error
      ? error.message
      : "UNAUTHORIZED";

  if (message === "FORBIDDEN") {
    return Response.json(
      {
        success: false,
        message:
          "Admin access required.",
      },
      {
        status: 403,
      },
    );
  }

  return Response.json(
    {
      success: false,
      message:
        "Authentication required.",
    },
    {
      status: 401,
    },
  );
}