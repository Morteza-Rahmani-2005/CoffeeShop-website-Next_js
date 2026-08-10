import Head from "next/head";
import { useMemo, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import ModalBs from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import PageHeader from "@/components_dashboard/ui/PageHeader";
import SwitchField from "@/components_dashboard/ui/SwitchField";
import { useStore } from "@/lib/store";
import { useConfirm } from "@/lib/ConfirmContext";
import modalStyles from "@/components_dashboard/ui/modalTheme.module.css";
import formStyles from "@/components_dashboard/ui/form.module.css";
import styles from "./products.module.css";

const ICONS = ["bi-cup-hot-fill", "bi-cup-fill", "bi-cup-straw", "bi-cake2-fill", "bi-egg-fried", "bi-basket2-fill"];
const CATEGORIES = ["Hot Coffee", "Cold Coffee", "Brewed & Turkish", "Non-Coffee", "Dessert"];
const DEFAULT_VALUES = { name: "", category: CATEGORIES[0], price: "", description: "", icon: ICONS[0], available: true };

export default function index() {
  const siteName = useStore((s) => s.content.siteName);
  const products = useStore((s) => s.products);
  const addProduct = useStore((s) => s.addProduct);
  const updateProduct = useStore((s) => s.updateProduct);
  const deleteProduct = useStore((s) => s.deleteProduct);
  const confirm = useConfirm();

  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const { register, handleSubmit, control, reset, formState: { errors } } = useForm({ defaultValues: DEFAULT_VALUES });

  const visibleProducts = useMemo(
    () => (activeCategory === "All" ? products : products.filter((p) => p.category === activeCategory)),
    [products, activeCategory]
  );

  const openCreate = () => {
    setEditingId(null);
    reset(DEFAULT_VALUES);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingId(product.id);
    reset({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description || "",
      icon: product.icon || ICONS[0],
      available: !!product.available,
    });
    setModalOpen(true);
  };

  const onSubmit = (data) => {
    const payload = { ...data, price: parseFloat(data.price) || 0 };
    if (editingId) {
      updateProduct(editingId, payload);
      toast.success(`"${data.name}" was updated.`);
    } else {
      addProduct(payload);
      toast.success(`"${data.name}" was added to the menu.`);
    }
    setModalOpen(false);
  };

  const handleDelete = async (product) => {
    const ok = await confirm({
      title: "Delete product",
      message: `Delete "${product.name}"? This can't be undone.`,
      confirmLabel: "Delete",
    });
    if (ok) {
      deleteProduct(product.id);
      toast.error(`"${product.name}" was deleted.`);
    }
  };

  return (
    <>
      <Head>
        <title>Products | {siteName}</title>
      </Head>
      <Layout title="Products" subtitle="Manage your menu items">
        <PageHeader
          title="Products"
          subtitle={`${products.length} item${products.length !== 1 ? "s" : ""} · ${products.filter((p) => p.available).length} available`}
        >
          <Button variant="brew" onClick={openCreate}>
            <i className="bi bi-plus-lg me-1" /> Add product
          </Button>
        </PageHeader>

        <div className={styles.filters}>
          {["All", ...CATEGORIES].map((c) => (
            <Button key={c} variant="chip" active={activeCategory === c} onClick={() => setActiveCategory(c)}>
              {c}
            </Button>
          ))}
        </div>

        <div className="row g-3">
          {visibleProducts.map((item) => (
            <div className="col-6 col-md-4 col-xl-3" key={item.id}>
              <div className={styles.card}>
                <div className={styles.cardArt}>
                  <i className={`bi ${item.icon}`} />
                  {!item.available && <span className={styles.unavailableTag}>Unavailable</span>}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardName}>{item.name}</div>
                  <p className={styles.cardDesc}>{item.description}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.pill}>{item.category}</span>
                    <span className={styles.price}>${Number(item.price).toFixed(2)}</span>
                  </div>
                  <div className={styles.cardActions}>
                    <button className={styles.actionIcon} onClick={() => openEdit(item)} title="Edit" aria-label="Edit">
                      <i className="bi bi-pencil" />
                    </button>
                    <button className={`${styles.actionIcon} ${styles.danger}`} onClick={() => handleDelete(item)} title="Delete" aria-label="Delete">
                      <i className="bi bi-trash3" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {visibleProducts.length === 0 && (
            <div className="col-12">
              <div className={styles.emptyPanel}>No products in this category yet.</div>
            </div>
          )}
        </div>

        <ModalBs show={modalOpen} onHide={() => setModalOpen(false)} centered contentClassName={modalStyles.content}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBs.Header closeButton closeVariant="white" className={modalStyles.header}>
              <ModalBs.Title className={modalStyles.title}>{editingId ? "Edit product" : "Add product"}</ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className={modalStyles.body}>
              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>Product name</Form.Label>
                <Form.Control
                  className={formStyles.control}
                  placeholder="e.g. Vanilla Latte"
                  {...register("name", { required: true })}
                />
                {errors.name && <div className={formStyles.error}>Product name is required.</div>}
              </div>

              <div className={formStyles.grid}>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Category</Form.Label>
                  <Form.Select className={formStyles.control} {...register("category")}>
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </Form.Select>
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Price (USD)</Form.Label>
                  <Form.Control
                    className={formStyles.control}
                    type="number"
                    step="0.10"
                    min="0"
                    placeholder="0.00"
                    {...register("price", { required: true, min: 0 })}
                  />
                  {errors.price && <div className={formStyles.error}>Enter a valid price.</div>}
                </div>
              </div>

              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  className={formStyles.control}
                  placeholder="Short description shown to customers"
                  {...register("description")}
                />
              </div>

              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>Icon</Form.Label>
                <Controller
                  control={control}
                  name="icon"
                  render={({ field }) => (
                    <div className={formStyles.iconPicker}>
                      {ICONS.map((icon) => (
                        <button
                          type="button"
                          key={icon}
                          className={`${formStyles.iconOption} ${field.value === icon ? formStyles.iconOptionSelected : ""}`}
                          onClick={() => field.onChange(icon)}
                        >
                          <i className={`bi ${icon}`} />
                        </button>
                      ))}
                    </div>
                  )}
                />
              </div>

              <div className={formStyles.row} style={{ marginBottom: 0 }}>
                <Controller
                  control={control}
                  name="available"
                  render={({ field }) => (
                    <SwitchField
                      checked={field.value}
                      onChange={field.onChange}
                      label={field.value ? "Available for order" : "Unavailable"}
                    />
                  )}
                />
              </div>
            </ModalBs.Body>
            <ModalBs.Footer className={modalStyles.footer}>
              <Button variant="ghost" type="button" onClick={() => setModalOpen(false)}>Cancel</Button>
              <Button variant="brew" type="submit">{editingId ? "Save changes" : "Add product"}</Button>
            </ModalBs.Footer>
          </Form>
        </ModalBs>
      </Layout>
    </>
  );
}
