import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import FormReservation from "@/components/ui/reservationContent/FormReservation";

function index() {
  return (
    <div>
      <HeaderPages namePage="Reservation" />


      <FormReservation />
    </div>
  );
}

export default index;
