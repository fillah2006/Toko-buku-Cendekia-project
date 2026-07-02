import { FaSearch } from "react-icons/fa";

export default function SearchInput({
    placeholder = "Cari..."
}) {
    return (
        <div className="relative w-full sm:w-72">
            <FaSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

            <input
                type="text"
                placeholder={placeholder}
                className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-12 pr-4 text-sm text-slate-700 outline-none shadow-sm transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
            />
        </div>
    );
}