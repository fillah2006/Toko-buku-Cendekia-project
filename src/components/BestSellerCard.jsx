import { FaBook } from "react-icons/fa";

export default function BestSellerCard({
    title,
    author,
    sales,
    color
}) {
    return (
        <div className="group p-4 rounded-2xl border border-gray-50 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:shadow-indigo-500/5 transition-all duration-300">

            <div className={`w-12 h-12 ${color} rounded-xl shadow-lg mb-4 flex items-center justify-center text-white text-xl`}>

                <FaBook />

            </div>

            <h4 className="font-bold text-slate-800 text-sm mb-1 truncate">
                {title}
            </h4>

            <p className="text-[11px] text-gray-400 mb-3">
                {author}
            </p>

            <div className="pt-3 border-t border-gray-100 flex justify-between items-center">

                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">
                    Terjual
                </span>

                <span className="text-xs font-black text-indigo-600">
                    {sales} pcs
                </span>

            </div>

        </div>
    );
}