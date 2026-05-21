export default function SectionCard({
    children,
    className = ""
}) {
    return (
        <div
            className={`bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100/50 ${className}`}
        >
            {children}
        </div>
    );
}