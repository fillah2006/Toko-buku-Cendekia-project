import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        /* Kita hapus bg-gray-100 dan card putih di sini 
           agar desain glassmorphism di Login.jsx bisa tampil full screen 
        */
        <div className="min-h-screen w-full">
            <Outlet />
            
            {/* Jika ingin tetap menampilkan Footer global di semua halaman Auth (Login/Register),
               kita letakkan secara absolute agar melayang di atas background biru 
            */}
            <div className="absolute bottom-6 w-full text-center z-20 pointer-events-none">
                <p className="text-sm text-white opacity-60">
                    © 2025 TokoBuku Cendakia. All rights reserved.
                </p>
            </div>
        </div>
    );
}