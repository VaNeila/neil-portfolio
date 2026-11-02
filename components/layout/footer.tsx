import Link from "next/link";
import { site } from "@/data/site";
import { Container } from "../ui/container";

export function Footer() {
  return (
    <footer className="site-footer">
      <Container className="footer-inner">
        <div>
          <Link href="/" className="wordmark" aria-label="Neil Atienza — home">
            neil<span className="wordmark-dot">.</span>
          </Link>
          <p>Thoughtful interfaces. Reliable foundations.</p>
        </div>
        <div className="footer-right">
          <nav aria-label="Footer navigation">
            <Link href="/projects/">All work</Link>
            <Link href="/#contact">Contact</Link>
            {site.github && <a href={site.github}>GitHub</a>}
          </nav>
          <p>
            © {new Date().getFullYear()} {site.shortName}
          </p>
        </div>
      </Container>
    </footer>
  );
}
