import {
    FaEnvelope,
    FaShoppingBasket,
    FaEllipsisH
} from "react-icons/fa";

import Avatar from "./Avatar";
import Badge from "./Badge";

export default function CustomerRow({
    customer,
    index
}) {
    return (
        <tr className="hover:bg-slate-50/50 transition-colors group">

            {/* Nama */}
            <td className="px-8 py-5">
                <div className="flex items-center gap-4">

                    <Avatar name={customer.name} />

                    <div>
                        <p className="font-bold text-slate-800 text-sm">
                            {customer.name}
                        </p>

                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                            Member ID #00{customer.id}
                        </p>
                    </div>

                </div>
            </td>

            {/* Email */}
            <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-slate-600">
                    <FaEnvelope className="text-gray-300" size={12} />

                    <span className="text-sm font-medium">
                        {customer.email}
                    </span>
                </div>
            </td>

            {/* Order */}
            <td className="px-6 py-5">
                <div className="flex justify-center">

                    <div className="flex items-center gap-1.5 bg-orange-50 px-3 py-1 rounded-full">
                        <FaShoppingBasket
                            className="text-orange-500"
                            size={10}
                        />

                        <span className="text-sm font-black text-orange-600">
                            {customer.totalOrder}
                        </span>
                    </div>

                </div>
            </td>

            {/* Status */}
            <td className="px-6 py-5 text-center">
                <Badge
                    type={
                        customer.status === "Active"
                            ? "success"
                            : "secondary"
                    }
                >
                    {customer.status}
                </Badge>
            </td>

            {/* Aksi */}
            <td className="px-8 py-5">
                <div className="flex justify-end">

                    <button className="p-2 text-slate-300 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
                        <FaEllipsisH size={16} />
                    </button>

                </div>
            </td>

        </tr>
    );
}