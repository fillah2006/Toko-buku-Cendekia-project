import { FaSearch } from "react-icons/fa";

export default function SearchInput({
    placeholder = "Cari..."
}) {
    return (
        <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-300" />

            <input
                type="text"
                placeholder={placeholder}
                className="pl-12 pr-4 py-2.5 bg-white border-none rounded-2xl shadow-sm text-sm focus:ring-2 focus:ring-indigo-500/20 w-72 outline-none"
            />
        </div>
    );
}