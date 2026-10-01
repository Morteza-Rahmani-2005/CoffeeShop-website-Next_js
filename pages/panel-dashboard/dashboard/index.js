import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import Layout from "@/components_dashboard/Layout";
import StatCard from "@/components_dashboard/StatCard";
import Panel from "@/components_dashboard/ui/Panel";
import styles from "@/pages/panel-dashboard/dashboard/index.module.css";
import { BsCalendarCheck } from "react-icons/bs";
import { BiCube } from "react-icons/bi";

const reservations = [
  { id: "r1", table: "4", name: "The Rostami Family", time: "18:30", guests: 4 },
  { id: "r2", table: "7", name: "Nora Abbasi", time: "19:00", guests: 2 },
  { id: "r3", table: "2", name: "College Friends Group", time: "19:45", guests: 6 },
  { id: "r4", table: "11", name: "Behrad Nouri", time: "20:15", guests: 2 },
];

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

  const popularProducts = useMemo(
    () =>
      [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 3),
    [products],
  );

  const stats = [
    {
      icon: <BsCalendarCheck />,
      tone: "info",
      label: "Reservations today",
      value: reservations.length,
      delta: "3.1%",
      direction: "down",
    },
    {
      icon: <BiCube />,
      tone: "negative",
      label: "Active products",
      value: products.filter((p) => p.available).length,
      delta: "5.0%",
      direction: "up",
    },
  ];

  return (
    <>
      <Head>
        <title>Dashboard</title>
      </Head>
      <Layout title="Dashboard" subtitle="Today's snapshot of your coffee shop">
        <div className={styles.greeting}>
          <h1 className={styles.greetingTitle}>Good morning, Armin ☕</h1>
          <p className={styles.greetingSub}>
            Here&apos;s what&apos;s happening at your shop today.
          </p>
        </div>

        <div className="row g-3 mb-4">
          {stats.map((s) => (
            <div className="col-12 col-md-6" key={s.label}>
              <StatCard {...s} />
            </div>
          ))}
        </div>

        <div className="row g-3">
          <div className="col-12 col-xl-8">
            <Panel>
              <div
                className={styles.sectionTitle}
                style={{ marginBottom: "0.9rem" }}
              >
                Best-selling products
              </div>
              <div className={styles.popularList}>
                {popularProducts.map((p) => {
                  const max = popularProducts[0]?.sold || 1;
                  const pct = Math.round(((p.sold || 0) / max) * 100);
                  return (
                    <div key={p._id}>
                      <div className={styles.popularRow}>
                        <span className={styles.popularName}>{p.name}</span>
                        <span className={styles.popularSold}>
                          {p.sold || 0} sold
                        </span>
                      </div>
                      <div className={styles.progress}>
                        <span style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
                {popularProducts.length === 0 && (
                  <p className={styles.muted}>
                    Add products to see rankings here.
                  </p>
                )}
              </div>
            </Panel>
          </div>

          <div className="col-12 col-xl-4">
            <Panel>
              <div className={styles.panelHeadTight}>
                <div className={styles.sectionTitle}>
                  Tonight&apos;s reservations
                </div>
                <a href="/reservations" className={styles.viewAllSm}>
                  All
                </a>
              </div>
              <div>
                {reservations.slice(0, 4).map((r) => (
                  <div className={styles.reservationRow} key={r.id}>
                    <div className={styles.tableChip}>{r.table}</div>
                    <div className={styles.reservationInfo}>
                      <div className={styles.reservationName}>{r.name}</div>
                      <div className={styles.reservationMeta}>
                        Table {r.table} · {r.guests} guests
                      </div>
                    </div>
                    <div className={styles.reservationTime}>{r.time}</div>
                  </div>
                ))}
                {reservations.length === 0 && (
                  <p className={styles.muted}>No reservations yet.</p>
                )}
              </div>
            </Panel>
          </div>
        </div>
      </Layout>
    </>
  );
}
