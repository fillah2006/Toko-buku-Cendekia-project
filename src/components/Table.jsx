export default function Table({
    headers,
    children
}) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-[760px] w-full border-collapse text-left">
                <thead>
                    <tr className="border-b border-slate-200 bg-slate-50/70">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-4 text-[11px] font-black uppercase tracking-[0.25em] text-slate-400"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-slate-100">
                    {children}
                </tbody>
            </table>
        </div>
    );
}
