import "server-only";

import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
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

const normalizedPrivateKey = privateKey.replace(/\\n/g, "\n");

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