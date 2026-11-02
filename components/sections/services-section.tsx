import { AppWindow, Layers3, Workflow } from "lucide-react";
import { services } from "@/data/site";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";

const icons = { window: AppWindow, layers: Layers3, workflow: Workflow };

export function ServicesSection() {
  return (
    <section id="services" tabIndex={-1} className="section services-section">
      <Container>
        <SectionHeading
          number="04"
          eyebrow="How I can help"
          title="An idea in mind? Let’s build it."
          description="Web development for people and businesses that value clarity, usability, and attention to detail."
        />
        <div className="services-grid">
          {services.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article className="service" key={service.title}>
                <div className="service-icon">
                  <Icon size={24} strokeWidth={1.5} aria-hidden="true" />
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <p className="service-detail">{service.detail}</p>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
