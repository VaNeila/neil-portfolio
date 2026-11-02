import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="not-found">
      <Container>
        <p className="eyebrow">
          <span className="accent-dash" />
          404 · A small detour
        </p>
        <h1>This page isn’t here.</h1>
        <p>
          The link may have changed, or the project might not be public yet.
          There’s still more to explore.
        </p>
        <div className="hero-actions">
          <Button href="/">
            <ArrowLeft size={17} aria-hidden="true" />
            Back to home
          </Button>
          <Button href="/projects/" secondary>
            Explore the work <ArrowUpRight size={17} aria-hidden="true" />
          </Button>
        </div>
      </Container>
    </section>
  );
}
