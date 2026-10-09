import ProductCard from '@/components/ProductCard';
import React, { Suspense } from 'react';

const CategoryProducts = async ({ params }) => {
  const { id } = await params;
  const res = await fetch(`https://api.api-store.workers.dev/api/bazardor/products?category=${id}`);
  const data = await res.json();
  const products = Array.isArray(data) ? data : data.products || [];

  if (!products.length) {
    return <p className="text-gray-500">No products found.</p>;
  }

  const { categoryIcon, categoryNameBn } = products[0];
  const count = products.length.toLocaleString('bn-BD');

  return (
    <>
      <h1 className="text-2xl font-bold text-gray-900">
        {categoryIcon} {categoryNameBn}
      </h1>
      <p className="mb-4 mt-1 text-sm text-gray-500">
        মোট {count}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </>
  );
};

const Category = ({ params }) => {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Suspense fallback={<p className="text-gray-500">Loading...</p>}>
        <CategoryProducts params={params} />
      </Suspense>
    </main>
  );
};

export default Category;