import Head from "next/head";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import ModalBs from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import PageHeader from "@/components_dashboard/ui/PageHeader";
import Panel from "@/components_dashboard/ui/Panel";
import StatCard from "@/components_dashboard/StatCard";
import StatusSelect from "@/components_dashboard/ui/StatusSelect";
import { useStore } from "@/lib/store";
import { useConfirm } from "@/lib/ConfirmContext";
import modalStyles from "@/components_dashboard/ui/modalTheme.module.css";
import formStyles from "@/components_dashboard/ui/form.module.css";
import styles from "./reservations.module.css";

const STATUSES = ["pending", "confirmed", "seated", "canceled"];
const STATUS_LABEL = { pending: "Pending", confirmed: "Confirmed", seated: "Seated", canceled: "Canceled" };
const DEFAULT_VALUES = { table: "", name: "", phone: "", time: "", guests: "2", status: "pending" };

export default function index() {
  const siteName = useStore((s) => s.content.siteName);
  const reservations = useStore((s) => s.reservations);
  const addReservation = useStore((s) => s.addReservation);
  const updateReservation = useStore((s) => s.updateReservation);
  const deleteReservation = useStore((s) => s.deleteReservation);
  const confirm = useConfirm();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: DEFAULT_VALUES });

  const openCreate = () => {
    setEditingId(null);
    reset(DEFAULT_VALUES);
    setModalOpen(true);
  };

  const openEdit = (r) => {
    setEditingId(r.id);
    reset({ table: r.table, name: r.name, phone: r.phone, time: r.time, guests: String(r.guests), status: r.status });
    setModalOpen(true);
  };

  const onSubmit = (data) => {
    const payload = { ...data, guests: parseInt(data.guests, 10) || 1 };
    if (editingId) {
      updateReservation(editingId, payload);
      toast.success(`Reservation for ${data.name} was updated.`);
    } else {
      addReservation(payload);
      toast.success(`Reservation for ${data.name} was created.`);
    }
    setModalOpen(false);
  };

  const handleDelete = async (r) => {
    const ok = await confirm({ title: "Cancel reservation", message: `Remove the reservation for ${r.name} (Table ${r.table})?`, confirmLabel: "Remove" });
    if (ok) {
      deleteReservation(r.id);
      toast.error(`Reservation for ${r.name} was removed.`);
    }
  };

  const emptyTables = 12 - reservations.filter((r) => r.status !== "canceled").length;
  const avgGuests = reservations.length
    ? (reservations.reduce((s, r) => s + Number(r.guests || 0), 0) / reservations.length).toFixed(1)
    : "0.0";
  const pendingCount = reservations.filter((r) => r.status === "pending").length;
  const statusOptions = STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s] }));

  return (
    <>
      <Head>
        <title>Reservations | {siteName}</title>
      </Head>
      <Layout title="Reservations" subtitle="Manage table bookings">
        <PageHeader title="Reservations" subtitle={`${reservations.length} reservations on the books`}>
          <Button variant="brew" onClick={openCreate}>
            <i className="bi bi-plus-lg me-1" /> New reservation
          </Button>
        </PageHeader>

        <div className="row g-3 mb-4">
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-calendar2-week-fill" tone="accent" label="Reservations today" value={reservations.length} />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-door-open-fill" tone="positive" label="Open tables" value={Math.max(emptyTables, 0)} />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-person-fill" tone="info" label="Avg. party size" value={avgGuests} />
          </div>
          <div className="col-6 col-lg-3">
            <StatCard icon="bi-hourglass-split" tone="negative" label="Awaiting confirmation" value={pendingCount} />
          </div>
        </div>

        <Panel>
          <div className={styles.sectionTitle}>All reservations</div>
          <div>
            {reservations.map((r) => (
              <div key={r.id} className={styles.row}>
                <div className={styles.tableChip}>T{r.table}</div>
                <div className={styles.info}>
                  <div className={styles.name}>{r.name}</div>
                  <div className={styles.phone}>{r.phone}</div>
                </div>
                <div className={styles.guests}>
                  <i className="bi bi-people me-1" />{r.guests} guests
                </div>
                <div className={styles.time}>{r.time}</div>
                <StatusSelect
                  value={r.status}
                  onChange={(status) => {
                    updateReservation(r.id, { status });
                    toast.success(`${r.name}'s reservation marked as ${STATUS_LABEL[status]}.`);
                  }}
                  options={statusOptions}
                  ariaLabel={`Status for ${r.name}`}
                />
                <div className={styles.actions}>
                  <button className={styles.actionIcon} onClick={() => openEdit(r)} title="Edit" aria-label="Edit">
                    <i className="bi bi-pencil" />
                  </button>
                  <button className={`${styles.actionIcon} ${styles.danger}`} onClick={() => handleDelete(r)} title="Delete" aria-label="Delete">
                    <i className="bi bi-trash3" />
                  </button>
                </div>
              </div>
            ))}
            {reservations.length === 0 && <p className={styles.empty}>No reservations yet.</p>}
          </div>
        </Panel>

        <ModalBs show={modalOpen} onHide={() => setModalOpen(false)} centered contentClassName={modalStyles.content}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBs.Header closeButton closeVariant="white" className={modalStyles.header}>
              <ModalBs.Title className={modalStyles.title}>{editingId ? "Edit reservation" : "New reservation"}</ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className={modalStyles.body}>
              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>Guest name</Form.Label>
                <Form.Control className={formStyles.control} placeholder="e.g. The Rostami Family" {...register("name", { required: true })} />
                {errors.name && <div className={formStyles.error}>Guest name is required.</div>}
              </div>
              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>Phone</Form.Label>
                <Form.Control className={formStyles.control} placeholder="+1 555 010 2938" {...register("phone")} />
              </div>
              <div className={formStyles.grid}>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Table number</Form.Label>
                  <Form.Control className={formStyles.control} placeholder="e.g. 4" {...register("table", { required: true })} />
                  {errors.table && <div className={formStyles.error}>Table number is required.</div>}
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Guests</Form.Label>
                  <Form.Control className={formStyles.control} type="number" min="1" {...register("guests", { required: true, min: 1 })} />
                </div>
              </div>
              <div className={formStyles.grid}>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Time</Form.Label>
                  <Form.Control className={formStyles.control} type="time" {...register("time", { required: true })} />
                  {errors.time && <div className={formStyles.error}>Pick a time.</div>}
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Status</Form.Label>
                  <Form.Select className={formStyles.control} {...register("status")}>
                    {STATUSES.map((s) => <option key={s} value={s}>{STATUS_LABEL[s]}</option>)}
                  </Form.Select>
                </div>
              </div>
            </ModalBs.Body>
            <ModalBs.Footer className={modalStyles.footer}>
              <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="brew" type="submit">{editingId ? "Save changes" : "Create reservation"}</Button>
            </ModalBs.Footer>
          </Form>
        </ModalBs>
      </Layout>
    </>
  );
}
