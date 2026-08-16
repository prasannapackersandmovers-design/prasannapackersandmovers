import { adminDb } from "./admin";

export const COLLECTIONS = {
  CUSTOMERS: "customers",
  ENQUIRIES: "enquiries",
  ENQUIRY_NOTES: "enquiryNotes",
  BOOKINGS: "bookings",
  USERS: "users",
  SERVICES: "services",
} as const;

export { adminDb };