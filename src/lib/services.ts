export type ServiceOption = {
  name: string;
  description: string;
};

export type ServiceField =
  | "name"
  | "phone"
  | "email"
  | "location"
  | "preferredDate"
  | "preferredTime"
  | "problem"
  | "description"
  | "brand"
  | "model"
  | "equipmentType"
  | "quantity";

export type Service = {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  description: string;
  shortDescription: string;
  icon:
    | "air-conditioner"
    | "tv"
    | "water"
    | "geyser"
    | "fan"
    | "electrical"
    | "plumbing";
  options: ServiceOption[];
  benefits: string[];
  process: {
    title: string;
    description: string;
  }[];
  faqs: {
    question: string;
    answer: string;
  }[];
  formFields: ServiceField[];
};

export const services: Service[] = [
  {
    slug: "ac-services",
    number: "01",
    title: "AC Services",
    shortTitle: "AC Services",
    description:
      "Professional assistance for AC installation, servicing and related requirements for homes and offices.",
    shortDescription:
      "Professional AC installation, service and maintenance support.",
    icon: "air-conditioner",

    options: [
      {
        name: "Installation",
        description:
          "Professional assistance for installing an AC at your home or office.",
      },
      {
        name: "Service",
        description:
          "Service support for AC units requiring inspection or servicing.",
      },
      {
        name: "Maintenance",
        description:
          "Regular maintenance assistance to help keep your AC working properly.",
      },
    ],

    benefits: [
      "Convenient service scheduling",
      "Installation and servicing support",
      "Suitable for homes and offices",
      "Service-specific assistance",
      "Professional requirement assessment",
    ],

    process: [
      {
        title: "Submit your requirement",
        description:
          "Tell us what AC service you require and provide your contact details.",
      },
      {
        title: "Requirement confirmation",
        description:
          "Our team reviews your request and contacts you for confirmation.",
      },
      {
        title: "Service visit",
        description:
          "A service visit can be arranged according to the confirmed requirement.",
      },
      {
        title: "Work completion",
        description:
          "The requested AC service is carried out according to the agreed requirement.",
      },
    ],

    faqs: [
      {
        question: "Do you provide AC installation?",
        answer:
          "Yes. AC installation is one of the services available under AC Services.",
      },
      {
        question: "Can I request AC maintenance?",
        answer:
          "Yes. Select Maintenance in the service enquiry form.",
      },
      {
        question: "Can I submit an enquiry without describing the problem?",
        answer:
          "Yes. Problem and description are optional fields.",
      },
    ],

    formFields: [
      "name",
      "phone",
      "email",
      "location",
      "equipmentType",
      "brand",
      "model",
      "preferredDate",
      "preferredTime",
      "problem",
      "description",
    ],
  },

  {
    slug: "tv-installation-service",
    number: "02",
    title: "TV Installation & Service",
    shortTitle: "TV Installation & Service",
    description:
      "Convenient TV installation and service support for your home or office.",
    shortDescription:
      "TV installation, wall mounting and service assistance.",
    icon: "tv",

    options: [
      {
        name: "Installation",
        description:
          "Assistance with installing your television.",
      },
      {
        name: "Wall Mounting",
        description:
          "Assistance with wall mounting according to the installation requirement.",
      },
      {
        name: "Service",
        description:
          "Service assistance for televisions requiring attention.",
      },
    ],

    benefits: [
      "Installation support",
      "Wall mounting assistance",
      "Home and office service",
      "Convenient scheduling",
      "Service-specific enquiry handling",
    ],

    process: [
      {
        title: "Submit details",
        description:
          "Tell us whether you need installation, wall mounting or service.",
      },
      {
        title: "Confirmation",
        description:
          "Our team reviews the request and contacts you.",
      },
      {
        title: "Visit",
        description:
          "The service requirement is scheduled.",
      },
      {
        title: "Completion",
        description:
          "The requested TV service is completed according to the agreed requirement.",
      },
    ],

    faqs: [
      {
        question: "Do you provide wall mounting?",
        answer:
          "Yes. Wall mounting is available under TV Installation & Service.",
      },
      {
        question: "Do I need to know the exact problem?",
        answer:
          "No. The problem and description fields are optional.",
      },
    ],

    formFields: [
      "name",
      "phone",
      "email",
      "location",
      "equipmentType",
      "brand",
      "model",
      "preferredDate",
      "preferredTime",
      "problem",
      "description",
    ],
  },

  {
    slug: "water-purifier",
    number: "03",
    title: "Water Purifier",
    shortTitle: "Water Purifier",
    description:
      "Water purifier installation and service support for residential requirements.",
    shortDescription:
      "Water purifier installation, service and maintenance support.",
    icon: "water",

    options: [
      {
        name: "Installation",
        description:
          "Assistance with water purifier installation.",
      },
      {
        name: "Service",
        description:
          "Service support for water purifiers.",
      },
      {
        name: "Maintenance",
        description:
          "Maintenance assistance for residential water purifiers.",
      },
    ],

    benefits: [
      "Residential service support",
      "Installation assistance",
      "Service and maintenance",
      "Convenient enquiry process",
      "Flexible scheduling",
    ],

    process: [
      {
        title: "Submit enquiry",
        description:
          "Select the water purifier service you require.",
      },
      {
        title: "Requirement confirmation",
        description:
          "Our team reviews your request.",
      },
      {
        title: "Service visit",
        description:
          "A visit can be scheduled according to the confirmed requirement.",
      },
      {
        title: "Completion",
        description:
          "The requested work is carried out.",
      },
    ],

    faqs: [
      {
        question: "Do you provide purifier installation?",
        answer:
          "Yes. Installation is available as a Water Purifier service.",
      },
      {
        question: "Can I request maintenance?",
        answer:
          "Yes. Select Maintenance in the enquiry form.",
      },
    ],

    formFields: [
      "name",
      "phone",
      "email",
      "location",
      "equipmentType",
      "brand",
      "model",
      "preferredDate",
      "preferredTime",
      "problem",
      "description",
    ],
  },

  {
    slug: "geyser-services",
    number: "04",
    title: "Geyser Services",
    shortTitle: "Geyser Services",
    description:
      "Installation and service assistance for household geysers.",
    shortDescription:
      "Geyser installation, service and maintenance support.",
    icon: "geyser",

    options: [
      {
        name: "Installation",
        description:
          "Assistance with household geyser installation.",
      },
      {
        name: "Service",
        description:
          "Service support for household geysers.",
      },
      {
        name: "Maintenance",
        description:
          "Maintenance assistance for geysers.",
      },
    ],

    benefits: [
      "Household geyser support",
      "Installation assistance",
      "Service and maintenance",
      "Convenient scheduling",
      "Requirement-based support",
    ],

    process: [
      {
        title: "Choose service",
        description:
          "Select installation, service or maintenance.",
      },
      {
        title: "Submit requirement",
        description:
          "Provide your contact and optional equipment details.",
      },
      {
        title: "Confirmation",
        description:
          "Our team contacts you to confirm the requirement.",
      },
      {
        title: "Service completion",
        description:
          "The requested geyser service is completed.",
      },
    ],

    faqs: [
      {
        question: "Do you provide geyser installation?",
        answer:
          "Yes. Geyser installation is available.",
      },
      {
        question: "Are problem details mandatory?",
        answer:
          "No. Problem and description are optional.",
      },
    ],

    formFields: [
      "name",
      "phone",
      "email",
      "location",
      "equipmentType",
      "brand",
      "model",
      "preferredDate",
      "preferredTime",
      "problem",
      "description",
    ],
  },

  {
    slug: "fan-services",
    number: "05",
    title: "Fan Services",
    shortTitle: "Fan Services",
    description:
      "Professional fan installation and electrical support for homes and offices.",
    shortDescription:
      "Fan installation, repair and replacement support.",
    icon: "fan",

    options: [
      {
        name: "Installation",
        description:
          "Assistance with fan installation.",
      },
      {
        name: "Repair",
        description:
          "Repair assistance for fans requiring attention.",
      },
      {
        name: "Replacement",
        description:
          "Assistance with fan replacement requirements.",
      },
    ],

    benefits: [
      "Installation support",
      "Repair assistance",
      "Replacement support",
      "Home and office requirements",
      "Flexible scheduling",
    ],

    process: [
      {
        title: "Select service",
        description:
          "Choose installation, repair or replacement.",
      },
      {
        title: "Submit enquiry",
        description:
          "Provide your contact details and optional requirements.",
      },
      {
        title: "Confirmation",
        description:
          "Our team contacts you regarding your request.",
      },
      {
        title: "Work completion",
        description:
          "The requested fan service is completed.",
      },
    ],

    faqs: [
      {
        question: "Can I request fan replacement?",
        answer:
          "Yes. Fan replacement is available.",
      },
      {
        question: "Is the problem field required?",
        answer:
          "No. Problem and description are optional.",
      },
    ],

    formFields: [
      "name",
      "phone",
      "email",
      "location",
      "equipmentType",
      "brand",
      "model",
      "quantity",
      "preferredDate",
      "preferredTime",
      "problem",
      "description",
    ],
  },

  {
    slug: "electrical-work",
    number: "06",
    title: "Electrical Work",
    shortTitle: "Electrical Work",
    description:
      "General electrical assistance for household and office requirements.",
    shortDescription:
      "Electrical repairs, installation and general electrical work.",
    icon: "electrical",

    options: [
      {
        name: "Electrical Repairs",
        description:
          "Assistance with common electrical repair requirements.",
      },
      {
        name: "Installation",
        description:
          "Electrical installation assistance.",
      },
      {
        name: "General Work",
        description:
          "Support for general electrical requirements.",
      },
    ],

    benefits: [
      "Household electrical support",
      "Office electrical support",
      "Repair assistance",
      "Installation assistance",
      "General electrical work",
    ],

    process: [
      {
        title: "Describe your requirement",
        description:
          "Select the electrical service you require.",
      },
      {
        title: "Request review",
        description:
          "Our team reviews the enquiry.",
      },
      {
        title: "Schedule",
        description:
          "A suitable service visit can be arranged.",
      },
      {
        title: "Work completion",
        description:
          "The requested electrical work is carried out.",
      },
    ],

    faqs: [
      {
        question: "Do you handle general electrical work?",
        answer:
          "Yes. General Work is available under Electrical Work.",
      },
      {
        question: "Can I submit the form without describing the issue?",
        answer:
          "Yes. Problem and description are optional.",
      },
    ],

    formFields: [
      "name",
      "phone",
      "email",
      "location",
      "quantity",
      "preferredDate",
      "preferredTime",
      "problem",
      "description",
    ],
  },

  {
    slug: "plumbing",
    number: "07",
    title: "Plumbing",
    shortTitle: "Plumbing",
    description:
      "Reliable plumbing assistance for common household and office requirements.",
    shortDescription:
      "Plumbing repairs, installation and general plumbing assistance.",
    icon: "plumbing",

    options: [
      {
        name: "Repairs",
        description:
          "Assistance with common plumbing repair requirements.",
      },
      {
        name: "Installation",
        description:
          "Plumbing installation assistance.",
      },
      {
        name: "General Plumbing",
        description:
          "Support for general household and office plumbing requirements.",
      },
    ],

    benefits: [
      "Household plumbing support",
      "Office plumbing support",
      "Repair assistance",
      "Installation support",
      "General plumbing assistance",
    ],

    process: [
      {
        title: "Submit enquiry",
        description:
          "Select the plumbing service you require.",
      },
      {
        title: "Requirement review",
        description:
          "Our team reviews the information you provide.",
      },
      {
        title: "Schedule",
        description:
          "A suitable visit can be arranged.",
      },
      {
        title: "Work completion",
        description:
          "The requested plumbing work is completed.",
      },
    ],

    faqs: [
      {
        question: "Can I request general plumbing work?",
        answer:
          "Yes. General Plumbing is available as a service option.",
      },
      {
        question: "Do I need to explain the problem?",
        answer:
          "No. Problem, location and description are optional fields.",
      },
    ],

    formFields: [
      "name",
      "phone",
      "email",
      "location",
      "preferredDate",
      "preferredTime",
      "problem",
      "description",
    ],
  },
];

export function getServiceBySlug(
  slug: string,
): Service | undefined {
  return services.find(
    (service) => service.slug === slug,
  );
}