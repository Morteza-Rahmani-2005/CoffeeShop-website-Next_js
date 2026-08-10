import { useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import styles from "./Layout.module.css";

export default function Layout({ children, title, subtitle }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className={styles.shell}>
      <div className={styles.desktopSidebar}>
        <Sidebar />
      </div>

      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} className={styles.offcanvas}>
        <Offcanvas.Header closeButton closeVariant="white" />
        <Offcanvas.Body className={styles.offcanvasBody}>
          <Sidebar onNavigate={() => setShowMenu(false)} />
        </Offcanvas.Body>
      </Offcanvas>

      <div className={styles.main}>
        <Topbar title={title} subtitle={subtitle} onOpenMenu={() => setShowMenu(true)} />
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
