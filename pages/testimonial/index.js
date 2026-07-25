import HeaderPages from '@/components/layout/headerPages/HeaderPages';
import SliderClientsSection from '@/components/ui/testimonialContent/SliderClientsSection';

function index() {
  return (
    <div>
      <HeaderPages namePage="Testimonial" />


      <SliderClientsSection />
    </div>
  );
}

export default index;
