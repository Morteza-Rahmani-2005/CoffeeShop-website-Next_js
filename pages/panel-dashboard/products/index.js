import Head from "next/head";
import { useForm, Controller } from "react-hook-form";
import toast from "react-hot-toast";
import ModalBs from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Layout from "@/components_dashboard/Layout";
import Button from "@/components_dashboard/ui/Button";
import PageHeader from "@/components_dashboard/ui/PageHeader";
import SwitchField from "@/components_dashboard/ui/SwitchField";
import { useConfirm } from "@/lib/ConfirmContext";
import modalStyles from "@/components_dashboard/ui/modalTheme.module.css";
import formStyles from "@/components_dashboard/ui/form.module.css";
import styles from "./products.module.css";
import { CgCoffee } from "react-icons/cg";
import { BiSolidCoffeeAlt, BiSolidDrink } from "react-icons/bi";
import { BsBasket2Fill, BsCake2Fill, BsEggFried, BsFillTrash3Fill } from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";
import { useEffect, useMemo, useState } from "react";
import { useStore } from "@/lib/store";




const ICONS = [
  { name: "coffee", icon: <CgCoffee /> },
  { name: "coffeeAlt", icon: <BiSolidCoffeeAlt /> },
  { name: "drink", icon: <BiSolidDrink /> },
  { name: "cake", icon: <BsCake2Fill /> },
  { name: "egg", icon: <BsEggFried /> },
  { name: "basket", icon: <BsBasket2Fill /> },
];
const CATEGORIES = [
  "Hot Coffee",
  "Cold Coffee",
  "Brewed & Turkish",
  "Non-Coffee",
  "Dessert",
];
const DEFAULT_VALUES = {
  name: "",
  category: CATEGORIES[0],
  price: "",
  description: "",
  icon: "coffee",
  available: true,
};

export default function Index() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/products");




        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();


        setProducts(data.products);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load products.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);




  const confirm = useConfirm();
  const siteName = useStore((state) => state.content.siteName);
  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({ defaultValues: DEFAULT_VALUES });

  const visibleProducts = useMemo(
    () =>
      activeCategory === "All"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [products, activeCategory],
  );

  const openCreate = () => {
    setEditingId(null);
    reset(DEFAULT_VALUES);
    setModalOpen(true);
  };

  const openEdit = (product) => {
    setEditingId(product._id);
    reset({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description || "",
      icon: product.icon || "coffee",
      available: !!product.available,
    });
    setModalOpen(true);
  };

  const onSubmit = async (data) => {
    const payload = {
      ...data,
      price: parseFloat(data.price) || 0,
    };

    console.log(payload)

    try {
      if (editingId) {
        // UPDATE
        const response = await fetch(`/api/products/${editingId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });


        console.log(response)


        if (!response.ok) {
          throw new Error("Failed to update product");
        }
        const result = await response.json();

        setProducts((prev) =>
          prev.map((product) =>
            product._id === editingId ? result.product : product
          )
        );

        toast.success(`"${data.name}" was updated.`);
      } else {
        // CREATE
        const response = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });

        if (!response.ok) {
          throw new Error("Failed to create product");
        }

        const newProduct = await response.json();

        setProducts((prev) => [newProduct, ...prev]);

        toast.success(`"${data.name}" was added to the menu.`);
      }

      setModalOpen(false);
      reset(DEFAULT_VALUES);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong.");
    }
  };

  const handleDelete = async (product) => {
    const ok = await confirm({
      title: "Delete product",
      message: `Delete "${product.name}"? This can't be undone.`,
      confirmLabel: "Delete",
    });

    if (!ok) return;

    try {
      const response = await fetch(`/api/products/${product._id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) =>
        prev.filter((item) => item._id !== product._id)
      );

      toast.success(`"${product.name}" was deleted.`);
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
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
            <Button
              key={c}
              variant="chip"
              active={activeCategory === c}
              onClick={() => setActiveCategory(c)}
            >
              {c}
            </Button>
          ))}
        </div>

        <div className="row g-3">
          {visibleProducts.map((item) => (
            <div className="col-6 col-md-4 col-xl-3" key={item._id}>
              <div className={styles.card}>
                <div className={styles.cardArt}>
                  {
                    ICONS.find((i) => i.name === item.icon)?.icon
                  }
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardName}>{item.name}</div>
                  <p className={styles.cardDesc}>{item.description}</p>
                  <div className={styles.cardMeta}>
                    <span className={styles.pill}>{item.category}</span>
                    <span className={styles.price}>
                      ${Number(item.price).toFixed(2)}
                    </span>
                  </div>
                  <div className={styles.cardActions}>
                    <button
                      className={styles.actionIcon}
                      onClick={() => openEdit(item)}
                      title="Edit"
                      aria-label="Edit"
                    >
                      <FiEdit3 />
                    </button>
                    <button
                      className={`${styles.actionIcon} ${styles.danger}`}
                      onClick={() => handleDelete(item)}
                      title="Delete"
                      aria-label="Delete"
                    >
                      <BsFillTrash3Fill />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
          {visibleProducts.length === 0 && (
            <div className="col-12">
              <div className={styles.emptyPanel}>
                No products in this category yet.
              </div>
            </div>
          )}
        </div>

        <ModalBs
          show={modalOpen}
          onHide={() => setModalOpen(false)}
          centered
          contentClassName={modalStyles.content}
        >
          <Form onSubmit={handleSubmit(onSubmit)}>
            <ModalBs.Header
              closeButton
              closeVariant="white"
              className={modalStyles.header}
            >
              <ModalBs.Title className={modalStyles.title}>
                {editingId ? "Edit product" : "Add product"}
              </ModalBs.Title>
            </ModalBs.Header>
            <ModalBs.Body className={modalStyles.body}>
              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>
                  Product name
                </Form.Label>
                <Form.Control
                  className={formStyles.control}
                  placeholder="e.g. Vanilla Latte"
                  {...register("name", { required: true })}
                />
                {errors.name && (
                  <div className={formStyles.error}>
                    Product name is required.
                  </div>
                )}
              </div>

              <div className={formStyles.grid}>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>Category</Form.Label>
                  <Form.Select
                    className={formStyles.control}
                    {...register("category")}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </Form.Select>
                </div>
                <div className={formStyles.row}>
                  <Form.Label className={formStyles.label}>
                    Price (USD)
                  </Form.Label>
                  <Form.Control
                    className={formStyles.control}
                    type="number"
                    step="0.10"
                    min="0"
                    placeholder="0.00"
                    {...register("price", { required: true, min: 0 })}
                  />
                  {errors.price && (
                    <div className={formStyles.error}>Enter a valid price.</div>
                  )}
                </div>
              </div>

              <div className={formStyles.row}>
                <Form.Label className={formStyles.label}>
                  Description
                </Form.Label>
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
                      {ICONS.map((item) => (
                        <button
                          type="button"
                          key={item.name}
                          className={`${formStyles.iconOption} ${field.value === item.name ? formStyles.iconOptionSelected : ""
                            }`}
                          onClick={() => field.onChange(item.name)}
                        >
                          {item.icon}
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
                      label={
                        field.value ? "Available for order" : "Unavailable"
                      }
                    />
                  )}
                />
              </div>
            </ModalBs.Body>
            <ModalBs.Footer className={modalStyles.footer}>
              <Button
                variant="ghost"
                type="button"
                onClick={() => setModalOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="brew" type="submit">
                {editingId ? "Save changes" : "Add product"}
              </Button>
            </ModalBs.Footer>
          </Form>
        </ModalBs>
      </Layout>
    </>
  );
}
