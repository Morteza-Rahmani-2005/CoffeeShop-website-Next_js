import Head from "next/head";
import Form from "react-bootstrap/Form";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import Panel from "@/components_dashboard/ui/Panel";
import formStyles from "@/components_dashboard/ui/form.module.css";
import styles from "@/pages/panel-dashboard/profile/profile.module.css";

const admin = { name: "Armin Rezaei", email: "armin@dibacoffee.com", role: "Owner", addedAt: "2026-02-11" };

export default function Profile() {
  const initials = admin.name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  return (
    <>
      <Head>
        <title>My Profile</title>
      </Head>
      <Layout title="My Profile" subtitle="Manage your own admin account">
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
          <p className={styles.subtitle}>This is your own account — changes here only affect you.</p>
        </div>

        <div className="row g-3">
          <div className="col-12 col-lg-4">
            <Panel className={styles.cardPanel}>
              <div className={styles.avatar}>{initials}</div>
              <div className={styles.name}>{admin.name}</div>
              <div className={styles.email}>{admin.email}</div>
              <span className={styles.rolePill}>{admin.role}</span>
              <p className={styles.addedAt}>
                Added on <span className={styles.mono}>{admin.addedAt}</span>
              </p>
            </Panel>
          </div>

          <div className="col-12 col-lg-8">
            <Form>
              <Panel className={styles.spaced}>
                <div className={styles.sectionTitle}>Account information</div>
                <div className={formStyles.grid}>
                  <div className={formStyles.row}>
                    <Form.Label className={formStyles.label}>Full name</Form.Label>
                    <Form.Control className={formStyles.control} name="name" defaultValue={admin.name} />
                  </div>
                  <div className={formStyles.row}>
                    <Form.Label className={formStyles.label}>Email</Form.Label>
                    <Form.Control className={formStyles.control} type="email" name="email" defaultValue={admin.email} />
                  </div>
                </div>
                <div className={formStyles.row} style={{ marginBottom: 0 }}>
                  <Form.Label className={formStyles.label}>Role</Form.Label>
                  <Form.Control className={formStyles.control} value={admin.role} disabled style={{ opacity: 0.6 }} readOnly />
                  <p className={formStyles.hint}>Your role is managed from the Admins page by another Owner.</p>
                </div>
                <div className={styles.formFooter}>
                  <Button variant="brew" type="button">
                    <i className="bi bi-check2 me-1" /> Save changes
                  </Button>
                </div>
              </Panel>
            </Form>

            <Form>
              <Panel>
                <div className={styles.sectionTitle}>Change password</div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Current password</Form.Label>
                  <Form.Control className={formStyles.control} type="password" name="current" placeholder="••••••••" />
                </div>
                <div className={formStyles.grid}>
                  <div className={formStyles.row}>
                    <Form.Label className={formStyles.label}>New password</Form.Label>
                    <Form.Control className={formStyles.control} type="password" name="next" placeholder="At least 6 characters" />
                  </div>
                  <div className={formStyles.row}>
                    <Form.Label className={formStyles.label}>Confirm new password</Form.Label>
                    <Form.Control className={formStyles.control} type="password" name="confirm" placeholder="Repeat new password" />
                  </div>
                </div>
                <div className={styles.formFooter} style={{ marginBottom: 0 }}>
                  <Button variant="ghost" type="button">
                    <i className="bi bi-shield-lock me-1" /> Update password
                  </Button>
                </div>
              </Panel>
            </Form>
          </div>
        </div>
      </Layout>
    </>
  );
}
