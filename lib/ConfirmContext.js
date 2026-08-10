import { createContext, useCallback, useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "@/components_dashboard/ConfirmModal.module.css";

const ConfirmContext = createContext(null);

export function ConfirmProvider({ children }) {
  const [request, setRequest] = useState(null);

  const confirm = useCallback((options) => {
    const opts = typeof options === "string" ? { message: options } : options;
    return new Promise((resolve) => setRequest({ ...opts, resolve }));
  }, []);

  const close = (result) => {
    request?.resolve(result);
    setRequest(null);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <Modal show={!!request} onHide={() => close(false)} centered contentClassName={styles.content}>
        <Modal.Header closeButton closeVariant="white" className={styles.header}>
          <Modal.Title className={styles.title}>{request?.title || "Please confirm"}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.body}>{request?.message}</Modal.Body>
        <Modal.Footer className={styles.footer}>
          <Button variant="outline-light" className={styles.cancelBtn} onClick={() => close(false)}>
            Cancel
          </Button>
          <Button variant="danger" className={styles.confirmBtn} onClick={() => close(true)}>
            {request?.confirmLabel || "Confirm"}
          </Button>
        </Modal.Footer>
      </Modal>
    </ConfirmContext.Provider>
  );
}

export const useConfirm = () => useContext(ConfirmContext);
