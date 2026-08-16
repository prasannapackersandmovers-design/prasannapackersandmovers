import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const projectId = process.env.FIREBASE_PROJECT_ID?.trim();
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
const privateKey = process.env.FIREBASE_PRIVATE_KEY;

if (!projectId) {
  throw new Error("Missing FIREBASE_PROJECT_ID");
}

if (!clientEmail) {
  throw new Error("Missing FIREBASE_CLIENT_EMAIL");
}

if (!privateKey) {
  throw new Error("Missing FIREBASE_PRIVATE_KEY");
}

/**
 * Normalize the Firebase Admin private key.
 *
 * Supports:
 * - escaped newlines: \\n
 * - Windows newlines: \\r\\n
 * - actual newlines
 * - optional surrounding quotes
 */
let normalizedPrivateKey = privateKey.trim();

if (
  normalizedPrivateKey.startsWith('"') &&
  normalizedPrivateKey.endsWith('"')
) {
  normalizedPrivateKey = normalizedPrivateKey.slice(1, -1);
}

normalizedPrivateKey = normalizedPrivateKey
  .replace(/\\n/g, "\n")
  .replace(/\r\n/g, "\n")
  .replace(/\r/g, "\n")
  .trim();

if (
  !normalizedPrivateKey.includes(
    "-----BEGIN PRIVATE KEY-----"
  ) ||
  !normalizedPrivateKey.includes(
    "-----END PRIVATE KEY-----"
  )
) {
  throw new Error(
    "FIREBASE_PRIVATE_KEY is not a valid PEM private key."
  );
}

const firebaseAdminApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
        credential: cert({
          projectId,
          clientEmail,
          privateKey: normalizedPrivateKey,
        }),
        storageBucket:
          process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      });

export const adminAuth = getAuth(firebaseAdminApp);

export const adminDb = getFirestore(firebaseAdminApp);

export const adminStorage =
  getStorage(firebaseAdminApp);

export default firebaseAdminApp;