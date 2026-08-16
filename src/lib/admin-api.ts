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

  const token = await user.getIdToken();

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

  const data = await response.json();

  if (!response.ok || data.success === false) {
    throw new Error(
      data.message ||
        "The server request failed.",
    );
  }

  return data as T;
}