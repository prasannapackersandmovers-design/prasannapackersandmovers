"use client";

import { auth } from "@/lib/firebase/client";

export async function adminFetch(
  url: string,
  options: RequestInit = {},
): Promise<Response> {
  const user = auth.currentUser;

  if (!user) {
    throw new Error(
      "Administrator session has expired. Please login again.",
    );
  }

  const token = await user.getIdToken(true);

  const headers = new Headers(
    options.headers,
  );

  headers.set(
    "Authorization",
    `Bearer ${token}`,
  );

  if (
    options.body &&
    !headers.has("Content-Type")
  ) {
    headers.set(
      "Content-Type",
      "application/json",
    );
  }

  return fetch(url, {
    ...options,
    headers,
    cache: "no-store",
  });
}

export async function adminJson<T>(
  url: string,
  options: RequestInit = {},
): Promise<T> {
  const response = await adminFetch(
    url,
    options,
  );

  /*
   * Read the response as text first.
   *
   * This prevents:
   * Unexpected end of JSON input
   *
   * when the server returns an empty response.
   */
  const text =
    await response.text();

  if (!text.trim()) {
    throw new Error(
      `Server returned an empty response (${response.status}). Please try again.`,
    );
  }

  let data: {
    success?: boolean;
    message?: string;
    [key: string]: unknown;
  };

  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(
      `Server returned invalid JSON (${response.status}).`,
    );
  }

  if (
    !response.ok ||
    data.success === false
  ) {
    throw new Error(
      typeof data.message === "string"
        ? data.message
        : `The server request failed (${response.status}).`,
    );
  }

  return data as T;
}