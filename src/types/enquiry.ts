export type EnquiryStatus =
  | "NEW"
  | "CONTACTED"
  | "FOLLOW_UP"
  | "SITE_VISIT"
  | "QUOTE_DISCUSSION"
  | "CUSTOMER_INTERESTED"
  | "CONVERTED"
  | "NOT_INTERESTED"
  | "CANCELLED"
  | "CLOSED";

export type ServiceType =
  | "HOME_RELOCATION"
  | "OFFICE_RELOCATION"
  | "VEHICLE_TRANSPORTATION"
  | "PACKING_UNPACKING"
  | "LOADING_UNLOADING"
  | "STORAGE"
  | "OTHER"
  | "AC_SERVICE"
  | "TV_SERVICE"
  | "WATER_PURIFIER"
  | "GEYSER_SERVICE"
  | "FAN_SERVICE"
  | "ELECTRICAL"
  | "PLUMBING";

export interface Enquiry {
  id: string;

  customerId?: string;

  fullName: string;
  phone: string;
  email?: string;

  serviceType: ServiceType | string;

  pickupLocation: string;
  dropLocation: string;

  movingDate: string;

  additionalRequirements?: string;

  status: EnquiryStatus;

  source?: string;

  assignedTo?: string;

  adminNotes?: string;

  contactedAt?: string;

  createdAt: string;
  updatedAt: string;
}