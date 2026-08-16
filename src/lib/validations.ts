import { z } from "zod";

export const enquirySchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Name must contain at least 2 characters")
    .max(100, "Name is too long"),

  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine(
      (value) => /^[6-9]\d{9}$/.test(value),
      "Enter a valid Indian mobile number",
    ),

  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal(""))
    .refine(
      (value) => !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
      "Enter a valid email address",
    ),

  serviceType: z
    .string()
    .trim()
    .min(1, "Please select a service"),

  pickupLocation: z
    .string()
    .trim()
    .min(2, "Pickup location is required")
    .max(300),

  dropLocation: z
    .string()
    .trim()
    .min(2, "Drop location is required")
    .max(300),

  movingDate: z
    .string()
    .trim()
    .min(1, "Moving date is required")
    .refine((value) => {
      const date = new Date(`${value}T00:00:00`);

      return !Number.isNaN(date.getTime());
    }, "Invalid moving date"),

  additionalRequirements: z
    .string()
    .trim()
    .max(2000)
    .optional()
    .or(z.literal("")),
});

export const enquiryUpdateSchema = z.object({
  status: z
    .enum([
      "NEW",
      "CONTACTED",
      "FOLLOW_UP",
      "SITE_VISIT",
      "QUOTE_DISCUSSION",
      "CUSTOMER_INTERESTED",
      "CONVERTED",
      "NOT_INTERESTED",
      "CANCELLED",
      "CLOSED",
    ])
    .optional(),

  adminNotes: z
    .string()
    .trim()
    .max(5000)
    .optional(),

  assignedTo: z
    .string()
    .trim()
    .max(200)
    .optional(),
});

export const customerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2)
    .max(100),

  phone: z
    .string()
    .trim()
    .transform((value) => value.replace(/\D/g, ""))
    .refine(
      (value) => /^[6-9]\d{9}$/.test(value),
      "Invalid Indian phone number",
    ),

  email: z
    .string()
    .trim()
    .optional()
    .or(z.literal("")),

  address: z
    .string()
    .trim()
    .max(1000)
    .optional()
    .or(z.literal("")),

  notes: z
    .string()
    .trim()
    .max(3000)
    .optional()
    .or(z.literal("")),
});

export const bookingSchema = z.object({
  customerId: z
    .string()
    .min(1),

  enquiryId: z
    .string()
    .optional()
    .or(z.literal("")),

  serviceType: z
    .string()
    .min(1),

  pickupAddress: z
    .string()
    .trim()
    .min(2)
    .max(1000),

  dropAddress: z
    .string()
    .trim()
    .min(2)
    .max(1000),

  movingDate: z
    .string()
    .min(1),

  finalPrice: z
    .number()
    .nonnegative()
    .optional(),

  paymentStatus: z
    .enum(["PENDING", "PARTIAL", "PAID", "REFUNDED"])
    .default("PENDING"),

  bookingStatus: z
    .enum([
      "CONFIRMED",
      "SCHEDULED",
      "PACKING",
      "READY_FOR_LOADING",
      "LOADING",
      "IN_TRANSIT",
      "OUT_FOR_DELIVERY",
      "DELIVERED",
      "COMPLETED",
      "CANCELLED",
    ])
    .default("CONFIRMED"),

  specialInstructions: z
    .string()
    .trim()
    .max(3000)
    .optional()
    .or(z.literal("")),
});