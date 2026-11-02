"use client";

import { useRef } from "react";
import { Menu, X } from "lucide-react";

export function MobileNavigation({
  links,
  resume,
}: {
  links: readonly { label: string; href: string }[];
  resume: string | null;
}) {
  const details = useRef<HTMLDetailsElement>(null);
  function close(restoreFocus: boolean) {
    if (!details.current) return;
    details.current.open = false;
    if (restoreFocus) details.current.querySelector("summary")?.focus();
  }
  return (
    <details
      ref={details}
      className="mobile-navigation"
      onKeyDown={(event) => {
        if (event.key === "Escape" && details.current?.open) {
          event.preventDefault();
          close(true);
        }
      }}
    >
      <summary>
        <span>Menu</span>
        <Menu className="menu-open-icon" size={19} aria-hidden="true" />
        <X className="menu-close-icon" size={19} aria-hidden="true" />
      </summary>
      <nav
        aria-label="Mobile navigation"
        onClick={(event) => {
          const link = (event.target as HTMLElement).closest("a");
          if (link) {
            close(false);
            const hash = new URL(link.href).hash;
            // Focus the destination after native same-page anchor navigation. A closed
            // disclosure must not retain focus on one of its hidden links.
            requestAnimationFrame(() => {
              const destination = hash
                ? document.getElementById(hash.slice(1))
                : null;
              if (destination) destination.focus({ preventScroll: true });
              else details.current?.querySelector("summary")?.focus();
            });
          }
        }}
      >
        {links.map((link) => (
          <a key={link.href} href={link.href}>
            {link.label}
          </a>
        ))}
        {resume && (
          <a href={resume} download>
            Download CV
          </a>
        )}
      </nav>
    </details>
  );
}
