import HeroSection from "@/components/sections/HeroSection";
import LibraryPreview from "@/components/sections/LibraryPreview";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <LibraryPreview />
      <FeaturesSection />
      <TestimonialsSection />
    </div>
  );
}
