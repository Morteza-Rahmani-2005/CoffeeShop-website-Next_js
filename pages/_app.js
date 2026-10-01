import Footer from "@/components/layout/footer/Footer";
import NavBar from "@/components/layout/navBar/NavBar";
import BtnTopScroll from "@/components/modules/btn_top_scroll/BtnTopScroll";
import { ConfirmProvider } from "@/lib/ConfirmContext";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

export default function App({ Component, pageProps }) {
  const rout = useRouter();

  const isDashboard = rout.pathname.startsWith("/panel-dashboard");

  return (
    <>
      <div className={isDashboard && "cad-root"}>
        <ConfirmProvider>
          {!isDashboard && <NavBar />}
          <Component {...pageProps} />
          {!isDashboard && <Footer />}
          {!isDashboard && <BtnTopScroll />}


        </ConfirmProvider>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3200,
            style: {
              background: "var(--cad-bg-elevated)",
              color: "var(--cad-text)",
              border: "1px solid var(--cad-border-soft)",
              borderRadius: "12px",
              fontFamily: "var(--cad-font-body)",
              fontSize: "0.85rem",
              boxShadow: "0 12px 28px -12px rgba(0,0,0,0.4)",
            },
            success: { iconTheme: { primary: "#8ca06b", secondary: "#1c1510" } },
            error: { iconTheme: { primary: "#e07159", secondary: "#1c1510" } },
          }}
        />
      </div>





    </>
  );
}
