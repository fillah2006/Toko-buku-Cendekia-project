export default function Badge({
    children,
    type = "primary"
}) {

    const types = {
        primary: "bg-indigo-50 text-indigo-600",
        secondary: "bg-gray-100 text-gray-500",
        success: "bg-green-50 text-green-600",
        danger: "bg-red-50 text-red-600",
    };

    return (
        <span
            className={`${types[type]} px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight`}
        >
            {children}
        </span>
    );
}