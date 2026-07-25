import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import ServicesSection from "@/components/ui/servicesContent/ServicesSection"

function index() {
  return (
    <div>
      <HeaderPages namePage="Services" />


      <ServicesSection />
    </div>
  );
}

export default index;
