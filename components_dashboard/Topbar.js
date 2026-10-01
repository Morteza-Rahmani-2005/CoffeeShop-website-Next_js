import Link from "next/link";
import styles from "./Topbar.module.css";
import { BiBell, BiMenu, BiSearch } from "react-icons/bi";

const adminInitials = "AR";

export default function Topbar({ title, subtitle, onOpenMenu }) {

  return (
    <div className={styles.topbar}>
      <button
        className={`${styles.iconBtn} ${styles.menuBtn}`}
        type="button"
        onClick={onOpenMenu}
        aria-label="Open menu"
      >
        <BiMenu />
      </button>

      <div className={styles.titleBlock}>
        <div className={styles.title}>{title}</div>
        {subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>

      <div className={styles.search}>
        <BiSearch />
        <input type="text" placeholder="Search orders, customers, tables..." />
      </div>

      <div className={styles.right}>
        <button
          className={`${styles.iconBtn} ${styles.notif}`}
          type="button"
          aria-label="Notifications"
        >
          <BiBell />
          <span className={styles.notifDot} />
        </button>
        <button
          className={`${styles.iconBtn} ${styles.searchBtnMobile}`}
          type="button"
          aria-label="Search"
        >
          <i className="bi bi-search" />
        </button>
        <Link
          href="/panel-dashboard/profile"
          className={styles.avatar}
          title="My Profile"
        >
          {adminInitials}
        </Link>
      </div>
    </div>
  );
}
