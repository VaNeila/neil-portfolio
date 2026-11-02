import { ArrowDown, ArrowUpRight, ArrowDownToLine } from "lucide-react";
import { site } from "@/data/site";
import { Container } from "../ui/container";
import { Button } from "../ui/button";

export function HeroSection() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <Container>
        <div className="hero-content">
          <p className="eyebrow hero-eyebrow">
            <span className="accent-dash" />
            {site.name}
          </p>
          <p className="hero-role">Full-Stack Web Developer</p>
          <h1 id="hero-title">
            Building <span>modern web experiences</span> and reliable digital
            solutions<span className="heading-period">.</span>
          </h1>
          <p className="hero-description">
            I’m Neil, a developer working across React, Next.js, and Laravel. I
            bring thoughtful interfaces and dependable backend systems together
            to build things that work beautifully.
          </p>
          <div className="hero-actions">
            <Button href="/#work">
              View my work <ArrowDown size={17} aria-hidden="true" />
            </Button>
            <Button href="/#contact" secondary>
              Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
            </Button>
          </div>
          {site.resume && (
            <a href={site.resume} download className="hero-cv text-link">
              <ArrowDownToLine size={15} aria-hidden="true" />
              Download CV
            </a>
          )}
        </div>
        <div className="hero-bottom">
          <div className="hero-stack">
            <span className="small-label">MY CORE TOOLKIT</span>
            <span>React</span>
            <span>Next.js</span>
            <span>Laravel</span>
          </div>
          <a href="#work" className="scroll-cue">
            A little further, a closer look{" "}
            <ArrowDown size={15} aria-hidden="true" />
          </a>
        </div>
      </Container>
    </section>
  );
}
