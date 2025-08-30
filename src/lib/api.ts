import type { Item } from "../types";

const KEY = "demo_items_v1";

function load(): Item[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Item[]) : [];
  } catch (error) {
    console.warn("Failed to parse stored data:", error);
    localStorage.removeItem(KEY);
    return [];
  }
}

function save(items: Item[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function seedIfEmpty() {
  const items = load();
  if (items.length === 0) {
    save([
      { id: 1, name: "Apple", qty: 10, price: 120 },
      { id: 2, name: "Banana", qty: 5, price: 80 },
      { id: 3, name: "Cookie", qty: 20, price: 300 },
    ]);
  }
}

export const api = {
  list(search?: string) {
    const items = load();
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((i) => i.name.toLowerCase().includes(q));
  },
  get(id: number) {
    return load().find((i) => i.id === id) ?? null;
  },
  create(payload: Omit<Item, "id">) {
    const items = load();
    const id = items.length ? Math.max(...items.map((i) => i.id)) + 1 : 1;
    const created = { id, ...payload };
    save([...items, created]);
    return created;
  },
  update(id: number, patch: Omit<Item, "id">) {
    const items = load();
    const idx = items.findIndex((i) => i.id === id);
    if (idx === -1) return null;
    items[idx] = { id, ...patch };
    save(items);
    return items[idx];
  },
  remove(id: number) {
    save(load().filter((i) => i.id !== id));
  },
};
