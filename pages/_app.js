import Footer from "@/components/layout/footer/Footer";
import NavBar from "@/components/layout/navBar/NavBar";
import BtnTopScroll from "@/components/modules/btn_top_scroll/BtnTopScroll";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const rout = useRouter();

  const isDashboard = rout.pathname.startsWith("/dashboard");

  return (
    <>
      {!isDashboard && <NavBar />}
      <Component {...pageProps} />
      {!isDashboard && <Footer />}
      {!isDashboard && <BtnTopScroll />}

      <Toaster position="top-right" />
    </>
  );
}
