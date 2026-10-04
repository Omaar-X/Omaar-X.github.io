import { profile } from "./profile";

export type ContactMethod = {
  id: string;
  label: string;
  value: string;
  href: string;
  download?: string;
};

const github = profile.socials.find((social) => social.id === "github");

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

export const footerLinks: readonly ContactMethod[] = [
  ...(github ? [{ id: github.id, label: github.label, value: github.handle, href: github.href }] : []),
  ...profile.socials.filter((social) => social.id !== "github").map((social) => ({
    id: social.id,
    label: social.label,
    value: social.handle,
    href: social.href,
  })),
  contactEmail,
  contactMethods.find((method) => method.id === "cv"),
].filter((method): method is ContactMethod => Boolean(method));
