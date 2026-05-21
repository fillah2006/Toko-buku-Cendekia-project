export default function Table({
    headers,
    children
}) {
    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="border-b border-gray-50">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                    {children}
                </tbody>
            </table>
        </div>
    );
}
