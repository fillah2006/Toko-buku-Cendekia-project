import { useEffect, useMemo, useState } from "react";
import { FaPlus, FaSearch, FaTrash, FaEdit } from "react-icons/fa";
import { createUser, deleteUser, getUsers, updateUser } from "../services/userAPI";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState("create");
  const [form, setForm] = useState({ id: "", nama: "", email: "", role: "user" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    try {
      const data = await getUsers(search);
      setUsers(data);
    } catch (err) {
      setError(err?.message || "Gagal mengambil data user.");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

  const filteredUsers = useMemo(() => users, [users]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      if (mode === "edit" && form.id) {
        await updateUser(form.id, { nama: form.nama, email: form.email, role: form.role });
      } else {
        await createUser({ nama: form.nama, email: form.email, role: form.role });
      }

      setForm({ id: "", nama: "", email: "", role: "user" });
      setMode("create");
      await fetchUsers();
    } catch (err) {
      setError(err?.message || "Gagal menyimpan user.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (userItem) => {
    setMode("edit");
    setForm({ id: userItem.id, nama: userItem.nama || "", email: userItem.email || "", role: userItem.role || "user" });
  };

  const handleDelete = async (id) => {
    try {
      await deleteUser(id);
      await fetchUsers();
    } catch (err) {
      setError(err?.message || "Gagal menghapus user.");
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-slate-800">Manajemen User</h1>
            <p className="text-sm font-medium text-gray-400">CRUD data user menggunakan Supabase Database</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded-2xl bg-slate-50 px-4 py-2">
              <FaSearch className="mr-2 text-slate-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cari user..."
                className="bg-transparent text-sm outline-none"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-[2rem] border border-gray-100 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FaPlus className="text-indigo-500" />
            <h2 className="text-lg font-bold text-slate-800">{mode === "edit" ? "Edit User" : "Tambah User"}</h2>
          </div>

          {error ? <p className="mb-4 text-sm text-red-500">{error}</p> : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm text-slate-600">Nama</label>
              <input
                value={form.nama}
                onChange={(e) => setForm({ ...form, nama: e.target.value })}
                className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-600">Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-slate-600">Role</label>
              <select
                value={form.role}
                onChange={(e) => setForm({ ...form, role: e.target.value })}
                className="w-full rounded-2xl border border-gray-200 bg-slate-50 px-4 py-3 text-sm outline-none"
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-indigo-600 px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700"
            >
              {loading ? "Memproses..." : mode === "edit" ? "Simpan Perubahan" : "Tambah User"}
            </button>
          </form>
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-sm">
          <div className="max-h-[60vh] overflow-auto">
            <table className="min-w-full border-collapse text-left">
              <thead className="bg-slate-50/60">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">Nama</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">Email</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">Role</th>
                  <th className="px-6 py-4 text-[11px] font-black uppercase tracking-widest text-gray-400">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((userItem) => (
                  <tr key={userItem.id} className="border-t border-gray-50 hover:bg-slate-50/50">
                    <td className="px-6 py-4 text-sm font-semibold text-slate-800">{userItem.nama || "-"}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{userItem.email || "-"}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{userItem.role || "user"}</td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button onClick={() => handleEdit(userItem)} className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600">
                          <FaEdit size={14} />
                        </button>
                        <button onClick={() => handleDelete(userItem.id)} className="rounded-xl bg-slate-100 p-2 text-slate-600 hover:bg-red-50 hover:text-red-600">
                          <FaTrash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
