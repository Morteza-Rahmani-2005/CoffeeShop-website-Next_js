import Head from "next/head";
import { useMemo } from "react";
import Layout from "@/components_dashboard/Layout";
import StatCard from "@/components_dashboard/StatCard";
import BrewGauge from "@/components_dashboard/BrewGauge";
import Panel from "@/components_dashboard/ui/Panel";
import StatusBadge from "@/components_dashboard/ui/StatusBadge";
import DataTable from "@/components_dashboard/ui/DataTable";
import { useStore } from "@/lib/store";
import styles from "@/pages/panel-dashboard/dashboard/index.module.css";
import { BsCalendarCheck, BsCupHotFill, BsWallet2 } from "react-icons/bs";
import { BiCube } from "react-icons/bi";

const STATUS_LABEL = {
  ready: "Ready",
  brewing: "Brewing",
  pending: "Pending",
  canceled: "Canceled",
};

export default function index() {
  const siteName = useStore((s) => s.content.siteName);
  const orders = useStore((s) => s.orders);
  const reservations = useStore((s) => s.reservations);
  const products = useStore((s) => s.products);

  const revenueToday = useMemo(
    () =>
      orders
        .filter((o) => o.status !== "canceled")
        .reduce((sum, o) => sum + Number(o.price || 0), 0),
    [orders],
  );

  const popularProducts = useMemo(
    () =>
      [...products].sort((a, b) => (b.sold || 0) - (a.sold || 0)).slice(0, 3),
    [products],
  );

  const goalTarget = 180;
  const goalPercent = Math.min(
    100,
    Math.round((orders.length / goalTarget) * 100),
  );

  const stats = [
    {
      icon: <BsCupHotFill />,
      tone: "accent",
      label: "Orders today",
      value: orders.length,
      delta: "8.2%",
      direction: "up",
    },
    {
      icon: <BsWallet2 />,
      tone: "positive",
      label: "Revenue today",
      value: `$${revenueToday.toFixed(2)}`,
      delta: "12.4%",
      direction: "up",
    },
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
        <title>Dashboard | {siteName}</title>
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
            <div className="col-6 col-lg-3" key={s.label}>
              <StatCard {...s} />
            </div>
          ))}
        </div>

        <div className="row g-3">
          <div className="col-12 col-xl-8">
            <Panel className={styles.tablePanel}>
              <div className={styles.panelHead}>
                <div>
                  <div className={styles.sectionTitle}>Recent orders</div>
                  <div className={styles.sectionSub}>
                    Latest orders placed at the shop
                  </div>
                </div>
                <a href="/orders" className={styles.viewAll}>
                  View all <i className="bi bi-arrow-right ms-1" />
                </a>
              </div>

              <DataTable>
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Customer</th>
                    <th>Size</th>
                    <th>Price</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map((o) => (
                    <tr key={o.id}>
                      <td>
                        <div className={styles.itemCell}>
                          <div className={styles.cupThumb}>
                            <BsCupHotFill />
                          </div>
                          <div>
                            <div className={styles.itemName}>{o.item}</div>
                            <div className={styles.itemId}>#{o.id}</div>
                          </div>
                        </div>
                      </td>
                      <td>{o.customer}</td>
                      <td className={styles.muted}>{o.size}</td>
                      <td className={styles.mono}>
                        ${Number(o.price).toFixed(2)}
                      </td>
                      <td>
                        <StatusBadge
                          status={o.status}
                          label={STATUS_LABEL[o.status]}
                        />
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={5} className={styles.empty}>
                        No orders yet.
                      </td>
                    </tr>
                  )}
                </tbody>
              </DataTable>
            </Panel>

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
                    <div key={p.id}>
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
            <Panel className={styles.gaugePanel}>
              <div className={styles.sectionTitle}>Daily goal progress</div>
              <div
                className={styles.sectionSub}
                style={{ marginBottom: "0.9rem" }}
              >
                {orders.length} of {goalTarget} target orders
              </div>
              <BrewGauge percent={goalPercent} label="Completed" />
            </Panel>

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
