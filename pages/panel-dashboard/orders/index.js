import Head from "next/head";
import Layout from "@/components_dashboard/Layout";
import PageHeader from "@/components_dashboard/ui/PageHeader";
import Panel from "@/components_dashboard/ui/Panel";
import DataTable from "@/components_dashboard/ui/DataTable";
import StatusBadge from "@/components_dashboard/ui/StatusBadge";
import styles from "./orders.module.css";

const STATUS_LABEL = { ready: "Ready", brewing: "Brewing", pending: "Pending", canceled: "Canceled" };

const orders = [
  { id: "1042", item: "Vanilla Latte", customer: "Nathan Reed", size: "Large", price: 4.5, time: "14:12", status: "ready" },
  { id: "1041", item: "Double Espresso", customer: "Emily Carter", size: "Small", price: 3.2, time: "14:05", status: "brewing" },
  { id: "1040", item: "Cappuccino", customer: "Lucas Bennett", size: "Medium", price: 3.9, time: "13:58", status: "pending" },
  { id: "1039", item: "Cold Brew", customer: "Olivia Grant", size: "Large", price: 4.0, time: "13:45", status: "ready" },
  { id: "1038", item: "Dark Mocha", customer: "Maria Lopez", size: "Medium", price: 4.3, time: "13:30", status: "canceled" },
  { id: "1037", item: "Turkish Coffee", customer: "James Foster", size: "Small", price: 3.6, time: "13:20", status: "ready" },
];

export default function Orders() {
  return (
    <>
      <Head>
        <title>Orders</title>
      </Head>
      <Layout title="Orders" subtitle="Recent orders">
        <PageHeader title="Orders" subtitle={`${orders.length} orders on record`} />

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
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
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
                  <td className={styles.mono}>${o.price.toFixed(2)}</td>
                  <td><StatusBadge status={o.status} label={STATUS_LABEL[o.status]} /></td>
                </tr>
              ))}
            </tbody>
          </DataTable>
        </Panel>
      </Layout>
    </>
  );
}
