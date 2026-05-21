import PageHeader from "../components/PageHeader";

import Button from "../components/Button";
import Badge from "../components/Badge";
import Avatar from "../components/Avatar";
import Card from "../components/Card";
import ProductCard from "../components/ProductCard";
import Table from "../components/Table";
import SearchInput from "../components/SearchInput";

export default function Components() {

    const headers = [
        "No",
        "Nama",
        "Role"
    ];

    return (
        <div className="space-y-8 bg-[#F8F9FD] min-h-screen p-2">

            {/* HEADER */}
            <PageHeader title="Component UI" />

            {/* BASIC COMPONENT */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">

                <h2 className="text-xl font-black text-slate-800 mb-6">
                    Basic Component
                </h2>

                <div className="space-y-8">

                    {/* BUTTON */}
                    <div>

                        <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                            Button
                        </p>

                        <div className="flex flex-wrap gap-4">

                            <Button type="primary">
                                Primary
                            </Button>

                            <Button type="success">
                                Success
                            </Button>

                            <Button type="danger">
                                Danger
                            </Button>

                            <Button type="warning">
                                Warning
                            </Button>

                            <Button type="secondary">
                                Secondary
                            </Button>

                        </div>

                    </div>

                    {/* BADGE */}
                    <div>

                        <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                            Badge
                        </p>

                        <div className="flex flex-wrap gap-4">

                            <Badge type="primary">
                                Primary
                            </Badge>

                            <Badge type="success">
                                Active
                            </Badge>

                            <Badge type="danger">
                                Delete
                            </Badge>

                            <Badge type="warning">
                                Pending
                            </Badge>

                        </div>

                    </div>

                    {/* AVATAR */}
                    <div>

                        <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                            Avatar
                        </p>

                        <div className="flex gap-4">

                            <Avatar name="Andi" />

                            <Avatar name="Budi" />

                            <Avatar name="Citra" />

                        </div>

                    </div>

                </div>

            </div>

            {/* FORM COMPONENT */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">

                <h2 className="text-xl font-black text-slate-800 mb-6">
                    Form Component
                </h2>

                <div className="max-w-md">

                    <SearchInput
                        placeholder="Cari component..."
                    />

                </div>

            </div>

            {/* DATA DISPLAY */}
            <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-gray-100">

                <h2 className="text-xl font-black text-slate-800 mb-6">
                    Data Display Component
                </h2>

                {/* CARD */}
                <div className="mb-10">

                    <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                        Card
                    </p>

                    <Card>

                        <h3 className="text-xl font-black text-slate-800 mb-2">
                            Card Component
                        </h3>

                        <p className="text-gray-500 text-sm">
                            Ini adalah contoh card component pada dashboard TokoBuku Cendakia.
                        </p>

                    </Card>

                </div>

                {/* PRODUCT CARD */}
                <div className="mb-10">

                    <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                        Product Card
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <ProductCard
                            image="https://images.unsplash.com/photo-1544947950-fa07a98d237f"
                            title="Atomic Habits"
                            category="Self Improvement"
                            price="Rp 120.000"
                            description="Buku pengembangan diri terlaris karya James Clear."
                        />

                        <ProductCard
                            image="https://images.unsplash.com/photo-1512820790803-83ca734da794"
                            title="Filosofi Teras"
                            category="Psikologi"
                            price="Rp 95.000"
                            description="Buku filsafat stoikisme modern yang populer di Indonesia."
                        />

                    </div>

                </div>

                {/* TABLE */}
                <div>

                    <p className="text-sm font-bold text-gray-400 mb-4 uppercase tracking-wider">
                        Table
                    </p>

                    <Table headers={headers}>

                        <tr>

                            <td className="border px-4 py-3">
                                1
                            </td>

                            <td className="border px-4 py-3">
                                Admin
                            </td>

                            <td className="border px-4 py-3">
                                Super Admin
                            </td>

                        </tr>

                        <tr>

                            <td className="border px-4 py-3">
                                2
                            </td>

                            <td className="border px-4 py-3">
                                Staff
                            </td>

                            <td className="border px-4 py-3">
                                Editor
                            </td>

                        </tr>

                    </Table>

                </div>

            </div>

        </div>
    );
}