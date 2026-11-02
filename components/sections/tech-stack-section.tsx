import { skillGroups } from "@/data/skills";
import { Container } from "../ui/container";
import { SectionHeading } from "../ui/section-heading";

export function TechStackSection() {
  return (
    <section id="skills" tabIndex={-1} className="section skills-section">
      <Container>
        <SectionHeading
          number="03"
          eyebrow="The toolkit"
          title="The right tools. A solid foundation."
          description="A practical stack for building across the web, from the first screen to the last API response."
        />
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="skill-group" key={group.title}>
              <span className="small-label">{group.number} /</span>
              <h3>{group.title}</h3>
              <p>{group.description}</p>
              <ul>
                {group.skills.map((skill) => (
                  <li key={skill}>{skill}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
