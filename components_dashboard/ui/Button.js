import BsButton from "react-bootstrap/Button";
import styles from "./Button.module.css";

const VARIANT_CLASS = {
  brew: styles.brew,
  ghost: styles.ghost,
  danger: styles.danger,
  chip: styles.chip,
};

export default function Button({ variant = "brew", active = false, className = "", children, ...rest }) {
  const cls = [VARIANT_CLASS[variant] || styles.brew, active ? styles.active : "", className].filter(Boolean).join(" ");
  return (
    <BsButton variant="light" className={cls} {...rest}>
      {children}
    </BsButton>
  );
}
