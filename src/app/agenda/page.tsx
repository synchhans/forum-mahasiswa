"use client";

import { useRouter } from "next/navigation";
import { kampusData } from "../../../data/kampusData";

export default function AgendaAcara() {
  const router = useRouter();

return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Agenda Acara Mendatang
      </h1>
      <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl">
        Berikut adalah daftar acara penting yang akan datang untuk mahasiswa.
        Jangan sampai terlewatkan!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-5xl">
        {kampusData.agenda.map((acara, index) => (
          <div
            key={index}
            className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow"
          >
            <img
              src={acara.image}
              alt={acara.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">
                {acara.title}
              </h3>
              <p className="text-sm text-gray-600 mb-2">{acara.date}</p>
              <p className="text-sm text-gray-600">{acara.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={() => router.push("/")}
        className="mt-10 px-6 py-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
      >
        Kembali ke Home
      </button>
    </div>
  );
}
