import Head from "next/head";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import PageHeader from "@/components_dashboard/ui/PageHeader";
import Panel from "@/components_dashboard/ui/Panel";
import StatusBadge from "@/components_dashboard/ui/StatusBadge";
import styles from "./reservations.module.css";

const STATUS_LABEL = { pending: "Pending", confirmed: "Confirmed", seated: "Seated", canceled: "Canceled" };

const reservations = [
  { id: "r1", table: "4", name: "The Rostami Family", phone: "+1 555 010 2938", time: "18:30", guests: 4, status: "confirmed" },
  { id: "r2", table: "7", name: "Nora Abbasi", phone: "+1 555 019 8765", time: "19:00", guests: 2, status: "seated" },
  { id: "r3", table: "2", name: "College Friends Group", phone: "+1 555 112 2334", time: "19:45", guests: 6, status: "pending" },
  { id: "r4", table: "11", name: "Behrad Nouri", phone: "+1 555 194 4567", time: "20:15", guests: 2, status: "confirmed" },
];

export default function Reservations() {
  return (
    <>
      <Head>
        <title>Reservations</title>
      </Head>
      <Layout title="Reservations" subtitle="Manage table bookings">
        <PageHeader title="Reservations" subtitle={`${reservations.length} reservations on the books`}>
          <Button variant="brew">
            <i className="bi bi-plus-lg me-1" /> New reservation
          </Button>
        </PageHeader>

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
                <StatusBadge status={r.status} label={STATUS_LABEL[r.status]} />
                <div className={styles.actions}>
                  <button className={styles.actionIcon} title="Edit" aria-label="Edit">
                    <i className="bi bi-pencil" />
                  </button>
                  <button className={`${styles.actionIcon} ${styles.danger}`} title="Delete" aria-label="Delete">
                    <i className="bi bi-trash3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Panel>
      </Layout>
    </>
  );
}
