import { create } from "zustand";
import { persist } from "zustand/middleware";

const uid = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`;

// const SEED_PRODUCTS = [
//   { id: "p1", name: "Vanilla Latte", category: "Hot Coffee", price: 4.5, description: "Espresso with steamed milk and vanilla syrup.", icon: "bi-cup-hot-fill", available: true, sold: 42 },
//   { id: "p2", name: "Double Espresso", category: "Hot Coffee", price: 3.2, description: "Two concentrated shots with a rich crema.", icon: "bi-cup-fill", available: true, sold: 35 },
//   { id: "p3", name: "Cold Brew", category: "Cold Coffee", price: 4.0, description: "Steeped 18 hours for a smooth, low-acid taste.", icon: "bi-cup-straw", available: true, sold: 29 },
//   { id: "p4", name: "Caramel Iced Latte", category: "Cold Coffee", price: 4.8, description: "Iced latte finished with house caramel sauce.", icon: "bi-cup-straw", available: false, sold: 18 },
//   { id: "p5", name: "Turkish Coffee", category: "Brewed & Turkish", price: 3.6, description: "Slow-brewed in a traditional copper pot.", icon: "bi-cup-fill", available: true, sold: 22 },
//   { id: "p6", name: "Dark Mocha", category: "Hot Coffee", price: 4.3, description: "Espresso blended with 70% dark chocolate.", icon: "bi-cup-hot-fill", available: true, sold: 27 },
//   { id: "p7", name: "Tiramisu", category: "Dessert", price: 6.5, description: "Espresso-soaked sponge with mascarpone cream.", icon: "bi-cake2-fill", available: true, sold: 15 },
//   { id: "p8", name: "Flat White", category: "Hot Coffee", price: 4.1, description: "Double ristretto shot with velvety micro-foam.", icon: "bi-cup-hot-fill", available: true, sold: 24 },
// ];

const SEED_ADMINS = [
  { id: "a1", name: "Armin Rezaei", email: "armin@dibacoffee.com", role: "Owner", status: "active", addedAt: "2026-02-11" },
  { id: "a2", name: "Sara Hosseini", email: "sara@dibacoffee.com", role: "Manager", status: "active", addedAt: "2026-04-03" },
  { id: "a3", name: "Kian Moradi", email: "kian@dibacoffee.com", role: "Staff", status: "suspended", addedAt: "2026-06-19" },
];

const SEED_ORDERS = [
  { id: "1042", item: "Vanilla Latte", customer: "Nathan Reed", size: "Large", price: 4.5, time: "14:12", status: "ready" },
  { id: "1041", item: "Double Espresso", customer: "Emily Carter", size: "Small", price: 3.2, time: "14:05", status: "brewing" },
  { id: "1040", item: "Cappuccino", customer: "Lucas Bennett", size: "Medium", price: 3.9, time: "13:58", status: "pending" },
  { id: "1039", item: "Cold Brew", customer: "Olivia Grant", size: "Large", price: 4.0, time: "13:45", status: "ready" },
  { id: "1038", item: "Dark Mocha", customer: "Maria Lopez", size: "Medium", price: 4.3, time: "13:30", status: "canceled" },
  { id: "1037", item: "Turkish Coffee", customer: "James Foster", size: "Small", price: 3.6, time: "13:20", status: "ready" },
];

const SEED_RESERVATIONS = [
  { id: "r1", table: "4", name: "The Rostami Family", phone: "+1 555 010 2938", time: "18:30", guests: 4, status: "confirmed" },
  { id: "r2", table: "7", name: "Nora Abbasi", phone: "+1 555 019 8765", time: "19:00", guests: 2, status: "seated" },
  { id: "r3", table: "2", name: "College Friends Group", phone: "+1 555 112 2334", time: "19:45", guests: 6, status: "pending" },
  { id: "r4", table: "11", name: "Behrad Nouri", phone: "+1 555 194 4567", time: "20:15", guests: 2, status: "confirmed" },
];

const SEED_CONTENT = {
  siteName: "Diba Coffee House",
  heroTitle: "Great coffee, brewed with care.",
  heroSubtitle: "Order ahead, reserve a table, and skip the line.",
  ctaLabel: "Order Now",
  aboutText:
    "Diba Coffee House has been roasting small batches and serving the neighborhood since 2019. Every cup is brewed to order, from single-origin pour-overs to classic espresso drinks.",
  address: "128 Maple Street, Portland, OR",
  phone: "+1 (555) 214-7788",
  email: "hello@dibacoffee.com",
  openingHours: "Mon–Fri 7:00–20:00, Sat–Sun 8:00–21:00",
  instagram: "@dibacoffee",
};

export const useStore = create(
  persist(
    (set) => ({
      hasHydrated: false,
      setHasHydrated: (v) => set({ hasHydrated: v }),
      currentAdminId: "a1",
      // products: SEED_PRODUCTS,
      admins: SEED_ADMINS,
      orders: SEED_ORDERS,
      reservations: SEED_RESERVATIONS,
      content: SEED_CONTENT,

      // Products
      addProduct: (product) =>
        set((s) => ({ products: [{ id: uid(), sold: 0, ...product }, ...s.products] })),
      updateProduct: (id, patch) =>
        set((s) => ({ products: s.products.map((p) => (p.id === id ? { ...p, ...patch } : p)) })),
      deleteProduct: (id) => set((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      // Admins
      addAdmin: (admin) =>
        set((s) => ({
          admins: [{ id: uid(), status: "active", addedAt: new Date().toISOString().slice(0, 10), ...admin }, ...s.admins],
        })),
      updateAdmin: (id, patch) =>
        set((s) => ({ admins: s.admins.map((a) => (a.id === id ? { ...a, ...patch } : a)) })),
      updateCurrentAdmin: (patch) =>
        set((s) => ({ admins: s.admins.map((a) => (a.id === s.currentAdminId ? { ...a, ...patch } : a)) })),
      deleteAdmin: (id) => set((s) => ({ admins: s.admins.filter((a) => a.id !== id) })),

      // Orders
      addOrder: (order) => {
        const id = String(Math.floor(1000 + Math.random() * 9000));
        set((s) => ({ orders: [{ id, status: "pending", ...order }, ...s.orders] }));
        return id;
      },
      updateOrder: (id, patch) =>
        set((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, ...patch } : o)) })),
      deleteOrder: (id) => set((s) => ({ orders: s.orders.filter((o) => o.id !== id) })),

      // Reservations
      addReservation: (resv) =>
        set((s) => ({ reservations: [{ id: uid(), status: "pending", ...resv }, ...s.reservations] })),
      updateReservation: (id, patch) =>
        set((s) => ({ reservations: s.reservations.map((r) => (r.id === id ? { ...r, ...patch } : r)) })),
      deleteReservation: (id) => set((s) => ({ reservations: s.reservations.filter((r) => r.id !== id) })),

      // Content
      updateContent: (patch) => set((s) => ({ content: { ...s.content, ...patch } })),
    }),
    {
      name: "cad-state-v2",
      skipHydration: true,
      partialize: (state) => {
        const { hasHydrated, setHasHydrated, ...rest } = state;
        return rest;
      },
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    }
  )
);

export const useCurrentAdmin = () =>
  useStore((s) => s.admins.find((a) => a.id === s.currentAdminId) || s.admins[0] || null);
