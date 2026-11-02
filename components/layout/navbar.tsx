import Link from "next/link";
import { ArrowDownToLine } from "lucide-react";
import { navigation, site } from "@/data/site";
import { Container } from "../ui/container";
import { MobileNavigation } from "./mobile-navigation";

export function Navbar() {
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link href="/" className="wordmark" aria-label="Neil Atienza — home">
          neil<span className="wordmark-dot">.</span>
        </Link>
        <nav className="desktop-navigation" aria-label="Main navigation">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        {site.resume ? (
          <a className="header-cv" href={site.resume} download>
            Download CV <ArrowDownToLine size={15} aria-hidden="true" />
          </a>
        ) : (
          <span
            className="header-cv cv-pending"
            aria-label="Résumé not yet available"
          >
            CV coming soon <ArrowDownToLine size={15} aria-hidden="true" />
          </span>
        )}
        <MobileNavigation links={navigation} resume={site.resume} />
      </Container>
    </header>
  );
}
