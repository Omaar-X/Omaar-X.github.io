import { profile } from "./profile";

export type ContactMethod = {
  id: string;
  label: string;
  value: string;
  href: string;
  download?: string;
};

export const contactEmail: ContactMethod = {
  id: "email",
  label: "Email",
  value: profile.email,
  href: `mailto:${profile.email}`,
};

export const contactMethods: readonly ContactMethod[] = [
  {
    id: "phone",
    label: "Phone",
    value: profile.phone.display,
    href: `tel:${profile.phone.e164}`,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: "Message on WhatsApp",
    href: profile.phone.whatsapp,
  },
  ...profile.socials.map((social) => ({
    id: social.id,
    label: social.label,
    value: social.handle,
    href: social.href,
  })),
  {
    id: "cv",
    label: "CV",
    value: "Download CV (PDF)",
    href: profile.cv.general.href,
    download: profile.cv.general.fileName,
  },
];
