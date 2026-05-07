import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { FaGoogle, FaGithub, FaFacebook } from "react-icons/fa";
import LogoBook from "../../assets/logo.png";

export default function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dataForm, setDataForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setDataForm({ ...dataForm, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    axios
      .post("https://dummyjson.com/user/login", {
        username: dataForm.email,
        password: dataForm.password,
      })
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        setError(err.response?.data?.message || "Login gagal, silakan coba lagi.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center bg-[#0061FF] overflow-hidden font-sans">
      
      {/* Dekorasi Background (Bentuk Blur) */}
      <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-5%] w-[400px] h-[400px] bg-cyan-300 rounded-full mix-blend-multiply filter blur-[100px] opacity-50"></div>

      {/* Glassmorphism Card */}
      <div className="relative z-10 w-full max-w-[420px] p-10 mx-4 bg-white/20 backdrop-blur-2xl rounded-[50px] border border-white/30 shadow-2xl text-center">
        
        {/* Logo */}
        <div className="mb-6">
          <img src={LogoBook} alt="Logo" className="h-20 mx-auto drop-shadow-lg mb-2" />
          <p className="text-white font-medium text-lg tracking-wide">Your logo</p>
        </div>

        <h2 className="text-white text-3xl font-bold mb-8 text-left px-2">Login</h2>

        {/* Pesan Error */}
        {error && (
          <div className="bg-red-500/80 text-white mb-4 p-3 text-xs rounded-2xl flex items-center animate-shake">
            <BsFillExclamationDiamondFill className="me-2 text-base" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username Input */}
          <div className="text-left px-2">
            <label className="text-white text-xs mb-1.5 block ml-1 opacity-90">Email</label>
            <input 
              type="text" 
              name="email"
              value={dataForm.email}
              onChange={handleChange}
              placeholder="username@gmail.com"
              className="w-full px-6 py-3.5 rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg"
              required
            />
          </div>

          {/* Password Input */}
          <div className="text-left px-2">
            <label className="text-white text-xs mb-1.5 block ml-1 opacity-90">Password</label>
            <input 
              type="password" 
              name="password"
              value={dataForm.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full px-6 py-3.5 rounded-2xl bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition shadow-lg"
              required
            />
            <button type="button" className="text-white text-[10px] mt-2 ml-1 hover:underline opacity-80 transition">
              Forgot Password?
            </button>
          </div>

          {/* Button Submit */}
          <div className="px-2 pt-2">
            <button 
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#002D5B] text-white font-bold rounded-2xl hover:bg-[#001f3f] transition-all duration-300 shadow-xl active:scale-95 flex justify-center items-center disabled:opacity-70"
            >
              {loading ? <ImSpinner2 className="animate-spin text-xl" /> : "Sign in"}
            </button>
          </div>
        </form>

        {/* Divider */}
        <div className="my-8 flex items-center justify-center">
          <div className="h-[0.5px] flex-1 bg-white/30"></div>
          <span className="px-4 text-white text-[10px] opacity-70 uppercase tracking-widest">or continue with</span>
          <div className="h-[0.5px] flex-1 bg-white/30"></div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center gap-4 mb-8">
          <button className="p-3.5 bg-white rounded-2xl hover:scale-110 transition shadow-md"><FaGoogle className="text-red-500 text-lg" /></button>
          <button className="p-3.5 bg-white rounded-2xl hover:scale-110 transition shadow-md"><FaGithub className="text-black text-lg" /></button>
          <button className="p-3.5 bg-white rounded-2xl hover:scale-110 transition shadow-md"><FaFacebook className="text-blue-600 text-lg" /></button>
        </div>

        {/* Footer */}
        <p className="text-white text-xs opacity-80">
          Don't have an account yet? <button className="font-bold hover:underline ml-1">Register for free</button>
        </p>
      </div>
    </div>
  );
}