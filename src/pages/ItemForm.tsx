import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { api } from "../lib/api";
import type { Item } from "../types";

export default function ItemForm() {
  const nav = useNavigate();
  const params = useParams();
  const id = params.id ? Number(params.id) : null;
  const editing = Boolean(id);

  const [model, setModel] = useState<Omit<Item, "id">>({
    name: "",
    qty: 0,
    price: 0,
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (editing && id) {
      const found = api.get(id);
      if (found)
        setModel({ name: found.name, qty: found.qty, price: found.price });
    }
  }, [editing, id]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!model.name.trim()) {
      setError("Name is required");
      return;
    }
    if (model.qty < 0 || model.price < 0) {
      setError("Invalid numbers");
      return;
    }

    if (editing && id) api.update(id, model);
    else api.create(model);

    nav("/");
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-4">
      <h1 className="text-xl font-bold">{editing ? "Edit" : "New"} Item</h1>
      {error && (
        <div className="text-red-600" data-testid="form-error">
          {error}
        </div>
      )}
      <form onSubmit={onSubmit} className="space-y-3">
        <label className="block">
          <span>Name</span>
          <input
            data-testid="item-name"
            className="w-full border rounded p-2"
            value={model.name}
            onChange={(e) => setModel({ ...model, name: e.target.value })}
          />
        </label>
        <label className="block">
          <span>Qty</span>
          <input
            data-testid="item-qty"
            type="number"
            className="w-full border rounded p-2"
            value={model.qty}
            onChange={(e) =>
              setModel({ ...model, qty: Number(e.target.value) })
            }
          />
        </label>
        <label className="block">
          <span>Price</span>
          <input
            data-testid="item-price"
            type="number"
            className="w-full border rounded p-2"
            value={model.price}
            onChange={(e) =>
              setModel({ ...model, price: Number(e.target.value) })
            }
          />
        </label>
        <div className="flex gap-2">
          <button data-testid="item-save" className="border rounded p-2">
            Save
          </button>
          <Link className="border rounded p-2" to="/">
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
