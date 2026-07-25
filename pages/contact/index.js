import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import FormContact from "@/components/ui/ContactContent/FormContact";

function index() {
  return (
    <div>
      <HeaderPages namePage="Contact" />
      <FormContact />

    </div>
  );
}

export default index;
