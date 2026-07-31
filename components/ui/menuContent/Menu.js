import Image from "next/image";
import React, { useEffect, useState } from "react";
import ImageMenu1 from "@/public/img/menu-1.jpg";
import ImageMenu2 from "@/public/img/menu-2.jpg";
import ImageMenu3 from "@/public/img/menu-3.jpg";
import Link from "next/link";
export default function Menu() {
  const [productsCaffee, setProductsCaffee] = useState();
  useEffect(function () {
    async function fetchProducts() {
      const res = await fetch("/api/products");
      const data = await res.json();
      setProductsCaffee(data?.products);
    }
    fetchProducts();
  }, []);

  console.log(productsCaffee);
  return (
    <div className="container-fluid pt-5">
      <div className="container">
        <div className="section-title">
          <h4 className="text-uppercase" style={{ letterSpacing: "5px" }}>
            Menu & Pricing
          </h4>
          <h1 className="display-4">Competitive Pricing</h1>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <h1 className="mb-5">Hot Coffee</h1>
            {productsCaffee
              ?.filter((item) => item.category == "Hot Coffee")
              .map((item) => (
                <Link key={item.id} href={`/products/${item.id}`}>
                  <div className="row align-items-center mb-5">
                    <div className="col-4 col-sm-3 d-flex">
                      <Image
                        className="w-100 h-100 rounded-circle mb-3 mb-sm-0"
                        src={item.image}
                        alt=""
                        width={1000}
                        height={1000}
                      />
                      <h5 className="menu-price">{item.price}</h5>
                    </div>
                    <div className="col-8 col-sm-9">
                      <h4>{item.title}</h4>
                      <p className="m-0">{item.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>

          <div className="col-lg-6">
            <h1 className="mb-5">Cold Coffee</h1>

            {productsCaffee
              ?.filter((item) => item.category == "Cold Coffee")
              .map((item) => (
                <div key={item.id} className="row align-items-center mb-5">
                  <div className="col-4 col-sm-3 d-flex">
                    <Image
                      className="w-100 h-100 rounded-circle mb-3 mb-sm-0"
                      src={item.image}
                      alt=""
                      width={1000}
                      height={1000}
                    />
                    <h5 className="menu-price">{item.price}</h5>
                  </div>
                  <div className="col-8 col-sm-9">
                    <h4>{item.title}</h4>
                    <p className="m-0">{item.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
