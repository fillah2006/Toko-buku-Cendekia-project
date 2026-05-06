const dummyProducts = [
    { id: 1, title: "Laskar Pelangi", author: "Andrea Hirata", price: "Rp 85.000", stock: 20 },
    { id: 2, title: "Bumi Manusia", author: "Pramoedya Ananta Toer", price: "Rp 95.000", stock: 15 },
    { id: 3, title: "Negeri 5 Menara", author: "Ahmad Fuadi", price: "Rp 78.000", stock: 30 },
    { id: 4, title: "Atomic Habits", author: "James Clear", price: "Rp 120.000", stock: 12 },
];

export default function Products() {
    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-6">Produk Buku</h1>

            <div className="bg-white rounded-2xl shadow overflow-hidden">
                <table className="w-full text-sm text-left">
                    <thead className="bg-red-500 text-white">
                        <tr>
                            <th className="px-6 py-3">#</th>
                            <th className="px-6 py-3">Judul Buku</th>
                            <th className="px-6 py-3">Penulis</th>
                            <th className="px-6 py-3">Harga</th>
                            <th className="px-6 py-3">Stok</th>
                        </tr>
                    </thead>
                    <tbody>
                        {dummyProducts.map((product) => (
                            <tr
                                key={product.id}
                                className="border-b hover:bg-red-50 transition"
                            >
                                <td className="px-6 py-4 text-gray-500">{product.id}</td>
                                <td className="px-6 py-4 font-medium text-gray-800">
                                    {product.title}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{product.author}</td>
                                <td className="px-6 py-4 text-red-500 font-semibold">
                                    {product.price}
                                </td>
                                <td className="px-6 py-4 text-gray-700">{product.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}