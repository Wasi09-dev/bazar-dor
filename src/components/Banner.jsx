import Image from "next/image";
import Link from "next/link";

const Banner = () => {
  const today = new Date().toLocaleDateString("bn-BD", { dateStyle: "full" });

  return (
    <section className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex flex-col-reverse items-center justify-between gap-6 rounded-3xl border border-gray-200 bg-green-50/40 p-6 md:flex-row md:p-10">
        
        <div className="max-w-xl">
          <span className="inline-block rounded-full bg-green-100 px-4 py-1 text-xs font-medium text-green-800">
            {today}
          </span>

          <h2 className="mt-4 text-3xl font-bold leading-tight text-gray-900 md:text-4xl">
            আজকের বাজারের দাম এক নজরে
          </h2>

          <p className="mt-3 text-sm leading-relaxed text-gray-600">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          <Link
            href="#prices"
            className="mt-6 inline-block rounded-lg bg-green-700 px-6 py-2.5 text-sm font-medium text-white hover:bg-green-800"
          >
            সব পণ্য দেখুন
          </Link>
        </div>

        
        <Image
          src="/bazar-hero.png"
          alt="Banner"
          width={320}
          height={240}
          priority
          className="h-auto w-56 md:w-80"
        />
      </div>
    </section>
  );
};

export default Banner;