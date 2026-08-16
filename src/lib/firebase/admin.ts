import "server-only";

import {
  cert,
  getApps,
  initializeApp,
  type App,
} from "firebase-admin/app";

import {
  getAuth,
  type Auth,
} from "firebase-admin/auth";

import {
  getFirestore,
  type Firestore,
} from "firebase-admin/firestore";

import {
  getStorage,
  type Storage,
} from "firebase-admin/storage";

let firebaseAdminApp: App | null = null;

function getFirebaseAdminApp(): App {
  if (firebaseAdminApp) {
    return firebaseAdminApp;
  }

  const existingApps = getApps();

  if (existingApps.length > 0) {
    firebaseAdminApp = existingApps[0];
    return firebaseAdminApp;
  }

  const projectId =
    process.env.FIREBASE_PROJECT_ID?.trim();

  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL?.trim();

  const privateKey =
    process.env.FIREBASE_PRIVATE_KEY;

  if (!projectId) {
    throw new Error(
      "Missing FIREBASE_PROJECT_ID.",
    );
  }

  if (!clientEmail) {
    throw new Error(
      "Missing FIREBASE_CLIENT_EMAIL.",
    );
  }

  if (!privateKey) {
    throw new Error(
      "Missing FIREBASE_PRIVATE_KEY.",
    );
  }

  let normalizedPrivateKey =
    privateKey.trim();

  if (
    normalizedPrivateKey.startsWith('"') &&
    normalizedPrivateKey.endsWith('"')
  ) {
    normalizedPrivateKey =
      normalizedPrivateKey.slice(1, -1);
  }

  /*
   * Vercel environment variables may contain
   * literal \n characters.
   *
   * Convert them into real newlines.
   */
  normalizedPrivateKey =
    normalizedPrivateKey
      .split("\\n")
      .join("\n");

  if (
    !normalizedPrivateKey.includes(
      "-----BEGIN PRIVATE KEY-----",
    ) ||
    !normalizedPrivateKey.includes(
      "-----END PRIVATE KEY-----",
    )
  ) {
    throw new Error(
      "FIREBASE_PRIVATE_KEY is invalid.",
    );
  }

  firebaseAdminApp =
    initializeApp({
      credential: cert({
        projectId:
          projectId,

        clientEmail:
          clientEmail,

        privateKey:
          normalizedPrivateKey,
      }),

      storageBucket:
        process.env
          .NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    });

  return firebaseAdminApp;
}

/**
 * Firebase Admin Firestore
 */
export function getAdminDb(): Firestore {
  return getFirestore(
    getFirebaseAdminApp(),
  );
}

/**
 * Firebase Admin Auth
 */
export function getAdminAuth(): Auth {
  return getAuth(
    getFirebaseAdminApp(),
  );
}

/**
 * Firebase Admin Storage
 */
export function getAdminStorage(): Storage {
  return getStorage(
    getFirebaseAdminApp(),
  );
}

/**
 * Backward-compatible lazy Firestore export.
 *
 * Existing API files can use:
 *
 * import { adminDb } from "@/lib/firebase/admin";
 */
export const adminDb =
  new Proxy({} as Firestore, {
    get(_target, property) {
      const db =
        getAdminDb();

      const value =
        Reflect.get(
          db,
          property,
          db,
        );

      if (
        typeof value ===
        "function"
      ) {
        return value.bind(db);
      }

      return value;
    },
  });

/**
 * Backward-compatible lazy Auth export.
 */
export const adminAuth =
  new Proxy({} as Auth, {
    get(_target, property) {
      const auth =
        getAdminAuth();

      const value =
        Reflect.get(
          auth,
          property,
          auth,
        );

      if (
        typeof value ===
        "function"
      ) {
        return value.bind(auth);
      }

      return value;
    },
  });

/**
 * Backward-compatible lazy Storage export.
 */
export const adminStorage =
  new Proxy({} as Storage, {
    get(_target, property) {
      const storage =
        getAdminStorage();

      const value =
        Reflect.get(
          storage,
          property,
          storage,
        );

      if (
        typeof value ===
        "function"
      ) {
        return value.bind(storage);
      }

      return value;
    },
  });

export default getFirebaseAdminApp;