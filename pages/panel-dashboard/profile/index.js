import Head from "next/head";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Form from "react-bootstrap/Form";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import Panel from "@/components_dashboard/ui/Panel";
import { useStore, useCurrentAdmin } from "@/lib/store";
import formStyles from "@/components_dashboard/ui/form.module.css";
import styles from "@/pages/panel-dashboard/profile/profile.module.css";

export default function index() {
  const siteName = useStore((s) => s.content.siteName);
  const updateCurrentAdmin = useStore((s) => s.updateCurrentAdmin);
  const hasHydrated = useStore((s) => s.hasHydrated);
  const admin = useCurrentAdmin();

  const infoForm = useForm({ defaultValues: { name: "", email: "" } });
  const pwForm = useForm({ defaultValues: { current: "", next: "", confirm: "" } });

  useEffect(() => {
    if (hasHydrated && admin) infoForm.reset({ name: admin.name, email: admin.email });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasHydrated, admin?.id]);

  const nameValue = infoForm.watch("name");
  const emailValue = infoForm.watch("email");

  if (!admin) {
    return (
      <Layout title="My Profile">
        <Panel className={styles.loading}>Loading your account…</Panel>
      </Layout>
    );
  }

  const initials = (nameValue || admin.name)
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();

  const onSaveInfo = (data) => {
    updateCurrentAdmin({ name: data.name, email: data.email });
    toast.success("Your profile was updated.");
  };

  const onChangePassword = (data) => {
    if (data.next.length < 6) {
      toast.error("New password must be at least 6 characters.");
      return;
    }
    if (data.next !== data.confirm) {
      toast.error("New password and confirmation don't match.");
      return;
    }
    pwForm.reset({ current: "", next: "", confirm: "" });
    toast.success("Your password was changed.");
  };

  return (
    <>
      <Head>
        <title>My Profile | {siteName}</title>
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
              <div className={styles.name}>{nameValue || admin.name}</div>
              <div className={styles.email}>{emailValue || admin.email}</div>
              <span className={styles.rolePill}>{admin.role}</span>
              <p className={styles.addedAt}>
                Added on <span className={styles.mono}>{admin.addedAt}</span>
              </p>
            </Panel>
          </div>

          <div className="col-12 col-lg-8">
            <Form onSubmit={infoForm.handleSubmit(onSaveInfo)}>
              <Panel className={styles.spaced}>
                <div className={styles.sectionTitle}>Account information</div>
                <div className={formStyles.grid}>
                  <div className={formStyles.row}>
                    <Form.Label className={formStyles.label}>Full name</Form.Label>
                    <Form.Control className={formStyles.control} {...infoForm.register("name", { required: true })} />
                  </div>
                  <div className={formStyles.row}>
                    <Form.Label className={formStyles.label}>Email</Form.Label>
                    <Form.Control className={formStyles.control} type="email" {...infoForm.register("email", { required: true })} />
                  </div>
                </div>
                <div className={formStyles.row} style={{ marginBottom: 0 }}>
                  <Form.Label className={formStyles.label}>Role</Form.Label>
                  <Form.Control className={formStyles.control} value={admin.role} disabled style={{ opacity: 0.6 }} readOnly />
                  <p className={formStyles.hint}>Your role is managed from the Admins page by another Owner.</p>
                </div>
                <div className={styles.formFooter}>
                  <Button variant="brew" type="submit">
                    <i className="bi bi-check2 me-1" /> Save changes
                  </Button>
                </div>
              </Panel>
            </Form>

            <Form onSubmit={pwForm.handleSubmit(onChangePassword)}>
              <Panel>
                <div className={styles.sectionTitle}>Change password</div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Current password</Form.Label>
                  <Form.Control className={formStyles.control} type="password" placeholder="••••••••" {...pwForm.register("current", { required: true })} />
                </div>
                <div className={formStyles.grid}>
                  <div className={formStyles.row}>
                    <Form.Label className={formStyles.label}>New password</Form.Label>
                    <Form.Control className={formStyles.control} type="password" placeholder="At least 6 characters" {...pwForm.register("next", { required: true })} />
                  </div>
                  <div className={formStyles.row}>
                    <Form.Label className={formStyles.label}>Confirm new password</Form.Label>
                    <Form.Control className={formStyles.control} type="password" placeholder="Repeat new password" {...pwForm.register("confirm", { required: true })} />
                  </div>
                </div>
                <div className={styles.formFooter} style={{ marginBottom: 0 }}>
                  <Button variant="ghost" type="submit">
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
