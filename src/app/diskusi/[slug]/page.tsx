"use client";

import { useParams, useRouter } from "next/navigation";
import { kampusData } from "../../../../data/kampusData";

export default function DetailDiskusi() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug;

  const diskusi = kampusData.diskusi.find(
    (item) => item.link.split("/").pop() === slug
  );

  if (!diskusi) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Diskusi Tidak Ditemukan
        </h1>
        <p className="text-gray-600 mb-6">
          Silakan kembali ke halaman diskusi.
        </p>
        <button
          onClick={() => router.push("/diskusi")}
          className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
        >
          Kembali ke Diskusi
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10">
      <button
        onClick={() => router.push("/diskusi")}
        className="mb-6 px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Kembali ke Diskusi
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        {diskusi.title}
      </h1>
      <p className="text-lg text-gray-600 text-center max-w-2xl">
        {diskusi.description}
      </p>
    </div>
  );
}
