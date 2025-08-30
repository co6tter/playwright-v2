import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { api, seedIfEmpty } from "../lib/api";

export default function Dashboard() {
  const [search, setSearch] = useState("");

  useEffect(() => {
    seedIfEmpty();
  }, []);

  const items = useMemo(() => api.list(search), [search]);

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
          {items.map((i) => (
            <tr key={i.id} data-testid={`item-row-${i.id}`}>
              <td className="border p-2">{i.name}</td>
              <td className="border p-2 text-right">{i.qty}</td>
              <td className="border p-2 text-right">{i.price}</td>
              <td className="border p-2 text-center">
                <Link to={`/${i.id}/edit`} data-testid={`edit-${i.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
