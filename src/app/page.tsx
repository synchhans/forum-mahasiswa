"use client";
import { FaBars } from "react-icons/fa";
import NavLink from "./components/NavLink";
import Card from "./components/Card";
import useNavigation from "./hooks/useNavigation";
import useFetchData from "../../utils/hooks/useFetchData";

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

const Home: React.FC = () => {
  const {
    isMobileMenuOpen,
    activeSection,
    toggleMenu,
    changeSection,
    scrollToSection,
  } = useNavigation();

  const {
    data: generalData,
    error,
    loading,
  } = useFetchData<GeneralData>("general");

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

  const link_forum =
    generalData?.nama_forum
      ?.toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9\-]/g, "") || "";

  const short_forum =
    generalData!.nama_forum.split(" ").length > 3
      ? generalData?.nama_forum.split(" ").slice(0, 3).join(" ") + ".."
      : generalData?.nama_forum;

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src={generalData?.logo}
                alt="Logo Kampus"
                width={100}
                height={50}
                loading="lazy"
              />
              <div className="text-2xl font-semibold text-gray-900 truncate max-w-[200px]">
                <a
                  href={generalData?.link_universitas}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition-colors"
                >
                  {generalData?.universitas}
                </a>
              </div>
            </div>

            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-gray-900 p-2 rounded-md hover:bg-gray-200 focus:outline-none transition"
                aria-label="Toggle mobile menu"
              >
                <FaBars className="w-6 h-6" />
              </button>
            </div>
            <nav className="space-x-6 hidden sm:flex">
              <NavLink
                href={`#${link_forum}`}
                onClick={() => {
                  changeSection("forum");
                  scrollToSection(link_forum);
                }}
                className={`hover:text-indigo-600 transition ${
                  activeSection === "forum"
                    ? "text-indigo-600"
                    : "text-gray-900"
                }`}
              >
                {short_forum}
              </NavLink>
              <NavLink
                href="#tentang"
                onClick={() => {
                  changeSection("tentang");
                  scrollToSection("tentang");
                }}
                className={`hover:text-indigo-600 transition ${
                  activeSection === "tentang"
                    ? "text-indigo-600"
                    : "text-gray-900"
                }`}
              >
                Tentang
              </NavLink>
              <NavLink
                href="#kontak"
                onClick={() => {
                  changeSection("kontak");
                  scrollToSection("kontak");
                }}
                className={`hover:text-indigo-600 transition ${
                  activeSection === "kontak"
                    ? "text-indigo-600"
                    : "text-gray-900"
                }`}
              >
                Kontak
              </NavLink>
              <NavLink
                href={generalData!.link_aplikasi}
                className="hover:text-indigo-600 transition"
                target="_blank"
              >
                Aplikasi
              </NavLink>
            </nav>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="sm:hidden bg-gray-800 text-white p-4 mx-2 mt-2 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <NavLink
                href={`#${link_forum}`}
                onClick={() => {
                  changeSection("forum");
                  scrollToSection(link_forum);
                }}
                className={`text-lg font-medium transition-colors duration-200 ${
                  activeSection === "forum" ? "text-indigo-400" : "text-white"
                }`}
              >
                {short_forum}
              </NavLink>
              <NavLink href="#tentang" className="hover:text-indigo-400">
                Tentang
              </NavLink>
              <NavLink href="#kontak" className="hover:text-indigo-400">
                Kontak
              </NavLink>
              <NavLink
                href={generalData!.link_aplikasi}
                className="hover:text-indigo-400"
                target="_blank"
              >
                Aplikasi
              </NavLink>
            </div>
          </div>
        )}
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 flex-grow">
        <section
          id={link_forum}
          className="transition-all duration-500 ease-in-out transform min-h-screen flex justify-center items-center flex-col mb-16"
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            {generalData?.nama_forum}
          </h1>
          <p className="text-lg text-center text-gray-600 mb-8">
            {generalData?.konten_forum}
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card
              title="Pengumuman Terbaru"
              description="Pengumuman terbaru terkait kegiatan dan informasi penting kampus."
              link="/pengumuman"
            />
            <Card
              title="Diskusi Akademik"
              description="Forum untuk bertanya dan berdiskusi tentang tugas dan materi kuliah."
              link="/diskusi"
            />
            <Card
              title="Agenda Acara Mendatang"
              description="Agenda acara penting yang akan datang di kampus untuk mahasiswa."
              link="/agenda"
            />
          </div>
        </section>

        <section
          id="tentang"
          className="transition-all duration-500 ease-in-out transform min-h-screen flex justify-center items-center flex-col mb-16"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Tentang {generalData?.nama_forum}
          </h2>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
            {generalData?.konten_tentang}
          </p>
        </section>

        <section
          id="kontak"
          className="transition-all duration-500 ease-in-out transform min-h-screen flex justify-center items-center flex-col mb-16"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Kontak Kami
          </h2>
          <p className="text-lg text-center text-gray-600 mb-4">
            Jika Anda memiliki pertanyaan atau saran, silakan hubungi kami
            melalui:
          </p>
          <div className="text-center">
            <p className="text-sm text-gray-700">
              Email:{" "}
              <a
                href={`mailto:${generalData?.email}`}
                className="text-indigo-600"
              >
                {generalData?.email}
              </a>
            </p>
            <p className="text-sm text-gray-700 mt-2">
              WhatsApp:{" "}
              <a
                href={`https://wa.me/+62${generalData?.wa}`}
                className="text-indigo-600"
              >
                +62 {generalData?.wa}
              </a>
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-7">
        <div className="max-w-7xl mx-auto text-center">
          <p>
            © {new Date().getFullYear()} {short_forum}. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
