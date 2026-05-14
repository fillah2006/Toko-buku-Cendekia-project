import { useParams, Link } from "react-router-dom";

const dummyProducts = [
    {
        id: 1,
        title: "Laskar Pelangi",
        author: "Andrea Hirata",
        price: "Rp 85.000",
        stock: 20,
        category: "Novel",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJUCQ8rYbCUia0D2P7xr9Jh9z922eROSBcMQ&s"
    },
    {
        id: 2,
        title: "Bumi Manusia",
        author: "Pramoedya Ananta Toer",
        price: "Rp 95.000",
        stock: 5,
        category: "Sejarah",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjtAo1fHoWNFh27t76-sNsWVXC71T75a_tOg&s"
    },
    {
        id: 3,
        title: "Negeri 5 Menara",
        author: "Ahmad Fuadi",
        price: "Rp 78.000",
        stock: 30,
        category: "Inspiratif",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuAu1Acasfw641aOoYAIbTGzOP6WKpobqn6Q&s"
    },
    {
        id: 4,
        title: "Atomic Habits",
        author: "James Clear",
        price: "Rp 120.000",
        stock: 0,
        category: "Self-Dev",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqKXJh0Z-C0VMF79lHCo12udelN0zgG-DReQ&s"
    },
];

export default function ProductDetail() {

    const { id } = useParams();

    const product = dummyProducts.find(
        (item) => item.id === parseInt(id)
    );

    if (!product) {
        return (
            <div className="p-6 text-red-500 font-bold">
                Buku tidak ditemukan
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 p-8">

                <div className="flex flex-col md:flex-row gap-8">

                    {/* Gambar Buku */}
                    <div className="flex justify-center">

                        <img
                            src={product.image}
                            alt={product.title}
                            loading="lazy"
                            className="w-56 h-80 object-cover rounded-2xl shadow-md border border-gray-100"
                        />

                    </div>

                    {/* Detail Buku */}
                    <div className="flex-1">

                        <p className="text-sm text-indigo-600 font-bold uppercase tracking-widest mb-2">
                            {product.category}
                        </p>

                        <h1 className="text-4xl font-black text-slate-800 mb-2">
                            {product.title}
                        </h1>

                        <p className="text-lg text-gray-500 mb-6">
                            {product.author}
                        </p>

                        <div className="space-y-5">

                            {/* Harga */}
                            <div>

                                <p className="text-xs text-gray-400 uppercase font-bold">
                                    Harga
                                </p>

                                <p className="text-2xl font-black text-slate-800">
                                    {product.price}
                                </p>

                            </div>

                            {/* Stock */}
                            <div>

                                <p className="text-xs text-gray-400 uppercase font-bold">
                                    Stok
                                </p>

                                <p className="text-lg font-bold text-slate-700">
                                    {product.stock} Buku
                                </p>

                            </div>

                            {/* Status */}
                            <div>

                                <p className="text-xs text-gray-400 uppercase font-bold">
                                    Status
                                </p>

                                <p
                                    className={`font-bold ${
                                        product.stock > 0
                                            ? "text-green-600"
                                            : "text-red-600"
                                    }`}
                                >
                                    {product.stock > 0
                                        ? "Tersedia"
                                        : "Habis"}
                                </p>

                            </div>

                        </div>

                        {/* Tombol */}
                        <Link
                            to="/products"
                            className="inline-block mt-8 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-2xl font-bold transition-all"
                        >
                            Kembali ke Produk
                        </Link>

                    </div>

                </div>

            </div>

        </div>
    );
}