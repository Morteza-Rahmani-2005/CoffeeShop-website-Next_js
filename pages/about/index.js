import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import AboutContent from "@/components/ui/aboutContent/AboutServingSection";

export default function index() {
  return (
    <div>
      <HeaderPages namePage="About Us" />

      <AboutContent />
    </div>
  );
}
