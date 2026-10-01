import Head from "next/head";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import PageHeader from "@/components_dashboard/ui/PageHeader";
import Panel from "@/components_dashboard/ui/Panel";
import DataTable from "@/components_dashboard/ui/DataTable";
import StatusBadge from "@/components_dashboard/ui/StatusBadge";
import styles from "@/pages/panel-dashboard/admins/admins.module.css";

const admins = [
  { id: "a1", name: "Armin Rezaei", email: "armin@dibacoffee.com", role: "Owner", status: "active", addedAt: "2026-02-11" },
  { id: "a2", name: "Sara Hosseini", email: "sara@dibacoffee.com", role: "Manager", status: "active", addedAt: "2026-04-03" },
  { id: "a3", name: "Kian Moradi", email: "kian@dibacoffee.com", role: "Staff", status: "suspended", addedAt: "2026-06-19" },
];

export default function Admins() {
  return (
    <>
      <Head>
        <title>Admins</title>
      </Head>
      <Layout title="Admins" subtitle="Manage who has access to this dashboard">
        <PageHeader title="Admins" subtitle={`${admins.length} admin accounts`}>
          <Button variant="brew">
            <i className="bi bi-person-plus-fill me-1" /> Add admin
          </Button>
        </PageHeader>

        <Panel>
          <DataTable>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th>Added</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {admins.map((a) => (
                <tr key={a.id}>
                  <td>
                    <div className={styles.nameCell}>
                      <div className={styles.avatar}>
                        {a.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                      </div>
                      <span className={styles.name}>{a.name}</span>
                    </div>
                  </td>
                  <td className={styles.muted}>{a.email}</td>
                  <td><span className={styles.rolePill}>{a.role}</span></td>
                  <td>
                    <StatusBadge status={a.status} label={a.status === "active" ? "Active" : "Suspended"} />
                  </td>
                  <td className={`${styles.faint} ${styles.mono}`}>{a.addedAt}</td>
                  <td>
                    <div className={styles.actions}>
                      <button className={styles.actionIcon} title="Edit" aria-label="Edit">
                        <i className="bi bi-pencil" />
                      </button>
                      <button className={`${styles.actionIcon} ${styles.danger}`} title="Remove" aria-label="Remove">
                        <i className="bi bi-trash3" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Panel>
      </Layout>
    </>
  );
}
