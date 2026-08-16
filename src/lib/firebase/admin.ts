import "server-only";

import {
  cert,
  getApps,
  initializeApp,
} from "firebase-admin/app";

import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

/**
 * Firebase Admin environment variables
 */
const projectId =
  process.env.FIREBASE_PROJECT_ID;

const clientEmail =
  process.env.FIREBASE_CLIENT_EMAIL;

const privateKey =
  process.env.FIREBASE_PRIVATE_KEY;

/**
 * Validate required environment variables.
 */
if (!projectId) {
  throw new Error(
    "Missing FIREBASE_PROJECT_ID",
  );
}

if (!clientEmail) {
  throw new Error(
    "Missing FIREBASE_CLIENT_EMAIL",
  );
}

if (!privateKey) {
  throw new Error(
    "Missing FIREBASE_PRIVATE_KEY",
  );
}

/**
 * Normalize Firebase service-account private key.
 *
 * Vercel environment variables commonly store
 * newline characters as literal "\\n".
 *
 * Convert them into real newline characters.
 */
let normalizedPrivateKey =
  privateKey.trim();

/**
 * Remove surrounding quotes if the entire
 * environment variable was pasted with quotes.
 */
if (
  normalizedPrivateKey.startsWith('"') &&
  normalizedPrivateKey.endsWith('"')
) {
  normalizedPrivateKey =
    normalizedPrivateKey.slice(1, -1);
}

/**
 * Convert escaped newlines into actual
 * newline characters.
 */
normalizedPrivateKey =
  normalizedPrivateKey.replace(
    /\\n/g,
    "\n",
  );

/**
 * Validate private-key structure before
 * passing it to Firebase Admin.
 */
if (
  !normalizedPrivateKey.includes(
    "-----BEGIN PRIVATE KEY-----",
  ) ||
  !normalizedPrivateKey.includes(
    "-----END PRIVATE KEY-----",
  )
) {
  throw new Error(
    "FIREBASE_PRIVATE_KEY is invalid. It must contain BEGIN PRIVATE KEY and END PRIVATE KEY.",
  );
}

/**
 * Initialize Firebase Admin only once.
 *
 * Next.js development mode can evaluate
 * modules multiple times, so reuse an
 * existing Firebase Admin app when available.
 */
const firebaseAdminApp =
  getApps().length > 0
    ? getApps()[0]
    : initializeApp({
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

/**
 * Firebase Admin Authentication
 */
export const adminAuth =
  getAuth(firebaseAdminApp);

/**
 * Firebase Admin Firestore
 */
export const adminDb =
  getFirestore(firebaseAdminApp);

/**
 * Firebase Admin Storage
 */
export const adminStorage =
  getStorage(firebaseAdminApp);

/**
 * Default Firebase Admin application
 */
export default firebaseAdminApp;