"use client";
import { FaBars } from "react-icons/fa";
import NavLink from "./components/NavLink";
import Card from "./components/Card";
import useNavigation from "./hooks/useNavigation";
import { kampusData } from "../../data/kampusData";

const link_forum = kampusData.nama_forum
  .toLowerCase()
  .replace(/\s+/g, "-")
  .replace(/[^a-z0-9\-]/g, "");

const short_forum =
  kampusData.nama_forum.split(" ").length > 3
    ? kampusData.nama_forum.split(" ").slice(0, 3).join(" ") + ".."
    : kampusData.nama_forum;

const Home: React.FC = () => {
  const {
    isMobileMenuOpen,
    activeSection,
    toggleMenu,
    changeSection,
    scrollToSection,
  } = useNavigation();

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <a href="/" className="hover:opacity-80 transition-opacity">
                <img
                  src={kampusData.logo}
                  alt="Logo Kampus"
                  width={100}
                  height={50}
                  loading="lazy"
                />
              </a>
              <div className="text-2xl font-semibold text-gray-900 truncate max-w-[200px]">
                <a
                  href={kampusData.link_universitas}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-600 transition-colors"
                >
                  {kampusData.universitas}
                </a>
              </div>
            </div>

            {/* Navigation */}
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
                href={kampusData.link_aplikasi}
                className="hover:text-indigo-600 transition"
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
                href={kampusData.link_aplikasi}
                className="hover:text-indigo-400"
              >
                Aplikasi
              </NavLink>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 flex-grow">
        {/* Forum Mahasiswa Section */}
        <section
          id={link_forum}
          className="transition-all duration-500 ease-in-out transform min-h-screen flex justify-center items-center flex-col mb-16"
        >
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            {kampusData.nama_forum}
          </h1>
          <p className="text-lg text-center text-gray-600 mb-8">
            {kampusData.konten_forum}
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card
              title="Pengumuman Terbaru"
              description="Pengumuman terbaru terkait kegiatan dan informasi penting kampus."
              link="/pengumuman"
            />
            <Card
              title="Berita Terkini"
              description="Berita terkini seputar kegiatan dan perkembangan di kalangan mahasiswa."
              link="/berita"
            />
            <Card
              title="Agenda Acara Mendatang"
              description="Agenda acara penting yang akan datang di kampus untuk mahasiswa."
              link="/agenda"
            />
          </div>
        </section>

        {/* Tentang Section */}
        <section
          id="tentang"
          className="transition-all duration-500 ease-in-out transform min-h-screen flex justify-center items-center flex-col mb-16"
        >
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-4">
            Tentang {kampusData.nama_forum}
          </h2>
          <p className="text-lg text-center text-gray-600 max-w-2xl mx-auto">
            {kampusData.konten_tentang}
          </p>
        </section>

        {/* Kontak Section */}
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
                href={`mailto:${kampusData.email}`}
                className="text-indigo-600"
              >
                {kampusData.email}
              </a>
            </p>
            <p className="text-sm text-gray-700 mt-2">
              WhatsApp:{" "}
              <a
                href={`https://wa.me/+62${kampusData.wa}`}
                className="text-indigo-600"
              >
                +62 {kampusData.wa}
              </a>
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
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
