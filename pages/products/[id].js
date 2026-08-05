import HeaderPages from "@/components/layout/headerPages/HeaderPages";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function ditailsProduct() {
  const rout = useRouter();
  const [detailsProduct, setDetailsProduct] = useState();
  useEffect(
    function () {
      async function fetchDetailsProduct() {
        const res = await fetch(`/api/products/${rout.query.id}`);
        const data = await res.json();
        setDetailsProduct(data?.detailsProduct);
      }
      fetchDetailsProduct();
    },
    [rout],
  );

  console.log(detailsProduct);

  return (
    <div>
      <HeaderPages namePage="Product Details" />
      <div>
        <p>{detailsProduct?.title}</p>
      </div>
    </div>
  );
}

export default ditailsProduct;
