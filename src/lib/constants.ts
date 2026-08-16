export const COMPANY_NAME = "Arun Packers & Movers";

export const COMPANY_TAGLINE =
  "Safe, Reliable & Professional Moving Services";

export const COMPANY_DESCRIPTION =
  "Professional packing, moving, transportation and home service solutions with trusted support across Guntur, Vizag, Bengaluru and Hyderabad.";

export const COMPANY_PHONE_NUMBERS = [
  "7780177012",
  "9030814393",
  "9866687441",
] as const;

export const PRIMARY_PHONE = "7780177012";

export const WHATSAPP_NUMBER = "917780177012";

export const COMPANY_ADDRESS =
  "Rajagarithota, beside Liberty Hall, Guntur, Andhra Pradesh";

export const SERVICE_AREAS = [
  "Guntur",
  "Vizag",
  "Bengaluru",
  "Hyderabad",
] as const;

export const MOVING_SERVICE_TYPES = [
  {
    value: "HOME_RELOCATION",
    label: "Home Relocation",
  },
  {
    value: "OFFICE_RELOCATION",
    label: "Office Relocation",
  },
  {
    value: "VEHICLE_TRANSPORTATION",
    label: "Vehicle Transportation",
  },
  {
    value: "PACKING_UNPACKING",
    label: "Packing & Unpacking",
  },
  {
    value: "LOADING_UNLOADING",
    label: "Loading & Unloading",
  },
  {
    value: "STORAGE",
    label: "Storage",
  },
  {
    value: "OTHER",
    label: "Other",
  },
] as const;

export const HOME_SERVICE_TYPES = [
  {
    value: "AC_SERVICE",
    label: "AC Installation / Service",
  },
  {
    value: "TV_SERVICE",
    label: "TV Installation",
  },
  {
    value: "WATER_PURIFIER",
    label: "Water Purifier",
  },
  {
    value: "GEYSER_SERVICE",
    label: "Geyser Service",
  },
  {
    value: "FAN_SERVICE",
    label: "Fan Installation / Service",
  },
  {
    value: "ELECTRICAL",
    label: "Electrical Work",
  },
  {
    value: "PLUMBING",
    label: "Plumbing",
  },
] as const;

export const ENQUIRY_STATUSES = [
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
] as const;

export const BOOKING_STATUSES = [
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
] as const;

export const PAYMENT_STATUSES = [
  "PENDING",
  "PARTIAL",
  "PAID",
  "REFUNDED",
] as const;