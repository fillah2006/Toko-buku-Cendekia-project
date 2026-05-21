export default function Pagination() {
    return (
        <div className="flex gap-4">

            <button className="text-[11px] font-bold text-gray-400 hover:text-indigo-600 transition">
                Halaman Sebelumnya
            </button>

            <button className="text-[11px] font-bold text-indigo-600 transition">
                Berikutnya
            </button>

        </div>
    );
}