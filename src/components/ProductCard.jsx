import Card from "./Card";
import Button from "./Button";
import Badge from "./Badge";

export default function ProductCard({
    id,
    image,
    title,
    category,
    price,
    description,
    stock,
    author
}) {

    return (

        <Card className="overflow-hidden p-0 hover:shadow-xl hover:shadow-indigo-100/40 transition-all duration-300 group">

            {/* IMAGE */}
            <div className="relative overflow-hidden">

                <img
                    src={image}
                    alt={title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />

                <div className="absolute top-4 left-4">

                    <Badge type="primary">

                        {category}

                    </Badge>

                </div>

            </div>

            {/* CONTENT */}
            <div className="p-5 space-y-4">

                <div>

                    <h2 className="text-lg font-black text-slate-800 line-clamp-1">

                        {title}

                    </h2>

                    <p className="text-sm text-gray-400 mt-1">

                        {author}

                    </p>

                </div>

                <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">

                    {description}

                </p>

                {/* STOCK */}
                <div className="flex items-center justify-between">

                    <div className="flex items-center gap-2">

                        <div
                            className={`w-2 h-2 rounded-full
                            
                            ${
                                stock > 10
                                    ? "bg-green-500"
                                    : stock > 0
                                    ? "bg-orange-500"
                                    : "bg-red-500"
                            }`}
                        />

                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">

                            {stock > 0
                                ? `${stock} Stock`
                                : "Habis"}

                        </span>

                    </div>

                    <h3 className="text-xl font-black text-indigo-600">

                        {price}

                    </h3>

                </div>

                {/* BUTTON */}
                <Button
                    type="primary"
                    className="w-full"
                >

                    Detail Buku

                </Button>

            </div>

        </Card>
    );
}