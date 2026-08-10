import Form from "react-bootstrap/Form";
import styles from "./StatusSelect.module.css";

export default function StatusSelect({ value, onChange, options, ariaLabel }) {
  return (
    <Form.Select
      size="sm"
      className={styles.select}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={ariaLabel}
    >
      {options.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </Form.Select>
  );
}
