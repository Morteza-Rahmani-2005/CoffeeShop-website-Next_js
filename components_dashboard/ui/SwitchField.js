import Form from "react-bootstrap/Form";
import styles from "./SwitchField.module.css";

export default function SwitchField({ checked, onChange, label }) {
  return (
    <div className={styles.wrapper}>
      <Form.Check
        type="switch"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        label={label}
      />
    </div>
  );
}
