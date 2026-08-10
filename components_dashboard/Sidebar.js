import Link from "next/link";
import { useRouter } from "next/router";
import { useStore, useCurrentAdmin } from "../lib/store";
import styles from "./Sidebar.module.css";
import { BiBookContent, BiSolidDashboard } from "react-icons/bi";
import { CgList } from "react-icons/cg";
import { BsCardChecklist, BsCupHot, BsCupHotFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";

const NAV_ITEMS = [
  {
    href: "/panel-dashboard/dashboard",
    label: "Dashboard",
    icon: <BiSolidDashboard />,
  },
  {
    href: "/panel-dashboard/products",
    label: "Products",
    icon: <BsCupHotFill />,
  },
  { href: "/panel-dashboard/orders", label: "Orders", icon: <CgList /> },
  {
    href: "/panel-dashboard/reservations",
    label: "Reservations",
    icon: <BsCardChecklist />,
  },
  {
    href: "/panel-dashboard/content",
    label: "Site Content",
    icon: <BiBookContent />,
  },
  { href: "/panel-dashboard/admins", label: "Admins", icon: <FaUserFriends /> },
];

export default function Sidebar({ onNavigate }) {
  const router = useRouter();
  const siteName = useStore((s) => s.content.siteName);
  const admin = useCurrentAdmin();
  const adminInitials = admin
    ? admin.name
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className={styles.sidebar}>
      <div className={styles.brand}>
        <div className={styles.brandMark}>
          <BsCupHot />
        </div>
        <div>
          <div className={styles.brandTitle}>{siteName}</div>
          <div className={styles.brandSub}>Admin Dashboard</div>
        </div>
      </div>

      <nav>
        <div className={styles.navLabel}>Main</div>
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={`${styles.link} ${router.pathname === item.href ? styles.active : ""}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </Link>
        ))}
      </nav>

      <Link
        href="/panel-dashboard/profile"
        onClick={onNavigate}
        className={`${styles.user} ${router.pathname === "/profile" ? styles.userActive : ""}`}
      >
        <div className={styles.avatar}>{adminInitials}</div>
        <div className={styles.userInfo}>
          <div className={styles.userName}>{admin?.name || "…"}</div>
          <div className={styles.userRole}>{admin?.role || ""}</div>
        </div>
        <i className={`bi bi-pencil-square ${styles.userEdit}`} />
      </Link>
    </div>
  );
}
