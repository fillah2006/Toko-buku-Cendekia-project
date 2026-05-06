const dummyTransactions = [
    { id: "TRX001", customer: "Andi Pratama", book: "Laskar Pelangi", total: "Rp 85.000", status: "Selesai" },
    { id: "TRX002", customer: "Budi Santoso", book: "Atomic Habits", total: "Rp 120.000", status: "Diproses" },
    { id: "TRX003", customer: "Citra Dewi", book: "Bumi Manusia", total: "Rp 95.000", status: "Selesai" },
    { id: "TRX004", customer: "Dian Ayu", book: "Negeri 5 Menara", total: "Rp 78.000", status: "Dibatalkan" },
];

const statusColor = {
    Selesai: "bg-green-100 text-green-700",
    Diproses: "bg-yellow-100 text-yellow-700",
    Dibatalkan: "bg-red-100 text-red-700",
};

export default function Transactions() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Transaksi</h1>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-red-500 text-white">
                        <tr>
                            <th className="px-6 py-3">ID</th>
                            <th className="px-6 py-3">Pelanggan</th>
                            <th className="px-6 py-3">Buku</th>
                            <th className="px-6 py-3">Total</th>
                            <th className="px-6 py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyTransactions.map((trx) => (
                            <tr
                                key={trx.id}
                                className="border-b hover:bg-red-50 transition"
                            >
                                <td className="px-6 py-4 text-gray-500 font-mono">{trx.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {trx.customer}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{trx.book}</td>
                                <td className="px-6 py-4 text-red-500 font-semibold">
                                    {trx.total}
                                </td>
                                <td className="px-6 py-4">
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor[trx.status]}`}
                                    >
                                        {trx.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}