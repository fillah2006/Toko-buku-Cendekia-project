export default function Button({
    children,
    type = "primary",
    onClick,
    className = ""
}) {

    const types = {
        primary: "bg-indigo-600 hover:bg-indigo-700 text-white",
        secondary: "bg-gray-200 hover:bg-gray-300 text-gray-700",
        success: "bg-green-600 hover:bg-green-700 text-white",
        danger: "bg-red-600 hover:bg-red-700 text-white",
    };

    return (
        <button
            onClick={onClick}
            className={`${types[type]} px-5 py-2.5 rounded-2xl text-sm font-bold transition-all active:scale-95 ${className}`}
        >
            {children}
        </button>
    );
}