import { HeroSection } from "@/components/sections/hero-section";
import { FeaturedProjectsSection } from "@/components/sections/featured-projects-section";
import { ExperienceSection } from "@/components/sections/experience-section";
import { TechStackSection } from "@/components/sections/tech-stack-section";
import { ServicesSection } from "@/components/sections/services-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturedProjectsSection />
      <ExperienceSection />
      <TechStackSection />
      <ServicesSection />
      <AboutSection />
      <ContactSection />
    </>
  );
}
