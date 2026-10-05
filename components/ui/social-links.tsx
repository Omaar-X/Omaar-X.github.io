import { GitBranch, Mail, MessageCircle, Phone, type LucideIcon } from "lucide-react";
import { contactEmail, contactMethods, type ContactMethod } from "@/data/contact";
import { cn } from "@/lib/cn";
import { SmartLink } from "./smart-link";

const icons: Record<string, LucideIcon> = {
  email: Mail,
  phone: Phone,
  whatsapp: MessageCircle,
  github: GitBranch,
};

const links: readonly ContactMethod[] = [
  contactEmail,
  ...contactMethods.filter((method) => method.id in icons),
];

/** Round icon buttons for every way to reach Omar (email, phone, WhatsApp, GitHub). */
export function SocialLinks({ tone = "light", className }: { tone?: "light" | "dark"; className?: string }) {
  return (
    <ul aria-label="Ways to reach Omar" className={cn("flex flex-wrap gap-2.5", className)}>
      {links.map((link) => {
        const Icon = icons[link.id] ?? Mail;
        return (
          <li key={link.id}>
            <SmartLink
              href={link.href}
              aria-label={`${link.label}: ${link.value}`}
              className={cn(
                "grid size-11 place-items-center rounded-full transition-[background-color,color,translate] duration-300 ease-editorial hover:-translate-y-0.5",
                tone === "light"
                  ? "border border-border bg-surface text-accent-strong shadow-elevated hover:bg-accent hover:text-on-accent"
                  : "bg-white/8 text-on-ink ring-1 ring-white/12 hover:bg-accent-soft hover:text-ink",
              )}
            >
              <Icon aria-hidden strokeWidth={1.75} className="size-[1.125rem]" />
            </SmartLink>
          </li>
        );
      })}
    </ul>
  );
}
