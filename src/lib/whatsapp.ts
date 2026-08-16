export function createWhatsAppUrl(
  phone: string,
  message: string,
): string {
  const normalizedPhone = phone.replace(/\D/g, "");

  const internationalPhone =
    normalizedPhone.length === 10
      ? `91${normalizedPhone}`
      : normalizedPhone;

  return `https://wa.me/${internationalPhone}?text=${encodeURIComponent(
    message,
  )}`;
}

export function createCustomerWhatsAppUrl(
  phone: string,
  customerName: string,
): string {
  return createWhatsAppUrl(
    phone,
    `Hello ${customerName}, this is Arun Packers & Movers. We received your enquiry. We would like to discuss your moving requirements with you.`,
  );
}