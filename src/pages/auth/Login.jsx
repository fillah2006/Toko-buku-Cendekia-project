import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import {
  FaGoogle,
  FaGithub,
  FaFacebook,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import LogoBook from "../../assets/logo.png";
import { useAuth } from "../../context/AuthContext";

export default function Login() {
  const navigate = useNavigate();
  const { user, signIn } = useAuth();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/dashboard", { replace: true });
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDataForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const getFriendlyAuthError = (err) => {
    const message = err?.message?.toLowerCase?.() || "";

    if (
      message.includes("email not confirmed") ||
      message.includes("confirm your email")
    ) {
      return "Email belum diverifikasi.";
    }

    if (message.includes("invalid login credentials")) {
      return "Email atau password salah.";
    }

    if (message.includes("network")) {
      return "Koneksi internet bermasalah.";
    }

    return err?.message || "Login gagal.";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setError("");

    if (!dataForm.email.trim()) {
      setError("Email wajib diisi.");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(dataForm.email)) {
      setError("Format email tidak valid.");
      return;
    }

    if (!dataForm.password.trim()) {
      setError("Password wajib diisi.");
      return;
    }

    setLoading(true);

    try {
      console.log("LOGIN:", dataForm.email);

      await signIn(
        dataForm.email.trim(),
        dataForm.password
      );

      navigate("/dashboard", { replace: true });

    } catch (err) {
      console.error("LOGIN ERROR:", err);

      setError(
        getFriendlyAuthError(err)
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0061FF] overflow-hidden font-sans">

      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply blur-[100px] opacity-50 animate-pulse" />

      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-cyan-300 rounded-full mix-blend-multiply blur-[100px] opacity-50" />

      <div className="relative z-10 w-full max-w-[420px] p-10 mx-4 bg-white/20 backdrop-blur-2xl rounded-[50px] border border-white/30 shadow-2xl text-center">

        <div className="mb-6">
          <img
            src={LogoBook}
            alt="Logo"
            className="h-20 mx-auto drop-shadow-lg mb-2"
          />

          <p className="text-white font-medium text-lg tracking-wide">
            Toko Buku Cendakia
          </p>
        </div>

        <h2 className="text-white text-3xl font-bold mb-8 text-left px-2">
          Login
        </h2>

        {error && (
          <div className="bg-red-500/90 text-white mb-4 p-3 text-sm rounded-2xl flex items-center">
            <BsFillExclamationDiamondFill className="mr-2 text-base shrink-0" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <div className="text-left px-2">
            <label className="text-white text-xs mb-1.5 block ml-1 opacity-90">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              autoComplete="email"
              placeholder="username@gmail.com"
              className="w-full px-6 py-3.5 rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg"
              required
            />
          </div>

          <div className="text-left px-2">
            <label className="text-white text-xs mb-1.5 block ml-1 opacity-90">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={dataForm.password}
                onChange={handleChange}
                autoComplete="current-password"
                placeholder="********"
                className="w-full px-6 py-3.5 pr-14 rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg"
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
              >
                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>
            </div>

            <Link
              to="/forgot"
              className="inline-block text-white text-[11px] mt-2 ml-1 hover:underline opacity-80"
            >
              Forgot Password?
            </Link>
          </div>

          <div className="px-2 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#002D5B] text-white font-bold rounded-2xl hover:bg-[#001f3f] transition-all duration-300 shadow-xl active:scale-95 flex justify-center items-center disabled:opacity-60"
            >
              {loading ? (
                <ImSpinner2 className="animate-spin text-xl" />
              ) : (
                "Sign In"
              )}
            </button>
          </div>
        </form>

        <div className="my-8 flex items-center justify-center">
          <div className="h-[0.5px] flex-1 bg-white/30" />

          <span className="px-4 text-white text-[10px] opacity-70 uppercase tracking-widest">
            or continue with
          </span>

          <div className="h-[0.5px] flex-1 bg-white/30" />
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button
            type="button"
            className="p-3.5 bg-white rounded-2xl hover:scale-110 transition shadow-md"
          >
            <FaGoogle className="text-red-500 text-lg" />
          </button>

          <button
            type="button"
            className="p-3.5 bg-white rounded-2xl hover:scale-110 transition shadow-md"
          >
            <FaGithub className="text-black text-lg" />
          </button>

          <button
            type="button"
            className="p-3.5 bg-white rounded-2xl hover:scale-110 transition shadow-md"
          >
            <FaFacebook className="text-blue-600 text-lg" />
          </button>
        </div>

        <p className="text-white text-xs opacity-80">
          Don't have an account yet?
          <Link
            to="/register"
            className="ml-1 font-bold hover:underline"
          >
            Register for free
          </Link>
        </p>
      </div>
    </div>
  );
}