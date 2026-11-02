import { ArrowUpRight, Building2 } from "lucide-react";
import { experience } from "@/data/experience";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      tabIndex={-1}
      className="section experience-section"
    >
      <Container>
        <SectionHeading
          number="02"
          eyebrow="Experience"
          title="Real systems. Practical experience."
          description="Working across the frontend, the backend, and the details that connect them."
        />
        <div className="experience-list">
          {experience.map((job) => (
            <article key={job.organization} className="experience-row">
              <div className="experience-organization">
                <span className="organization-icon">
                  <Building2 size={21} aria-hidden="true" />
                </span>
                <div>
                  <h3>{job.organization}</h3>
                  <p>{job.description}</p>
                  {job.dates && <p>{job.dates}</p>}
                </div>
              </div>
              <div className="experience-detail">
                <h4>
                  {job.role}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </h4>
                <ul>
                  {job.responsibilities.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="experience-technologies">
                  {job.technologies.join(" / ")}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
