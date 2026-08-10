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
import DataTable from "@/components_dashboard/ui/DataTable";
import StatusBadge from "@/components_dashboard/ui/StatusBadge";
import { useStore, useCurrentAdmin } from "@/lib/store";
import { useConfirm } from "@/lib/ConfirmContext";
import modalStyles from "@/components_dashboard/ui/modalTheme.module.css";
import formStyles from "@/components_dashboard/ui/form.module.css";
import styles from "@/pages/panel-dashboard/admins/admins.module.css";

const ROLES = ["Owner", "Manager", "Staff"];
const DEFAULT_VALUES = { name: "", email: "", role: "Staff", password: "" };

export default function index() {
  const siteName = useStore((s) => s.content.siteName);
  const admins = useStore((s) => s.admins);
  const addAdmin = useStore((s) => s.addAdmin);
  const updateAdmin = useStore((s) => s.updateAdmin);
  const deleteAdmin = useStore((s) => s.deleteAdmin);
  const currentAdmin = useCurrentAdmin();
  const confirm = useConfirm();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({ defaultValues: DEFAULT_VALUES });

  const openCreate = () => {
    setEditingId(null);
    reset(DEFAULT_VALUES);
    setModalOpen(true);
  };

  const openEdit = (admin) => {
    setEditingId(admin.id);
    reset({ name: admin.name, email: admin.email, role: admin.role, password: "" });
    setModalOpen(true);
  };

  const onSubmit = (data) => {
    if (editingId) {
      updateAdmin(editingId, { name: data.name, email: data.email, role: data.role });
      toast.success(`${data.name}'s account was updated.`);
    } else {
      if (!data.password) {
        toast.error("Please set a temporary password for the new admin.");
        return;
      }
      addAdmin({ name: data.name, email: data.email, role: data.role });
      toast.success(`${data.name} was added as ${data.role}.`);
    }
    setModalOpen(false);
  };

  const toggleStatus = (admin) => {
    if (admin.id === currentAdmin?.id) {
      toast.error("You can't suspend your own account. Ask another Owner to do this.");
      return;
    }
    const next = admin.status === "active" ? "suspended" : "active";
    updateAdmin(admin.id, { status: next });
    if (next === "active") toast.success(`${admin.name} was reactivated.`);
    else toast.error(`${admin.name} was suspended.`);
  };

  const handleDelete = async (admin) => {
    if (admin.id === currentAdmin?.id) {
      toast.error("You can't remove your own account. Ask another Owner to do this.");
      return;
    }
    const ok = await confirm({ title: "Remove admin", message: `Remove ${admin.name} (${admin.email}) from the admin panel?`, confirmLabel: "Remove" });
    if (ok) {
      deleteAdmin(admin.id);
      toast.error(`${admin.name} was removed.`);
    }
  };

  return (
    <>
      <Head>
        <title>Admins | {siteName}</title>
      </Head>
      <Layout title="Admins" subtitle="Manage who has access to this dashboard">
        <PageHeader
          title="Admins"
          subtitle={
            <>
              {admins.length} admin account{admins.length !== 1 ? "s" : ""} ·{" "}
              <a href="/profile" className={styles.profileLink}>Edit your own profile here</a>
            </>
          }
        >
          <Button variant="brew" onClick={openCreate}>
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
              {admins.map((a) => {
                const isSelf = a.id === currentAdmin?.id;
                return (
                  <tr key={a.id}>
                    <td>
                      <div className={styles.nameCell}>
                        <div className={styles.avatar}>
                          {a.name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase()}
                        </div>
                        <span className={styles.name}>{a.name}</span>
                        {isSelf && <span className={styles.youTag}>You</span>}
                      </div>
                    </td>
                    <td className={styles.muted}>{a.email}</td>
                    <td><span className={styles.rolePill}>{a.role}</span></td>
                    <td>
                      <StatusBadge
                        status={a.status}
                        label={a.status === "active" ? "Active" : "Suspended"}
                        onClick={() => toggleStatus(a)}
                        title={isSelf ? "You can't suspend yourself" : "Click to toggle status"}
                      />
                    </td>
                    <td className={`${styles.faint} ${styles.mono}`}>{a.addedAt}</td>
                    <td>
                      <div className={styles.actions}>
                        <button
                          className={styles.actionIcon}
                          onClick={() => (isSelf ? (window.location.href = "/profile") : openEdit(a))}
                          title={isSelf ? "Edit in My Profile" : "Edit"}
                          aria-label="Edit"
                        >
                          <i className="bi bi-pencil" />
                        </button>
                        <button
                          className={`${styles.actionIcon} ${styles.danger}`}
                          onClick={() => handleDelete(a)}
                          title={isSelf ? "You can't remove yourself" : "Remove"}
                          aria-label="Remove"
                          disabled={isSelf}
                        >
                          <i className="bi bi-trash3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {admins.length === 0 && (
                <tr><td colSpan={6} className={styles.empty}>No admins yet.</td></tr>
              )}
            </tbody>
          </DataTable>
        </Panel>

        <ModalBs show={modalOpen} onHide={() => setModalOpen(false)} centered contentClassName={modalStyles.content}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBs.Header closeButton closeVariant="white" className={modalStyles.header}>
              <ModalBs.Title className={modalStyles.title}>{editingId ? "Edit admin" : "Add admin"}</ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className={modalStyles.body}>
              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>Full name</Form.Label>
                <Form.Control className={formStyles.control} placeholder="Jane Doe" {...register("name", { required: true })} />
                {errors.name && <div className={formStyles.error}>Name is required.</div>}
              </div>
              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>Email</Form.Label>
                <Form.Control className={formStyles.control} type="email" placeholder="jane@dibacoffee.com" {...register("email", { required: true })} />
                {errors.email && <div className={formStyles.error}>Email is required.</div>}
              </div>
              <div className={formStyles.grid}>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Role</Form.Label>
                  <Form.Select className={formStyles.control} {...register("role")}>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </Form.Select>
                </div>
                {!editingId && (
                  <div className={formStyles.row}>
                    <Form.Label className={formStyles.label}>Temporary password</Form.Label>
                    <Form.Control className={formStyles.control} type="password" placeholder="••••••••" {...register("password")} />
                  </div>
                )}
              </div>
            </ModalBs.Body>
            <ModalBs.Footer className={modalStyles.footer}>
              <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="brew" type="submit">{editingId ? "Save changes" : "Add admin"}</Button>
            </ModalBs.Footer>
          </Form>
        </ModalBs>
      </Layout>
    </>
  );
}
