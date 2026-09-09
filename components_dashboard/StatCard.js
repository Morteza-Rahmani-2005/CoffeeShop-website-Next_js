import styles from "./StatCard.module.css";

export default function StatCard({
  icon,
  tone = "accent",
  label,
  value,
  delta,
  direction,
}) {
  return (
    <div className={styles.card}>
      <div className={`${styles.icon} ${styles[tone]}`}>
        <span>{icon}</span>
      </div>
      <div className={styles.row}>
        <div>
          <div className={styles.value}>{value}</div>
          <div className={styles.label}>{label}</div>
        </div>
        {delta && (
          <span
            className={`${styles.delta} ${direction === "up" ? styles.up : styles.down}`}
          >
            <i
              className={`bi ${direction === "up" ? "bi-arrow-up-short" : "bi-arrow-down-short"}`}
            />
            {delta}
          </span>
        )}
      </div>
    </div>
  );
}
