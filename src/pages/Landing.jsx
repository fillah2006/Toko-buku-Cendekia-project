import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaBookOpen, FaWhatsapp, FaEnvelope, FaMapMarkerAlt, FaClock, FaStar } from "react-icons/fa";
import supabase from "../services/supabase";

const TABLE_CANDIDATES = {
  books: ["books", "products", "products_list", "book_products"],
  reviews: ["testimonials", "reviews", "feedback", "customer_reviews"]
};

const placeholderCover = "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=800&q=80";

const fetchFirstValidTable = async (tables) => {
  for (const table of tables) {
    const { data, error } = await supabase.from(table).select("*").limit(8);
    if (!error && Array.isArray(data)) {
      return { data, table };
    }
  }

  return { data: [], table: null };
};

const sectionFade = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Card = ({ children, className = "" }) => (
  <div className={`rounded-[2rem] border border-white/60 bg-white/90 p-6 shadow-[0_20px_80px_rgba(90,70,55,0.08)] backdrop-blur-xl ${className}`}>
    {children}
  </div>
);

const formatBook = (book) => ({
  id: book.id ?? book.book_id ?? book.uuid,
  title: book.title ?? book.name ?? book.judul ?? "Judul Buku",
  author: book.author ?? book.penulis ?? "Penulis Tidak Diketahui",
  category: book.category ?? book.kategori ?? book.genre ?? "Umum",
  cover: book.cover_url ?? book.cover ?? book.image_url ?? book.thumbnail ?? placeholderCover
});

const formatReview = (review) => ({
  id: review.id ?? review.review_id ?? review.uuid,
  name: review.name ?? review.username ?? review.user_name ?? "Pelanggan",
  message: review.message ?? review.comment ?? review.review ?? review.body ?? "Ulasan unavailable.",
  rating: Number(review.rating ?? review.score ?? review.stars ?? 5)
});

export default function Landing() {
  const [books, setBooks] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [bookSource, setBookSource] = useState(null);
  const [reviewSource, setReviewSource] = useState(null);
  const [contactState, setContactState] = useState({ name: "", email: "", message: "", success: false });

  useEffect(() => {
    const loadData = async () => {
      const booksResult = await fetchFirstValidTable(TABLE_CANDIDATES.books);
      setBooks(booksResult.data.map(formatBook).slice(0, 8));
      setBookSource(booksResult.table);
      setLoadingBooks(false);

      const reviewsResult = await fetchFirstValidTable(TABLE_CANDIDATES.reviews);
      setReviews(reviewsResult.data.map(formatReview).slice(0, 6));
      setReviewSource(reviewsResult.table);
      setLoadingReviews(false);
    };

    loadData();
  }, []);

  const handleContactSubmit = (event) => {
    event.preventDefault();
    setContactState((prev) => ({ ...prev, success: true }));
  };

  return (
    <main className="min-h-screen bg-slate-100 text-slate-900">
      <section className="relative overflow-hidden rounded-b-[4rem] bg-white px-6 pt-6 pb-14 shadow-sm md:px-10 lg:px-20">
        <div className="absolute inset-x-0 top-0 h-[260px] bg-[radial-gradient(circle_at_top_left,_rgba(99,102,241,0.15),_transparent_45%)]" />
        <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:gap-12">
          <div className="flex items-center justify-between rounded-[2rem] border border-slate-200 bg-slate-50/80 px-6 py-4 shadow-sm backdrop-blur-xl">
            <div className="text-sm font-bold text-slate-700 uppercase tracking-[0.3em]">Toko Buku Cendekia</div>
            <a href="/login" className="inline-flex items-center justify-center rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700">
              Login
            </a>
          </div>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-center lg:justify-between">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionFade}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <span className="inline-flex rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold uppercase tracking-[0.24em] text-indigo-700">
              Toko Buku Cendekia
            </span>
            <h1 className="mt-8 max-w-xl text-5xl font-black leading-tight text-slate-900 sm:text-6xl">
              Toko Buku Cendekia
            </h1>
            <p className="mt-6 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              Pusat buku dan ilmu pengetahuan dengan koleksi curated untuk setiap pembaca. Eksplorasi cerita, inspirasi, dan wawasan dalam suasana yang tenang dan elegan.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a href="#featured" className="inline-flex items-center justify-center rounded-3xl bg-indigo-600 px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:-translate-y-0.5 hover:bg-indigo-700">
                Lihat Buku
              </a>
              <a href="#contact" className="inline-flex items-center justify-center rounded-3xl border border-indigo-600 bg-white px-8 py-4 text-sm font-semibold text-indigo-600 transition hover:-translate-y-0.5 hover:bg-indigo-50">
                Hubungi Kami
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={sectionFade}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
            className="grid w-full grid-cols-1 gap-6 sm:max-w-xl"
          >
            <Card className="overflow-hidden bg-slate-50">
              <div className="rounded-[2rem] bg-indigo-50 p-6">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-indigo-600">Highlight</p>
                <h2 className="mt-4 text-3xl font-bold text-slate-900">Eksplorasi buku premium untuk pembaca modern.</h2>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  Temukan rekomendasi terbaik, cerita inspiratif, dan sumber belajar berkualitas untuk semua usia.
                </p>
              </div>
            </Card>

            <Card>
              <div className="flex items-center gap-4">
                <div className="grid h-14 w-14 place-items-center rounded-3xl bg-indigo-50 text-indigo-600">
                  <FaBookOpen size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Koleksi Terpercaya</p>
                  <p className="mt-2 font-semibold text-slate-900">Pilihan buku kurasi dengan gaya premium dan modern.</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
      </section>

      <section id="about" className="px-6 py-20 md:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 flex flex-col gap-4 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-600">Tentang Kami</p>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Ruang bacaan yang menginspirasi, tumbuh bersama pengetahuan.</h2>
            <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Toko Buku Cendekia hadir untuk menghadirkan rasa nyaman, pilihan curated, dan pengalaman literasi modern. Dari fiksi hingga ilmu pengetahuan, kami mendukung kebiasaan membaca sebagai gaya hidup dan investasi diri.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            <Card>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Visi</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Menjadi ruang literasi pilihan untuk generasi yang ingin belajar, berkarya, dan menemukan inspirasi melalui buku berkualitas.
              </p>
            </Card>
            <Card>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Misi</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Menyediakan koleksi buku yang relevan, layanan hangat, dan suasana belanja yang tenang dengan sentuhan premium.
              </p>
            </Card>
            <Card>
              <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Cerita</p>
              <p className="mt-4 text-sm leading-7 text-slate-600">
                Toko Buku Cendekia lahir dari kecintaan pada bacaan, keinginan menyebarkan ilmu, dan semangat mendukung pembaca di setiap perjalanan mereka.
              </p>
            </Card>
          </div>
        </motion.div>
      </section>

      <section id="featured" className="px-6 py-20 md:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 flex flex-col gap-3 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-600">Buku Pilihan</p>
            <h2 className="text-3xl font-black text-slate-900 sm:text-4xl">Featured Books</h2>
            <p className="mx-auto max-w-3xl text-sm leading-7 text-slate-600 sm:text-base">
              Koleksi unggulan yang kami tampilkan untuk inspirasi, edukasi, dan hiburan. Ditampilkan langsung dari database koleksi kami.
            </p>
          </div>

          {loadingBooks ? (
            <div className="rounded-[2rem] border border-white/60 bg-white/90 p-12 text-center text-slate-500 shadow-[0_20px_80px_rgba(90,70,55,0.08)]">
              Memuat buku terbaik...
            </div>
          ) : books.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {books.map((book, index) => (
                <motion.div
                  key={book.id ?? `${book.title}-${index}`}
                  whileHover={{ y: -6 }}
                  className="group"
                >
                  <Card className="overflow-hidden">
                    <div className="relative overflow-hidden rounded-[1.75rem] bg-slate-100">
                      <img
                        src={book.cover}
                        alt={book.title}
                        className="h-64 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="mt-5">
                      <p className="text-xs uppercase tracking-[0.3em] text-indigo-600">{book.category}</p>
                      <h3 className="mt-3 text-lg font-black text-slate-900">{book.title}</h3>
                      <p className="mt-2 text-sm text-slate-600">{book.author}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/60 bg-white/90 p-12 text-center text-slate-500 shadow-[0_20px_80px_rgba(90,70,55,0.08)]">
              Belum ada buku yang tersedia saat ini.
            </div>
          )}

          <div className="mt-8 text-right text-sm text-slate-500">
            {bookSource ? `Sumber data: ${bookSource}` : "Sumber buku tidak ditemukan di Supabase."}
          </div>
        </motion.div>
      </section>

      <section id="categories" className="px-6 pb-20 md:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-600">Kategori</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Jelajahi Pilihan Kategori</h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {[
              "Novel",
              "Pendidikan",
              "Agama",
              "Self Improvement",
              "Anak-anak"
            ].map((category) => (
              <Card key={category} className="flex items-center justify-between p-8">
                <div>
                  <p className="text-lg font-bold text-slate-900">{category}</p>
                  <p className="mt-2 text-sm text-slate-600">Koleksi pilihan</p>
                </div>
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-indigo-50 text-indigo-600">+</span>
              </Card>
            ))}
          </div>
        </motion.div>
      </section>

      <section id="testimonials" className="px-6 py-20 md:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-600">Testimoni</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Suara Pembaca Kami</h2>
          </div>

          {loadingReviews ? (
            <div className="rounded-[2rem] border border-white/60 bg-white/90 p-12 text-center text-slate-500 shadow-[0_20px_80px_rgba(90,70,55,0.08)]">
              Memuat testimoni...
            </div>
          ) : reviews.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {reviews.map((review, index) => (
                <motion.div key={review.id ?? index} whileHover={{ y: -6 }}>
                  <Card>
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold text-slate-900">{review.name}</p>
                      <div className="inline-flex items-center gap-1 rounded-full bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-600">
                        <FaStar size={12} />
                        {review.rating}
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-slate-600">"{review.message}"</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/60 bg-white/90 p-12 text-center text-slate-500 shadow-[0_20px_80px_rgba(90,70,55,0.08)]">
              Belum ada testimoni yang tersedia saat ini.
            </div>
          )}

          <div className="mt-8 text-right text-sm text-slate-500">
            {reviewSource ? `Sumber data: ${reviewSource}` : "Sumber testimoni tidak ditemukan di Supabase."}
          </div>
        </motion.div>
      </section>

      <section id="store" className="px-6 pb-20 md:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.25em] text-indigo-600">Info Toko</p>
              <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Kunjungi Toko Buku Cendekia</h2>
              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">
                Nikmati pengalaman berbelanja buku dalam suasana modern dan nyaman, lengkap dengan koleksi terbaik dan layanan yang ramah.
              </p>
            </div>

            <Card className="space-y-6 bg-slate-50 p-8">
              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-3xl bg-indigo-50 p-4 text-indigo-600">
                  <FaMapMarkerAlt size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Alamat</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">Jalan Literasi No. 12, Jakarta Selatan, Indonesia</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="mt-1 rounded-3xl bg-indigo-50 p-4 text-indigo-600">
                  <FaClock size={20} />
                </div>
                <div>
                  <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Jam Buka</p>
                  <p className="mt-3 text-sm leading-7 text-slate-700">Senin - Sabtu: 09.00 - 20.00<br />Minggu: 10.00 - 18.00</p>
                </div>
              </div>
            </Card>
          </div>

          <div className="h-[420px] overflow-hidden rounded-[2rem] border border-white/70 shadow-[0_20px_80px_rgba(90,70,55,0.08)]">
            <iframe
              title="Google Maps Toko Buku Cendekia"
              src="https://maps.google.com/maps?q=Jakarta%20Selatan&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
            />
          </div>
        </motion.div>
      </section>

      <section id="contact" className="px-6 pb-24 md:px-10 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={sectionFade}
          className="mx-auto max-w-6xl"
        >
          <div className="mb-12 text-center">
            <p className="text-sm uppercase tracking-[0.25em] text-indigo-600">Hubungi Kami</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 sm:text-4xl">Siap membantu kebutuhan bacaanmu.</h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-[0.8fr_1fr]">
            <Card className="space-y-8 bg-slate-50 p-10">
              <div>
                <p className="text-sm uppercase tracking-[0.3em] text-indigo-600">Kontak</p>
                <h3 className="mt-4 text-2xl font-black text-slate-900">Percakapan cepat lewat WhatsApp</h3>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <p>
                  <span className="font-semibold">WhatsApp:</span> <a href="https://wa.me/6281234567890" className="text-indigo-600">+62 812-3456-7890</a>
                </p>
                <p>
                  <span className="font-semibold">Email:</span> <a href="mailto:halo@tokobukucendekia.id" className="text-indigo-600">halo@tokobukucendekia.id</a>
                </p>
                <p className="text-slate-500">Isi formulir untuk pertanyaan umum atau permintaan rekomendasi buku.</p>
              </div>

              <a
                href="https://wa.me/6281234567890"
                className="inline-flex w-full items-center justify-center gap-2 rounded-3xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
              >
                <FaWhatsapp /> WhatsApp Kami
              </a>
            </Card>

            <Card className="p-8">
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Nama</label>
                  <input
                    type="text"
                    value={contactState.name}
                    onChange={(event) => setContactState((prev) => ({ ...prev, name: event.target.value, success: false }))}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                    placeholder="Nama lengkap"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Email</label>
                  <input
                    type="email"
                    value={contactState.email}
                    onChange={(event) => setContactState((prev) => ({ ...prev, email: event.target.value, success: false }))}
                    className="w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                    placeholder="email@tokobuku.id"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-slate-700">Pesan</label>
                  <textarea
                    value={contactState.message}
                    onChange={(event) => setContactState((prev) => ({ ...prev, message: event.target.value, success: false }))}
                    className="h-40 w-full rounded-3xl border border-slate-200 bg-white px-5 py-4 text-sm text-slate-900 outline-none transition focus:border-indigo-600 focus:ring-2 focus:ring-indigo-600/20"
                    placeholder="Tulis pesan untuk kami..."
                  />
                </div>
                <button
                  type="submit"
                  className="inline-flex w-full items-center justify-center rounded-3xl bg-indigo-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-indigo-100 transition hover:bg-indigo-700"
                >
                  Kirim Pesan
                </button>
                {contactState.success && (
                  <p className="rounded-3xl bg-emerald-50 px-5 py-4 text-sm font-semibold text-emerald-700">
                    Terima kasih! Pesan Anda sudah kami terima.
                  </p>
                )}
              </form>
            </Card>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
