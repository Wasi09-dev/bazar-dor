import Banner from "@/components/Banner";
import Marquee from "@/components/Marquee";
import ProductCard from "@/components/ProductCard";


export default async function Home() {
  const res = await fetch("https://api.api-store.workers.dev/api/bazardor/products")
  const products = await res.json()
  const increased = products.filter((p) => p.change.dir === "up")
  .slice(0,6);
const decreased = products.filter((p) => p.change.dir === "down")
  .slice(0,6);
  return (
    <div>
      
      <Marquee />
      <Banner />
      <main id="prices" className="max-w-6xl mx-auto px-4 pb-10">
  <section>
    <h2 className="mb-4 text-lg font-bold text-red-600">▲ আজ দাম বেড়েছে</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {increased.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>

  <section className="mt-8">
    <h2 className="mb-4 text-lg font-bold text-green-600">▼ আজ দাম কমেছে</h2>
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {decreased.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  </section>
  <section className="mt-10">
  <h2 className="text-xl font-bold text-gray-900">সব পণ্য</h2>
  <p className="mb-4 mt-1 text-sm text-gray-500">
    মোট {Number(products.length).toLocaleString("bn-BD")}টি পণ্য দেখানো হচ্ছে
  </p>
  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
    {products.map((p) => (
      <ProductCard key={p.id} product={p} />
    ))}
  </div>
</section>
</main>
    </div>
  );
}
