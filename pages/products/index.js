import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import Menu from "@/components/ui/menuContent/Menu";

function index() {
  return (
    <div>
      <HeaderPages namePage="Menu" />

      <Menu />
    </div>
  );
}

export default index;
