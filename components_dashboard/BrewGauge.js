import styles from "./BrewGauge.module.css";

export default function BrewGauge({ percent = 68, label = "Today's goal" }) {
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.max(0, Math.min(100, percent));
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div className={styles.gauge}>
      <svg viewBox="0 0 148 148">
        <defs>
          <linearGradient id="cadCremaGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e8b877" />
            <stop offset="100%" stopColor="#c1793f" />
          </linearGradient>
        </defs>
        <circle className={styles.track} cx="74" cy="74" r={radius} />
        <circle
          className={styles.fill}
          cx="74"
          cy="74"
          r={radius}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className={styles.center}>
        <div className={styles.value}>{clamped}%</div>
        <div className={styles.label}>{label}</div>
      </div>
    </div>
  );
}
