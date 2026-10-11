"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100";

const SignUp = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const formData = new FormData(e.target);
    const user = Object.fromEntries(formData.entries());

    const { data, error } = await authClient.signUp.email({
      ...user,
    });

    console.log("SignUp data:", data);

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    setLoading(false);
   const params = new URLSearchParams(window.location.search);
router.push(params.get("callbackURL") || "/");
router.refresh();
  };

  const handleSocial = async (provider) => {
    await authClient.signIn.social({ provider, callbackURL: new URLSearchParams(window.location.search).get("callbackURL") || "/", });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">সাইন আপ</h1>
        <p className="text-sm text-gray-500 mt-1">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্ট খুলুন।
        </p>
      </div>

      <div className="w-full max-w-md bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              নাম
            </label>
            <input
              name="name"
              type="text"
              placeholder="আপনার নাম"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              ইমেইল
            </label>
            <input
              name="email"
              type="email"
              placeholder="you@example.com"
              required
              className={inputClass}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-800 mb-1">
              পাসওয়ার্ড
            </label>
            <input
              name="password"
              type="password"
              placeholder="কমপক্ষে ৮ অক্ষর"
              minLength={8}
              required
              className={inputClass}
            />
          </div>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-green-700 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60 transition"
          >
            {loading ? "অপেক্ষা করুন..." : "সাইন আপ"}
          </button>
        </form>
 <div className="flex items-center gap-3 my-5">
          <div className="h-px flex-1 bg-gray-200" />
          <span className="text-xs text-gray-500">অথবা</span>
          <div className="h-px flex-1 bg-gray-200" />
        </div>
         <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocial("google")}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
          >
            <FcGoogle size={18} /> Google দিয়ে চালিয়ে যান
          </button>
          <button
            type="button"
            onClick={() => handleSocial("github")}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-200 py-2.5 text-sm font-medium text-gray-800 hover:bg-gray-50 transition"
          >
            <FaGithub size={18} /> GitHub দিয়ে চালিয়ে যান
          </button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-5">
          আগেই অ্যাকাউন্ট আছে?{" "}
          <Link
            href="/signin"
            className="font-semibold text-green-700 hover:underline"
          >
            সাইন ইন করুন
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;