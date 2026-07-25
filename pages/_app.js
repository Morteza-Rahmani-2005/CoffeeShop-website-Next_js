import Footer from "@/components/layout/footer/Footer";
import NavBar from "@/components/layout/navBar/NavBar";
import BtnTopScroll from "@/components/modules/btn_top_scroll/BtnTopScroll";
import "@/styles/globals.css";
import 'bootstrap/dist/css/bootstrap.min.css'


export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
      <BtnTopScroll />
    </>
  );
}
