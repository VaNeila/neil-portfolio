import { ArrowUpRight, Mail, ArrowDownToLine } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "../ui/container";

export function ContactSection() {
  return (
    <section id="contact" tabIndex={-1} className="contact-section">
      <Container>
        <div className="contact-panel">
          <div>
            <p className="eyebrow">
              <span className="section-number">06</span>Let’s connect
            </p>
            <h2>
              Good work starts
              <br />
              with a conversation<span>.</span>
            </h2>
            <p>
              Have a website in mind, a development role to discuss,
              <br className="desktop-break" /> or an interesting problem to
              solve? Let’s talk.
            </p>
          </div>
          <div className="contact-actions">
            {site.email ? (
              <a className="contact-email" href={`mailto:${site.email}`}>
                <Mail size={20} aria-hidden="true" />
                <span>{site.email}</span>
                <ArrowUpRight size={20} aria-hidden="true" />
              </a>
            ) : (
              <div className="contact-placeholder">
                <Mail size={22} aria-hidden="true" />
                <span>Contact details coming soon</span>
              </div>
            )}
            <div className="contact-links">
              {site.github && (
                <a href={site.github}>
                  GitHub <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {site.linkedin && (
                <a href={site.linkedin}>
                  LinkedIn <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              )}
              {site.resume ? (
                <a href={site.resume} download>
                  Download CV <ArrowDownToLine size={15} aria-hidden="true" />
                </a>
              ) : (
                <span>Résumé coming soon</span>
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
