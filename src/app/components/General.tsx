import { useState, useEffect, useMemo } from "react";
import useFetchData from "../../../utils/hooks/useFetchData";

interface GeneralData {
  nama_forum: string;
  logo: string;
  link_universitas: string;
  universitas: string;
  konten_forum: string;
  konten_tentang: string;
  email: string;
  wa: string;
  link_aplikasi: string;
}

const GeneralForm = ({ onSave }: { onSave: (data: GeneralData) => void }) => {
  const {
    data: generalData,
    error,
    loading,
  } = useFetchData<GeneralData>("general");

  const [formData, setFormData] = useState<GeneralData>({
    logo: "",
    universitas: "",
    link_universitas: "",
    link_aplikasi: "",
    nama_forum: "",
    konten_forum: "",
    konten_tentang: "",
    email: "",
    wa: "",
  });

  const [initialData, setInitialData] = useState<GeneralData | null>(null);

  useEffect(() => {
    if (generalData) {
      setFormData(generalData);
      setInitialData(generalData);
    }
  }, [generalData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isFormValid = useMemo(() => {
    const isNamaForumValid = formData.nama_forum.length >= 3;

    const isLogoValid = /^https:\/\/.+\.(jpg|png|jpeg|svg)$/.test(
      formData.logo
    );

    const isUniversitasValid = formData.universitas.length >= 3;

    const isLinkUniversitasValid = /^https:\/\/.+\..+$/.test(
      formData.link_universitas
    );

    const isLinkAplikasiValid = /^https:\/\/.+\..+$/.test(
      formData.link_aplikasi
    );

    const isKontenForumValid = formData.konten_forum.length >= 5;

    const isKontenTentangValid = formData.konten_tentang.length >= 5;

    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(
      formData.email
    );

    const isWAValid = /^\+?(\d{10,15})$/.test(formData.wa);

    return (
      isNamaForumValid &&
      isLogoValid &&
      isUniversitasValid &&
      isLinkUniversitasValid &&
      isLinkAplikasiValid &&
      isKontenForumValid &&
      isKontenTentangValid &&
      isEmailValid &&
      isWAValid
    );
  }, [formData]);

  const isFormChanged = useMemo(() => {
    if (!initialData) return false;

    return Object.keys(formData).some((key) => {
      const formValue = formData[key as keyof GeneralData];
      const initialValue = initialData[key as keyof GeneralData];
      return String(formValue) !== String(initialValue);
    });
  }, [formData, initialData]);

  const isSaveDisabled = (isFormValid && isFormChanged);

  const handleSave = () => {
    onSave(formData);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center my-40">
        <div className="border-t-4 border-blue-500 border-solid w-8 h-8 rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center text-red-500">
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

  return (
    <div className="max-h-screen">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Update General Data
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Nama Forum
          </label>
          <input
            type="text"
            name="nama_forum"
            value={formData.nama_forum}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formData.nama_forum.length < 3 && (
            <p className="text-sm text-red-600 mt-1">
              Nama Forum harus lebih dari 3 karakter.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">Logo</label>
          <input
            type="text"
            name="logo"
            value={formData.logo}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {!/^https:\/\/.+\.(jpg|png|jpeg|svg)$/.test(formData.logo) && (
            <p className="text-sm text-red-600 mt-1">
              URL logo harus berupa format gambar (jpg, png, jpeg, svg).
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Universitas
          </label>
          <input
            type="text"
            name="universitas"
            value={formData.universitas}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {formData.universitas.length < 3 && (
            <p className="text-sm text-red-600 mt-1">
              Nama Universitas harus lebih dari 3 karakter.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Link Universitas
          </label>
          <input
            type="text"
            name="link_universitas"
            value={formData.link_universitas}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {!/^https:\/\/.+\..+$/.test(formData.link_universitas) && (
            <p className="text-sm text-red-600 mt-1">
              URL Universitas harus dimulai dengan https://
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Link Aplikasi
          </label>
          <input
            type="text"
            name="link_aplikasi"
            value={formData.link_aplikasi}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {!/^https:\/\/.+\..+$/.test(formData.link_aplikasi) && (
            <p className="text-sm text-red-600 mt-1">
              URL Aplikasi harus dimulai dengan https://
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Konten Forum
          </label>
          <textarea
            name="konten_forum"
            value={formData.konten_forum}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={3}
          />
          {formData.konten_forum.length < 5 && (
            <p className="text-sm text-red-600 mt-1">
              Konten Forum harus lebih dari 5 karakter.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Konten Tentang
          </label>
          <textarea
            name="konten_tentang"
            value={formData.konten_tentang}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            rows={3}
          />
          {formData.konten_tentang.length < 5 && (
            <p className="text-sm text-red-600 mt-1">
              Konten Tentang harus lebih dari 5 karakter.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email) && (
            <p className="text-sm text-red-600 mt-1">
              Masukkan alamat email yang valid.
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label className="text-sm font-medium text-gray-700 mb-1">WA</label>
          <input
            type="text"
            name="wa"
            value={formData.wa}
            onChange={handleChange}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          {!/^\+?(\d{10,15})$/.test(formData.wa) && (
            <p className="text-sm text-red-600 mt-1">
              Nomor WA harus valid (10-15 digit).
            </p>
          )}
        </div>
      </div>

      <div className="absolute bottom-6 right-6">
        <button
          onClick={handleSave}
          className={`${
            isSaveDisabled ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
          } text-white px-6 py-2 text-sm rounded-md shadow transition duration-200`}
          disabled={!isSaveDisabled}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default GeneralForm;
