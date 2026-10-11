import React from 'react';

import Link from "next/link";

const Notfound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 px-4 text-center">
      <h1 className="text-8xl font-extrabold text-green-600 md:text-9xl">404</h1>
      <h2 className="mt-4 text-2xl font-semibold text-green-900">
        পেজটি খুঁজে পাওয়া যায়নি
      </h2>
      <p className="mt-2 max-w-md text-green-700">
        আপনি যে পেজটি খুঁজছেন সেটি হয়তো সরানো হয়েছে, অথবা লিংকটি ভুল।
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-green-600 px-8 py-3 font-medium text-white shadow-lg transition hover:bg-green-700 hover:shadow-xl"
      >
        হোমে ফিরে যান
      </Link>
    </div>
  );
};

export default Notfound;