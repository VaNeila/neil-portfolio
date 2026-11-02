import Link from "next/link";
import type { ReactNode } from "react";

export function Button({
  href,
  children,
  secondary = false,
  download,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
  download?: boolean;
}) {
  const className = `button ${secondary ? "button-secondary" : "button-primary"}`;
  if (download || href.startsWith("mailto:")) {
    return (
      <a href={href} download={download} className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
