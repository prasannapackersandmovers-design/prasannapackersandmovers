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
    process.env.FIREBASE_PROJECT_ID;

  const clientEmail =
    process.env.FIREBASE_CLIENT_EMAIL;

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

  normalizedPrivateKey =
    normalizedPrivateKey.replace(
      /\\n/g,
      "\n",
    );

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
          projectId.trim(),

        clientEmail:
          clientEmail.trim(),

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
 * Lazy Firebase Admin Firestore.
 *
 * Firebase is initialized only when
 * Firestore is actually accessed.
 */
export const adminDb =
  new Proxy({} as Firestore, {
    get(_target, property) {
      const db =
        getFirestore(
          getFirebaseAdminApp(),
        );

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
 * Lazy Firebase Admin Auth.
 */
export const adminAuth =
  new Proxy({} as Auth, {
    get(_target, property) {
      const auth =
        getAuth(
          getFirebaseAdminApp(),
        );

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
 * Lazy Firebase Admin Storage.
 */
export const adminStorage =
  new Proxy({} as Storage, {
    get(_target, property) {
      const storage =
        getStorage(
          getFirebaseAdminApp(),
        );

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