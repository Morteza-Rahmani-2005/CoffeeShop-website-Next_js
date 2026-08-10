import styles from "./Panel.module.css";

export default function Panel({ children, className = "", padded = true }) {
  return <div className={`${styles.panel} ${padded ? styles.padded : ""} ${className}`}>{children}</div>;
}
