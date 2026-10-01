
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
import {
  BsBasket2Fill,
  BsCake2Fill,
  BsEggFried,
  BsFillTrash3Fill,
} from "react-icons/bs";
import { FiEdit3 } from "react-icons/fi";

import { useEffect, useMemo, useState } from "react";
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
  image: null,
};

export default function Index() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const confirm = useConfirm();

  const [activeCategory, setActiveCategory] = useState("All");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VALUES,
  });


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        const response = await fetch("/api/products");

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();

        console.log("GET PRODUCTS:", data);

        // مطمئن می‌شویم همیشه آرایه داریم
        setProducts(Array.isArray(data.products) ? data.products : []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load products.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);



  const visibleProducts = useMemo(() => {
    const validProducts = products.filter(Boolean);

    if (activeCategory === "All") {
      return validProducts;
    }

    return validProducts.filter(
      (product) => product.category === activeCategory
    );
  }, [products, activeCategory]);


  const openCreate = () => {
    setEditingId(null);
    reset(DEFAULT_VALUES);
    setModalOpen(true);
  };



  const openEdit = (product) => {
    setEditingId(product._id);

    reset({
      name: product.name || "",
      category: product.category || CATEGORIES[0],
      price: String(product.price ?? ""),
      description: product.description || "",
      icon: product.icon || "coffee",
      available: !!product.available,
      image: null,
    });

    setModalOpen(true);
  };


  const onSubmit = async (data) => {
    console.log("FORM DATA:", data.name);

    const formData = new FormData();

    formData.append("name", data.name || "");
    formData.append("category", data.category || "");
    formData.append("price", String(parseFloat(data.price) || 0));
    formData.append("description", data.description || "");
    formData.append("icon", data.icon || "coffee");
    formData.append("available", String(data.available));

    if (data.image && data.image.length > 0) {
      const file = data.image[0];

      formData.append("image", file);
    }


    for (const [key, value] of formData.entries()) {
      console.log("FORM DATA:", key, value);
    }

    console.log(formData)

    try {

      if (editingId) {
        const response = await fetch(
          `/api/products/${editingId}`,
          {
            method: "PUT",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          console.error("UPDATE ERROR:", errorData);

          throw new Error("Failed to update product");
        }

        const result = await response.json();

        console.log("UPDATE RESULT:", result);

        if (!result.product) {
          throw new Error(
            "API did not return updated product"
          );
        }

        setProducts((prev) =>
          prev.map((product) =>
            product?._id === editingId
              ? result.product
              : product
          )
        );

        toast.success(
          `"${data.name}" was updated.`
        );
      }
      else {
        const response = await fetch(
          "/api/products",
          {
            method: "POST",
            body: formData,
          }
        );

        if (!response.ok) {
          const errorData = await response.json().catch(() => null);

          console.error("CREATE ERROR:", errorData);

          throw new Error("Failed to create product");
        }

        const result = await response.json();

        console.log("CREATE RESULT:", result);

        if (!result.product) {
          throw new Error(
            "API did not return created product"
          );
        }

        setProducts((prev) => [
          result.product,
          ...prev.filter(Boolean),
        ]);

        toast.success(
          `"${data.name}" was added to the menu.`
        );
      }

      setModalOpen(false);
      reset(DEFAULT_VALUES);

    } catch (error) {
      console.error("SUBMIT ERROR:", error);
      toast.error("Something went wrong.");
    }
  };


  const handleDelete = async (product) => {
    const ok = await confirm({
      title: "Delete product",
      message: `Delete "${product.name}" ? This can't be undone.`,
      confirmLabel: "Delete",
    });

    if (!ok) return;

    try {
      const response = await fetch(
        `/api/products/${product._id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      setProducts((prev) =>
        prev.filter(
          (item) =>
            item && item._id !== product._id
        )
      );

      toast.success(
        `"${product.name}" was deleted.`
      );

    } catch (error) {
      console.error(error);
      toast.error("Failed to delete product.");
    }
  };

  // =========================
  // AVAILABLE COUNT
  // =========================

  const availableCount = products.filter(
    (product) => product?.available
  ).length;

  return (
    <>
      <Head>
        <title>Products</title>
      </Head>

      <Layout
        title="Products"
        subtitle="Manage your menu items"
      >
        <PageHeader
          title="Products"
          subtitle={`${products.length} item${products.length !== 1 ? "s" : ""
            } · ${availableCount} available`}
        >
          <Button
            variant="brew"
            onClick={openCreate}
          >
            <i className="bi bi-plus-lg me-1" />
            Add product
          </Button>
        </PageHeader>

        {/* =========================
            FILTERS
        ========================= */}

        <div className={styles.filters}>
          {["All", ...CATEGORIES].map(
            (category) => (
              <Button
                key={category}
                variant="chip"
                active={
                  activeCategory === category
                }
                onClick={() =>
                  setActiveCategory(category)
                }
              >
                {category}
              </Button>
            )
          )}
        </div>

        {/* =========================
            PRODUCTS
        ========================= */}

        <div className="row g-3">
          {visibleProducts.map((item) => {
            const selectedIcon =
              ICONS.find(
                (icon) =>
                  icon.name === item?.icon
              )?.icon || <CgCoffee />;

            return (
              <div
                className="col-6 col-md-4 col-xl-3"
                key={item._id}
              >
                <div className={styles.card}>

                  <div
                    className={styles.cardArt}
                  >
                    {selectedIcon}
                  </div>

                  <div
                    className={styles.cardBody}
                  >
                    <div
                      className={
                        styles.cardName
                      }
                    >
                      {item.name}
                    </div>

                    <p
                      className={
                        styles.cardDesc
                      }
                    >
                      {item.description}
                    </p>

                    <div
                      className={
                        styles.cardMeta
                      }
                    >
                      <span
                        className={
                          styles.pill
                        }
                      >
                        {item.category}
                      </span>

                      <span
                        className={
                          styles.price
                        }
                      >
                        $
                        {Number(
                          item.price
                        ).toFixed(2)}
                      </span>
                    </div>

                    <div
                      className={
                        styles.cardActions
                      }
                    >
                      <button
                        className={
                          styles.actionIcon
                        }
                        onClick={() =>
                          openEdit(item)
                        }
                        title="Edit"
                        aria-label="Edit"
                      >
                        <FiEdit3 />
                      </button>

                      <button
                        className={`${styles.actionIcon} ${styles.danger}`}
                        onClick={() =>
                          handleDelete(item)
                        }
                        title="Delete"
                        aria-label="Delete"
                      >
                        <BsFillTrash3Fill />
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}

          {visibleProducts.length === 0 && (
            <div className="col-12">
              <div
                className={
                  styles.emptyPanel
                }
              >
                No products in this category
                yet.
              </div>
            </div>
          )}
        </div>

        {/* =========================
            MODAL
        ========================= */}

        <ModalBs
          show={modalOpen}
          onHide={() =>
            setModalOpen(false)
          }
          centered
          contentClassName={
            modalStyles.content
          }
        >
          <Form
            onSubmit={handleSubmit(onSubmit)}
          >

            <ModalBs.Header
              closeButton
              closeVariant="white"
              className={
                modalStyles.header
              }
            >
              <ModalBs.Title
                className={
                  modalStyles.title
                }
              >
                {editingId
                  ? "Edit product"
                  : "Add product"}
              </ModalBs.Title>
            </ModalBs.Header>

            <ModalBs.Body
              className={modalStyles.body}
            >

              {/* NAME */}

              <div
                className={formStyles.row}
              >
                <Form.Label
                  className={
                    formStyles.label
                  }
                >
                  Product name
                </Form.Label>

                <Form.Control
                  className={
                    formStyles.control
                  }
                  placeholder="e.g. Vanilla Latte"
                  {...register("name", {
                    required: true,
                  })}
                />

                {errors.name && (
                  <div
                    className={
                      formStyles.error
                    }
                  >
                    Product name is required.
                  </div>
                )}
              </div>

              {/* CATEGORY + PRICE */}

              <div
                className={formStyles.grid}
              >

                <div
                  className={
                    formStyles.row
                  }
                >
                  <Form.Label
                    className={
                      formStyles.label
                    }
                  >
                    Category
                  </Form.Label>

                  <Form.Select
                    className={
                      formStyles.control
                    }
                    {...register("category")}
                  >
                    {CATEGORIES.map(
                      (category) => (
                        <option
                          key={category}
                          value={category}
                        >
                          {category}
                        </option>
                      )
                    )}
                  </Form.Select>
                </div>

                <div
                  className={
                    formStyles.row
                  }
                >
                  <Form.Label
                    className={
                      formStyles.label
                    }
                  >
                    Price (USD)
                  </Form.Label>

                  <Form.Control
                    className={
                      formStyles.control
                    }
                    type="number"
                    step="0.10"
                    min="0"
                    placeholder="0.00"
                    {...register("price", {
                      required: true,
                      min: 0,
                    })}
                  />

                  {errors.price && (
                    <div
                      className={
                        formStyles.error
                      }
                    >
                      Enter a valid price.
                    </div>
                  )}
                </div>

              </div>

              {/* IMAGE */}

              <div
                className={formStyles.row}
              >
                <Form.Label
                  className={
                    formStyles.label
                  }
                >
                  Product Image
                </Form.Label>

                <Form.Control
                  type="file"
                  accept="image/*"
                  className={
                    formStyles.control
                  }
                  {...register("image")}
                />
              </div>

              {/* DESCRIPTION */}

              <div
                className={formStyles.row}
              >
                <Form.Label
                  className={
                    formStyles.label
                  }
                >
                  Description
                </Form.Label>

                <Form.Control
                  as="textarea"
                  rows={3}
                  className={
                    formStyles.control
                  }
                  placeholder="Short description shown to customers"
                  {...register("description")}
                />
              </div>

              {/* ICON */}

              <div
                className={formStyles.row}
              >
                <Form.Label
                  className={
                    formStyles.label
                  }
                >
                  Icon
                </Form.Label>

                <Controller
                  control={control}
                  name="icon"
                  render={({ field }) => (
                    <div
                      className={
                        formStyles.iconPicker
                      }
                    >
                      {ICONS.map(
                        (item) => (
                          <button
                            type="button"
                            key={item.name}
                            className={`${formStyles.iconOption} ${field.value ===
                              item.name
                              ? formStyles.iconOptionSelected
                              : ""
                              }`}
                            onClick={() =>
                              field.onChange(
                                item.name
                              )
                            }
                          >
                            {item.icon}
                          </button>
                        )
                      )}
                    </div>
                  )}
                />
              </div>

              {/* AVAILABLE */}

              <div
                className={formStyles.row}
                style={{
                  marginBottom: 0,
                }}
              >
                <Controller
                  control={control}
                  name="available"
                  render={({ field }) => (
                    <SwitchField
                      checked={
                        !!field.value
                      }
                      onChange={
                        field.onChange
                      }
                      label={
                        field.value
                          ? "Available for order"
                          : "Unavailable"
                      }
                    />
                  )}
                />
              </div>

            </ModalBs.Body>

            <ModalBs.Footer
              className={
                modalStyles.footer
              }
            >
              <Button
                variant="ghost"
                type="button"
                onClick={() =>
                  setModalOpen(false)
                }
              >
                Cancel
              </Button>

              <Button
                variant="brew"
                type="submit"
              >
                {editingId
                  ? "Save changes"
                  : "Add product"}
              </Button>
            </ModalBs.Footer>

          </Form>
        </ModalBs>
      </Layout>
    </>
  );
}