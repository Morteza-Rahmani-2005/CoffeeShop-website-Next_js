import styles from "./StatusBadge.module.css";

const TONE_BY_STATUS = {
  ready: "positive",
  active: "positive",
  confirmed: "positive",
  brewing: "accent",
  seated: "accent",
  pending: "info",
  canceled: "negative",
  suspended: "negative",
};

export default function StatusBadge({ status, label, onClick, title }) {
  const tone = TONE_BY_STATUS[status] || "info";
  const cls = [styles.badge, styles[tone], onClick ? styles.clickable : ""].filter(Boolean).join(" ");
  return (
    <span className={cls} onClick={onClick} title={title} role={onClick ? "button" : undefined}>
      {label}
    </span>
  );
}
