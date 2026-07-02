import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import LogoBook from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

export default function Register() {
    const navigate = useNavigate();
    const { user, signUp } = useAuth();
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [error, setError] = useState("");

    useEffect(() => {
        if (user) {
            navigate("/", { replace: true });
        }
    }, [navigate, user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const getFriendlyAuthError = (err) => {
        const message = err?.message?.toLowerCase?.() || "";

        if (message.includes("email not confirmed") || message.includes("confirm your email")) {
            return "Pendaftaran berhasil, tetapi email Anda perlu diverifikasi sebelum bisa login.";
        }

        return err?.message || "Registrasi gagal, silakan coba lagi.";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            setError("Password dan konfirmasi password tidak sama.");
            return;
        }

        setError("");

        try {
            await signUp({
                email: form.email,
                password: form.password,
                nama: form.name,
                role: "admin"
            });
            navigate("/login", { replace: true });
        } catch (err) {
            setError(getFriendlyAuthError(err));
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden bg-[#0061FF] font-sans">
            <div className="absolute left-[-5%] top-[-10%] h-[500px] w-[500px] rounded-full bg-blue-400 opacity-50 blur-[100px] mix-blend-multiply" />
            <div className="absolute bottom-[-10%] right-[-5%] h-[400px] w-[400px] rounded-full bg-cyan-300 opacity-50 blur-[100px] mix-blend-multiply" />

            <div className="relative z-10 mx-4 flex min-h-screen items-center justify-center p-6">
                <div className="w-full max-w-[460px] rounded-[50px] border border-white/30 bg-white/20 p-8 text-center shadow-2xl backdrop-blur-2xl sm:p-10">
                    <div className="mb-6">
                        <img src={LogoBook} alt="Logo" className="mx-auto mb-2 h-20 drop-shadow-lg" />
                        <p className="text-lg font-medium tracking-wide text-white">Your logo</p>
                    </div>

                    <h2 className="mb-8 px-2 text-left text-3xl font-bold text-white">Register</h2>

                    {error && (
                        <div className="mb-4 flex items-center rounded-2xl bg-red-500/80 p-3 text-xs text-white">
                            <BsFillExclamationDiamondFill className="me-2 text-base" />
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="px-2 text-left">
                            <label className="mb-1.5 ml-1 block text-xs text-white opacity-90">Nama Lengkap</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                placeholder="Nama Anda"
                                className="w-full rounded-2xl bg-white px-6 py-3.5 text-gray-700 shadow-lg placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="px-2 text-left">
                            <label className="mb-1.5 ml-1 block text-xs text-white opacity-90">Email</label>
                            <input
                                type="email"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                placeholder="username@gmail.com"
                                className="w-full rounded-2xl bg-white px-6 py-3.5 text-gray-700 shadow-lg placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="px-2 text-left">
                            <label className="mb-1.5 ml-1 block text-xs text-white opacity-90">Password</label>
                            <input
                                type="password"
                                name="password"
                                value={form.password}
                                onChange={handleChange}
                                placeholder="********"
                                className="w-full rounded-2xl bg-white px-6 py-3.5 text-gray-700 shadow-lg placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="px-2 text-left">
                            <label className="mb-1.5 ml-1 block text-xs text-white opacity-90">Konfirmasi Password</label>
                            <input
                                type="password"
                                name="confirmPassword"
                                value={form.confirmPassword}
                                onChange={handleChange}
                                placeholder="********"
                                className="w-full rounded-2xl bg-white px-6 py-3.5 text-gray-700 shadow-lg placeholder-gray-400 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
                                required
                            />
                        </div>

                        <div className="px-2 pt-2">
                            <button
                                type="submit"
                                className="w-full rounded-2xl bg-[#002D5B] px-6 py-4 font-bold text-white shadow-xl transition-all duration-300 hover:bg-[#001f3f] active:scale-95"
                            >
                                Register
                            </button>
                        </div>
                    </form>

                    <p className="mt-8 text-xs text-white opacity-80">
                        Sudah punya akun? <Link to="/login" className="ml-1 font-bold hover:underline">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}