export type BookingStatus =
  | "CONFIRMED"
  | "SCHEDULED"
  | "PACKING"
  | "READY_FOR_LOADING"
  | "LOADING"
  | "IN_TRANSIT"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "COMPLETED"
  | "CANCELLED";

export type PaymentStatus =
  | "PENDING"
  | "PARTIAL"
  | "PAID"
  | "REFUNDED";

export interface Booking {
  id: string;

  bookingReference: string;

  customerId: string;

  enquiryId?: string;

  serviceType: string;

  pickupAddress: string;

  dropAddress: string;

  movingDate: string;

  finalPrice?: number;

  paymentStatus: PaymentStatus;

  bookingStatus: BookingStatus;

  vehicleId?: string;

  assignedStaffId?: string;

  specialInstructions?: string;

  createdAt: string;

  updatedAt: string;
}