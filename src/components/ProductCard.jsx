const unitBn = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
const toBn = (n) => Number(n).toLocaleString("bn-BD");

const ProductCard = ({ product }) => {
  const trend = {
  up: { icon: "▲", cls: "bg-red-50 text-red-600" },
  down: { icon: "▼", cls: "bg-green-50 text-green-600" },
  same: { icon: "—", cls: "bg-gray-100 text-gray-500" },
};
const t = trend[product.change.dir] ?? trend.same;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-4">
      
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-xl">
          {product.image}
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-900">
            {product.nameBn}
          </h3>
          <p className="text-xs text-gray-500">
            প্রতি {unitBn[product.unit] ?? product.unit}
          </p>
        </div>
      </div>

    
      <p className="mt-3 text-xs text-gray-500">আজকের দাম</p>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-gray-900">
          {toBn(product.today)}{" "}
          <span className="text-sm font-medium">টাকা</span>
        </p>
      <span className={`rounded-full px-2 py-0.5 text-xs font-semibold ${t.cls}`}>
  {t.icon} {toBn(product.change.pct)}%
</span>
      </div>
    </div>
  );
};

export default ProductCard;