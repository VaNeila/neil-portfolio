import { Code2, GraduationCap } from "lucide-react";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";

export function AboutSection() {
  return (
    <section id="about" tabIndex={-1} className="section about-section">
      <Container className="about-grid">
        <div>
          <SectionHeading
            number="05"
            eyebrow="A little about me"
            title="An engineering mindset. A human approach."
          />
          <div className="about-facts">
            <span>
              <GraduationCap size={18} aria-hidden="true" />
              Computer Engineering graduate
            </span>
            <span>
              <Code2 size={18} aria-hidden="true" />
              Frontend to backend
            </span>
          </div>
        </div>
        <div className="about-narrative">
          <p>
            I’m Neil, a Computer Engineering graduate and full-stack web
            developer. My work brings together the structure of engineering and
            the care of designing for people.
          </p>
          <p>
            Working on university applications has given me practical experience
            with frontend interfaces, backend services, and the existing systems
            they need to fit into. Independent projects give me room to explore
            a more expressive side of the web.
          </p>
          <p>
            I care about clear interfaces, maintainable code, and the small
            details that make a product feel considered. Whether it’s a business
            application or a digital invitation, I want it to be useful, fast,
            and easy to use.
          </p>
          <span className="about-signature">
            Neil Atienza<span> / Developer & problem solver</span>
          </span>
        </div>
      </Container>
    </section>
  );
}
