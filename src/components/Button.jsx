export default function Button({
    children,
    type = "primary",
    onClick,
    className = ""
}) {

    const types = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-100",
        secondary: "bg-slate-100 hover:bg-slate-200 text-slate-700",
        success: "bg-emerald-600 hover:bg-emerald-700 text-white shadow-lg shadow-emerald-100",
        danger: "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-100",
    };

    return (
        <button
            onClick={onClick}
            className={`${types[type]} rounded-2xl px-5 py-2.5 text-sm font-bold transition-all duration-200 active:scale-95 ${className}`}
        >
            {children}
        </button>
    );
}