
import Link from "next/link";

const toBn = (n) => Number(n).toLocaleString("bn-BD");
const unitBn = { kg: "কেজি", litre: "লিটার", dozen: "ডজন", piece: "পিস" };
const money = (n) =>
  Number(n).toLocaleString("bn-BD", {
    minimumFractionDigits: Number.isInteger(n) ? 0 : 2,
  });

const trend = {
  up: { icon: "▲", word: "বেড়েছে", cls: "text-red-600" },
  down: { icon: "▼", word: "কমেছে", cls: "text-green-600" },
  same: { icon: "—", word: "অপরিবর্তিত", cls: "text-gray-500" },
};

const ProductDetail = async ({ params }) => {
    "use cache";
  const { id } = await params;
  const res = await fetch(
    `https://api.api-store.workers.dev/api/bazardor/products/${id}`
  );
  const product = await res.json();
  if (!res.ok || product.error) {
    return <p className="text-gray-500">পণ্যটি পাওয়া যায়নি।</p>;
  }
  const t = trend[product.change.dir] ?? trend.same;
  const diff = Math.abs(product.today - product.yesterday);
  const unit = unitBn[product.unit] ?? product.unit;
  const minPrice = Math.min(...product.markets.map((m) => m.min));
  const maxPrice = Math.max(...product.markets.map((m) => m.max));
return (
    <>
     <nav className="mb-4 text-xs text-gray-500">
        <Link href="/" className="hover:text-green-700">হোম</Link>
        {" > "}
        <Link href={`/category/${product.category}`} className="hover:text-green-700">
          {product.categoryNameBn}
        </Link>
        {" > "}
        <span className="text-gray-800">{product.nameBn}</span>
      </nav>
 <section className="flex flex-col gap-4 rounded-2xl border border-gray-200 bg-green-50/40 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-3xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{product.nameBn}</h1>
            <p className="text-xs text-gray-500">
              প্রতি {unit} · {product.categoryNameBn}
            </p>
            <p className="mt-1 text-xs text-gray-700">
              গতকালের তুলনায় আজ দাম{" "}
              <span className="font-bold">{t.word}</span> · {toBn(diff)} টাকা
            </p>
          </div>
        </div>

        <div className="rounded-xl bg-gray-100 px-6 py-3 text-center">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-3xl font-bold text-gray-900">{toBn(product.today)}</p>
          <p className="text-xs text-gray-500">টাকা / {unit}</p>
          <p className={`mt-1 text-xs font-semibold ${t.cls}`}>
            {t.icon} {toBn(product.change.pct)}%
          </p>
        </div>
      </section>
<section className="mt-6 rounded-2xl border border-gray-200 bg-white p-5">
        <h2 className="mb-3 text-sm font-bold text-gray-900">দামের সারসংক্ষেপ</h2>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-xl font-bold text-green-600">
              {toBn(minPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">সবচেয়ে কম দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">সর্বাধিক দাম</p>
            <p className="text-xl font-bold text-red-600">
              {toBn(maxPrice)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">সবচেয়ে বেশি দামের বাজার</p>
          </div>
          <div className="rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-xl font-bold text-green-600">
              {toBn(product.today)} <span className="text-sm">টাকা</span>
            </p>
            <p className="text-xs text-gray-500">প্রতি {unit}-এর হিসাবে</p>
          </div>
        </div>
 <h2 className="mb-3 mt-6 text-sm font-bold text-gray-900">
          বাজারভিত্তিক আজকের দাম
        </h2>
        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="text-xs text-gray-500">
              <tr>
                <th className="px-4 py-3 text-left font-normal">বাজার</th>
                <th className="px-4 py-3 text-left font-normal">বিভাগ</th>
                <th className="px-4 py-3 text-right font-normal">সর্বনিম্ন</th>
                <th className="px-4 py-3 text-right font-normal">সর্বাধিক</th>
                <th className="px-4 py-3 text-right font-normal">গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m) => (
                <tr key={m.market} className="border-t border-gray-200 even:bg-gray-50">
                  <td className="px-4 py-3 font-medium">{m.market}</td>
                  <td className="px-4 py-3 text-gray-600">{m.division}</td>
                  <td className="px-4 py-3 text-right">{money(m.min)} টাকা</td>
                  <td className="px-4 py-3 text-right">{money(m.max)} টাকা</td>
                  <td className="px-4 py-3 text-right font-bold">
                    {money((m.min + m.max) / 2)} টাকা
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};
export default ProductDetail;
    