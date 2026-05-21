export default function StatCard({
    title,
    value
}) {
    return (
        <div className="bg-slate-50 p-4 rounded-2xl">

            <p className="text-[10px] text-gray-400 font-bold mb-1">
                {title}
            </p>

            <p className="text-lg font-black text-slate-800">
                {value}
            </p>

        </div>
    );
}