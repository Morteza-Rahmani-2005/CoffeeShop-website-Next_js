import BsTable from "react-bootstrap/Table";
import styles from "./DataTable.module.css";

export default function DataTable({ children, className = "" }) {
  return (
    <div className="table-responsive">
      <BsTable className={`${styles.table} ${className}`} responsive={false} borderless>
        {children}
      </BsTable>
    </div>
  );
}
