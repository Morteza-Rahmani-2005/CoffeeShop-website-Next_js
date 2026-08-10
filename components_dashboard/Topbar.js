import Link from "next/link";
import { useCurrentAdmin } from "../lib/store";
import styles from "./Topbar.module.css";

export default function Topbar({ title, subtitle, onOpenMenu }) {
  const admin = useCurrentAdmin();
  const adminInitials = admin
    ? admin.name.split(" ").filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase()
    : "?";

  return (
    <div className={styles.topbar}>
      <button className={`${styles.iconBtn} ${styles.menuBtn}`} type="button" onClick={onOpenMenu} aria-label="Open menu">
        <i className="bi bi-list" style={{ fontSize: "1.3rem" }} />
      </button>

      <div className={styles.titleBlock}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>

      <div className={styles.search}>
        <i className="bi bi-search" />
        <input type="text" placeholder="Search orders, customers, tables..." />
      </div>

      <div className={styles.right}>
        <button className={`${styles.iconBtn} ${styles.notif}`} type="button" aria-label="Notifications">
          <i className="bi bi-bell" />
          <span className={styles.notifDot} />
        </button>
        <button className={`${styles.iconBtn} ${styles.searchBtnMobile}`} type="button" aria-label="Search">
          <i className="bi bi-search" />
        </button>
        <Link href="/profile" className={styles.avatar} title="My Profile">
          {adminInitials}
        </Link>
      </div>
    </div>
  );
}
