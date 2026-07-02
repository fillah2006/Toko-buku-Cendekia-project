import {
    FaEnvelope,
    FaEllipsisH
} from "react-icons/fa";

import Avatar from "./Avatar";
import Badge from "./Badge";

export default function CustomerRow({ customer }) {
    const status = customer.statusPelanggan ?? customer.status ?? "Active";
    const isPreorder = customer.status_preorder ?? customer.statusPreorder ?? false;

    return (
        <tr className="group transition-colors hover:bg-slate-50/50">
            <td className="px-6 py-5">
                <div className="flex items-center gap-4">
                    <Avatar name={customer.name} />

                    <div>
                        <p className="text-sm font-bold text-slate-800">
                            {customer.name}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-tighter text-gray-400">
                            Member ID {customer.id_pelanggan ? `#${customer.id_pelanggan}` : `#00${customer.id}`}
                        </p>
                    </div>
                </div>
            </td>

            <td className="px-6 py-5">
                <div className="space-y-1 text-slate-600">
                    <div className="flex items-center gap-2">
                        <FaEnvelope className="text-gray-300" size={12} />
                        <span className="text-sm font-medium">{customer.email}</span>
                    </div>
                    <p className="text-[10px] font-medium text-gray-400">
                        {customer.noHp || customer.phone || "No HP belum diisi"}
                    </p>
                    <p className="text-[10px] font-medium text-gray-400">
                        {customer.alamat || customer.address || "Alamat belum diisi"}
                    </p>
                </div>
            </td>

            <td className="px-6 py-5">
                <span className="rounded-full bg-indigo-50 px-3 py-1 text-[10px] font-bold uppercase tracking-tight text-indigo-600">
                    {customer.kategoriPelanggan || customer.customerCategory || "Reguler"}
                </span>
            </td>

            <td className="px-6 py-5">
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-tight text-slate-600">
                    {customer.levelMember || customer.memberLevel || "Basic"}
                </span>
            </td>

            <td className="px-6 py-5 text-center">
                <span className="text-sm font-black text-slate-800">
                    {customer.totalTransaksi ?? customer.totalOrder ?? 0}
                </span>
            </td>

            <td className="px-6 py-5 text-center">
                <span className="text-sm font-black text-amber-600">
                    {customer.poinLoyalitas ?? customer.loyaltyPoints ?? 0}
                </span>
            </td>

            <td className="px-6 py-5 text-center">
                <Badge type={status === "Active" ? "success" : "secondary"}>
                    {status}
                    {isPreorder ? " • Preorder" : ""}
                </Badge>
            </td>

            <td className="px-6 py-5">
                <p className="text-sm text-slate-600">
                    {customer.transaksiTerakhir || "Belum ada"}
                </p>
            </td>

            <td className="px-6 py-5">
                <div className="flex justify-end">
                    <button className="rounded-xl p-2 text-slate-300 transition-all hover:bg-indigo-50 hover:text-indigo-600">
                        <FaEllipsisH size={16} />
                    </button>
                </div>
            </td>
        </tr>
    );
}