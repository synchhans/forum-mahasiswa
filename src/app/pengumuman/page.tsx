"use client";
import { FaBars } from "react-icons/fa";
import NavLink from "../components/NavLink";
import useNavigation from "../hooks/useNavigation";
import { kampusData } from "../../../data/kampusData";

export default function Pengumuman() {
  const {
    isMobileMenuOpen,
    activeSection,
    toggleMenu,
    changeSection,
    scrollToSection,
  } = useNavigation();

  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)] flex flex-col">
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-5 sm:px-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <img
                src={kampusData.logo}
                alt="Logo Kampus"
                width={100}
                height={50}
                loading="lazy"
              />
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
              <NavLink href="/" className="hover:text-indigo-600 transition">
                Home
              </NavLink>
              <NavLink
                href="/pengumuman"
                className="text-indigo-600 transition"
              >
                Pengumuman
              </NavLink>
              <NavLink
                href="/diskusi"
                className="hover:text-indigo-600 transition"
              >
                Diskusi
              </NavLink>
              <NavLink
                href={kampusData.link_aplikasi}
                className="hover:text-indigo-600 transition"
                target="_blank"
              >
                Aplikasi
              </NavLink>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 flex-grow">
        <section className="py-16 flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Pengumuman Kampus
          </h1>
          <p className="text-lg text-gray-600 text-center max-w-2xl mb-10">
            Tetap terupdate dengan pengumuman terbaru tentang kegiatan, acara,
            dan informasi penting dari kampus.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {kampusData.pengumuman.map((item, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-4">
                    {item.description}
                  </p>
                  <a
                    href={item.link}
                    target="_blank"
                    className="text-indigo-600 hover:underline"
                  >
                    Baca selengkapnya →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-7">
        <div className="max-w-7xl mx-auto text-center">
          <p>
            © {new Date().getFullYear()} {kampusData.universitas}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
