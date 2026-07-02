export default function SectionCard({
    children,
    className = ""
}) {
    return (
        <div
            className={`rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8 ${className}`}
        >
            {children}
        </div>
    );
}