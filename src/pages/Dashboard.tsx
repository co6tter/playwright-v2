import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api, seedIfEmpty } from "../lib/api";
import type { Item } from "../types";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    seedIfEmpty();
    setItems(api.list());
  }, []);

  const filtered = useMemo(() => {
    if (!search) return items;
    const q = search.toLowerCase();
    return items.filter((i) => i.name.toLowerCase().includes(q));
  }, [items, search]);

  const handleDelete = (id: number) => {
    api.remove(id);
    setItems(api.list());
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-xl font-bold mb-4">Dashboard</h1>

      <div className="flex gap-2 mb-3">
        <input
          data-testid="search-input"
          className="border rounded p-2 flex-1"
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Link to="/new" className="border rounded p-2" data-testid="new-item">
          New
        </Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-50">
            <th className="border p-2 text-left">Name</th>
            <th className="border p-2 text-right">Qty</th>
            <th className="border p-2 text-right">Price</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((i) => (
            <tr key={i.id} data-testid={`item-row-${i.id}`}>
              <td className="border p-2">{i.name}</td>
              <td className="border p-2 text-right">{i.qty}</td>
              <td className="border p-2 text-right">{i.price}</td>
              <td className="border p-2 text-center space-x-2">
                <Link to={`/${i.id}/edit`} data-testid={`edit-${i.id}`}>
                  Edit
                </Link>
                <button
                  data-testid={`delete-${i.id}`}
                  className="border rounded px-2 py-1"
                  onClick={() => handleDelete(i.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {filtered.length === 0 && (
            <tr>
              <td className="border p-4 text-center text-gray-500" colSpan={4}>
                No items
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
