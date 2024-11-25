"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import useFetchData from "../../../../utils/hooks/useFetchData";

export default function DetailPengumuman() {
  const params = useParams();
  const slug = params?.slug;

  const { dataLain, error, loading } = useFetchData("pengumuman");
  const [isImageFull, setIsImageFull] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="border-t-4 border-blue-500 border-solid w-16 h-16 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        <div className="text-center space-y-4">
          <p className="text-xl font-semibold">Oops, something went wrong!</p>
          <p>Error: {error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const pengumuman = dataLain?.find(
    (item) => item.link.split("/").pop() === slug
  );

  if (!pengumuman) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Pengumuman Tidak Ditemukan
        </h1>
        <p className="text-gray-600">Silakan kembali ke halaman pengumuman.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center py-12 px-4">
      <div className="relative w-full max-w-4xl">
        <div className="overflow-hidden rounded-lg shadow-lg">
          <img
            src={pengumuman.image}
            alt={pengumuman.title}
            className="w-full h-auto max-h-96 object-cover"
          />
        </div>
      </div>

      <button
        onClick={() => setIsImageFull(true)}
        className="mt-4 px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400"
      >
        Lihat Gambar Sepenuhnya
      </button>

      <div className="px-6 mt-8 text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          {pengumuman.title}
        </h1>
        <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          {pengumuman.description}
        </p>
      </div>

      {/* Full Image Modal */}
      {isImageFull && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 transition-opacity duration-300">
          <div className="relative">
            <img
              src={pengumuman.image}
              alt={pengumuman.title}
              className="max-w-full max-h-screen rounded-lg shadow-lg"
            />
            <button
              onClick={() => setIsImageFull(false)}
              className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-70 px-4 py-2 rounded-lg shadow hover:bg-opacity-90"
            >
              Close
            </button>
            <a
              href={pengumuman.image}
              target="_blank"
              download
              className="absolute top-4 right-24 text-white bg-opacity-70 bg-blue-600 px-4 py-2 rounded-lg shadow hover:bg-opacity-90 focus:outline-none"
            >
              Simpan
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
