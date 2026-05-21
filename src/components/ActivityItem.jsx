export default function ActivityItem({
    icon,
    text,
    time,
    color
}) {
    return (
        <div className="flex items-start gap-4">

            <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-lg`}>

                {icon}

            </div>

            <div className="flex-1 border-b border-gray-50 pb-4">

                <p className="text-xs font-bold text-slate-700 leading-tight">
                    {text}
                </p>

                <p className="text-[10px] text-gray-400 font-medium mt-1">
                    {time}
                </p>

            </div>

        </div>
    );
}