
import AboutContent from '@/components/ui/aboutContent/AboutServingSection';
import ServicesContent from '@/components/ui/servicesContent/ServicesSection';
import OfferSection from '@/components/ui/indexContent/OfferSection';
import Menu from '@/components/ui/menuContent/Menu';
import FormReservation from '@/components/ui/reservationContent/FormReservation';
import SliderClientsSection from '@/components/ui/testimonialContent/SliderClientsSection';
import SliderSection from '@/components/ui/indexContent/SliderSection';

function Index() {
  return (
    <div>
      <SliderSection />
      <AboutContent />
      <ServicesContent />
      <OfferSection />
      <Menu />
      <FormReservation />
      <SliderClientsSection />
    </div>
  );
}

export default Index;
