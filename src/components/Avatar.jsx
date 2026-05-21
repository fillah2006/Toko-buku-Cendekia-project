export default function Avatar({ name }) {
    return (
        <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold text-xs border border-indigo-100">
            {name.charAt(0)}
        </div>
    );
}