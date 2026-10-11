"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiLogOut } from "react-icons/fi";
import { authClient } from "@/lib/auth-client";

const ProfilePage = () => {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const user = session?.user;

  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
 useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });
    setSaving(true);

    const { error } = await authClient.updateUser({ name });

    if (error) {
      setMessage({ type: "error", text: error.message || "আপডেট করা যায়নি" });
    } else {
      setMessage({ type: "success", text: "নাম সফলভাবে আপডেট হয়েছে" });
    }
    setSaving(false);
  };

  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  if (isPending) {
    return <p className="text-center py-20 text-gray-500">লোড হচ্ছে...</p>;
  }

  if (!user) {
    return (
      <p className="text-center py-20 text-gray-500">
        প্রোফাইল দেখতে আগে সাইন ইন করুন।
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900">আমার প্রোফাইল</h1>
      <p className="text-sm text-gray-500 mt-1">
        আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
      </p>
       <div className="mt-6 flex items-center justify-between gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-4">
          {user.image ? (
            <img
              src={user.image}
              alt={user.name}
              referrerPolicy="no-referrer"
              className="h-14 w-14 rounded-xl object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-xl font-bold text-green-700">
              {user.name?.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <p className="font-semibold text-gray-900">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>

        <button
          onClick={handleSignOut}
          className="flex items-center gap-2 rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
        >
          <FiLogOut /> সাইন আউট
        </button>
      </div>
      <div className="mt-5 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
        <h2 className="font-semibold text-gray-900 mb-4">তথ্য</h2>

        <form onSubmit={handleUpdate} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1">
              নাম
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-green-600 focus:ring-2 focus:ring-green-100"
            />
          </div>

          {message.text && (
            <p
              className={`text-sm ${
                message.type === "error" ? "text-red-600" : "text-green-700"
              }`}
            >
              {message.text}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-green-700 py-3 text-sm font-semibold text-white shadow-md hover:bg-green-800 disabled:opacity-60 transition"
          >
            {saving ? "আপডেট হচ্ছে..." : "আপডেট"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;