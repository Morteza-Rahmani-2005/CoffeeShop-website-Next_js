import Head from "next/head";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import ModalBs from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import PageHeader from "@/components_dashboard/ui/PageHeader";
import Panel from "@/components_dashboard/ui/Panel";
import DataTable from "@/components_dashboard/ui/DataTable";
import StatusBadge from "@/components_dashboard/ui/StatusBadge";
import StatusSelect from "@/components_dashboard/ui/StatusSelect";
import { useStore } from "@/lib/store";
import { useConfirm } from "@/lib/ConfirmContext";
import modalStyles from "@/components_dashboard/ui/modalTheme.module.css";
import formStyles from "@/components_dashboard/ui/form.module.css";
import styles from "./orders.module.css";

const STATUSES = ["pending", "brewing", "ready", "canceled"];
const STATUS_LABEL = { ready: "Ready", brewing: "Brewing", pending: "Pending", canceled: "Canceled" };
const SIZES = ["Small", "Medium", "Large"];
const DEFAULT_VALUES = { item: "", customer: "", size: "Medium", price: "" };

export default function index() {
  const siteName = useStore((s) => s.content.siteName);
  const orders = useStore((s) => s.orders);
  const products = useStore((s) => s.products);
  const addOrder = useStore((s) => s.addOrder);
  const updateOrder = useStore((s) => s.updateOrder);
  const deleteOrder = useStore((s) => s.deleteOrder);
  const confirm = useConfirm();

  const [filter, setFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);

  const { register, handleSubmit, control, reset, setValue, formState: { errors } } = useForm({ defaultValues: DEFAULT_VALUES });

  const counts = useMemo(() => {
    const c = { all: orders.length, pending: 0, brewing: 0, ready: 0, canceled: 0 };
    orders.forEach((o) => { c[o.status] = (c[o.status] || 0) + 1; });
    return c;
  }, [orders]);

  const visible = filter === "all" ? orders : orders.filter((o) => o.status === filter);

  const handleStatusChange = (order, status) => {
    updateOrder(order.id, { status });
    toast.success(`Order #${order.id} marked as ${STATUS_LABEL[status]}.`);
  };

  const handleDelete = async (order) => {
    const ok = await confirm({ title: "Delete order", message: `Delete order #${order.id} for ${order.customer}?`, confirmLabel: "Delete" });
    if (ok) {
      deleteOrder(order.id);
      toast.error(`Order #${order.id} was deleted.`);
    }
  };

  const openCreate = () => {
    reset(DEFAULT_VALUES);
    setModalOpen(true);
  };

  const handleProductPick = (name) => {
    const product = products.find((p) => p.name === name);
    setValue("item", name);
    if (product) setValue("price", String(product.price));
  };

  const onSubmit = (data) => {
    const time = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    addOrder({ ...data, price: parseFloat(data.price) || 0, time });
    toast.success(`Order for ${data.customer} was added.`);
    setModalOpen(false);
  };

  const statusOptions = STATUSES.map((s) => ({ value: s, label: STATUS_LABEL[s] }));

  return (
    <>
      <Head>
        <title>Orders | {siteName}</title>
      </Head>
      <Layout title="Orders" subtitle="Track and update order status">
        <PageHeader title="Orders" subtitle={`${orders.length} orders on record`}>
          <Button variant="brew" onClick={openCreate}>
            <i className="bi bi-plus-lg me-1" /> New order
          </Button>
        </PageHeader>

        <div className={styles.filters}>
          {["all", ...STATUSES].map((s) => (
            <Button key={s} variant="chip" active={filter === s} onClick={() => setFilter(s)}>
              {s === "all" ? "All orders" : STATUS_LABEL[s]}
              <span className={styles.count}>{counts[s] || 0}</span>
            </Button>
          ))}
        </div>

        <Panel>
          <DataTable>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Size</th>
                <th>Time</th>
                <th>Price</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {visible.map((o) => (
                <tr key={o.id}>
                  <td>
                    <div className={styles.itemCell}>
                      <div className={styles.cupThumb}><i className="bi bi-cup-hot-fill" /></div>
                      <div>
                        <div className={styles.itemName}>{o.item}</div>
                        <div className={styles.itemId}>#{o.id}</div>
                      </div>
                    </div>
                  </td>
                  <td>{o.customer}</td>
                  <td className={styles.muted}>{o.size}</td>
                  <td className={`${styles.mono} ${styles.muted}`}>{o.time}</td>
                  <td className={styles.mono}>${Number(o.price).toFixed(2)}</td>
                  <td>
                    <StatusSelect
                      value={o.status}
                      onChange={(status) => handleStatusChange(o, status)}
                      options={statusOptions}
                      ariaLabel={`Status for order ${o.id}`}
                    />
                  </td>
                  <td>
                    <button className={styles.deleteIcon} onClick={() => handleDelete(o)} title="Delete" aria-label="Delete">
                      <i className="bi bi-trash3" />
                    </button>
                  </td>
                </tr>
              ))}
              {visible.length === 0 && (
                <tr><td colSpan={7} className={styles.empty}>No orders match this filter.</td></tr>
              )}
            </tbody>
          </DataTable>
        </Panel>

        <ModalBs show={modalOpen} onHide={() => setModalOpen(false)} centered contentClassName={modalStyles.content}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBs.Header closeButton closeVariant="white" className={modalStyles.header}>
              <ModalBs.Title className={modalStyles.title}>New order</ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className={modalStyles.body}>
              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>Product</Form.Label>
                <Controller
                  control={control}
                  name="item"
                  rules={{ required: true }}
                  render={({ field }) => (
                    <Form.Select
                      className={formStyles.control}
                      value={field.value}
                      onChange={(e) => handleProductPick(e.target.value)}
                    >
                      <option value="">Select a product…</option>
                      {products.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                    </Form.Select>
                  )}
                />
                {errors.item && <div className={formStyles.error}>Please pick a product.</div>}
              </div>
              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>Customer name</Form.Label>
                <Form.Control className={formStyles.control} placeholder="e.g. Emily Carter" {...register("customer", { required: true })} />
                {errors.customer && <div className={formStyles.error}>Customer name is required.</div>}
              </div>
              <div className={formStyles.grid}>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Size</Form.Label>
                  <Form.Select className={formStyles.control} {...register("size")}>
                    {SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </Form.Select>
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Price (USD)</Form.Label>
                  <Form.Control className={formStyles.control} type="number" step="0.10" min="0" placeholder="0.00" {...register("price", { required: true, min: 0 })} />
                  {errors.price && <div className={formStyles.error}>Enter a valid price.</div>}
                </div>
              </div>
            </ModalBs.Body>
            <ModalBs.Footer className={modalStyles.footer}>
              <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="brew" type="submit">Add order</Button>
            </ModalBs.Footer>
          </Form>
        </ModalBs>
      </Layout>
    </>
  );
}
