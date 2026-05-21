import { FaShoppingCart } from "react-icons/fa";

export default function TransactionCircle() {
    return (
        <div className="relative flex justify-center py-6">

            <div className="w-44 h-44 rounded-full border-[18px] border-indigo-50 border-t-indigo-600 border-r-indigo-400 -rotate-45 relative flex items-center justify-center">

                <div className="rotate-45 text-center">

                    <p className="text-3xl font-black text-slate-800 leading-none">
                        58
                    </p>

                    <p className="text-[10px] text-gray-400 font-bold mt-1">
                        Order
                    </p>

                </div>

                <div className="absolute -top-2 right-0 bg-slate-800 text-white px-3 py-2 rounded-xl text-[10px] shadow-xl rotate-45">

                    <FaShoppingCart size={12} />

                    <p>20 Order Baru</p>

                    <p className="font-bold italic">
                        13:00 - 16:00
                    </p>

                </div>

            </div>

        </div>
    );
}