"use client";

import { FaBars } from "react-icons/fa";
import NavLink from "../components/NavLink";
import Card from "../components/Card";
import useNavigation from "../hooks/useNavigation";
import { kampusData } from "../../../data/kampusData";

export default function DiskusiAkademik() {
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
                className="hover:text-indigo-600 transition"
              >
                Pengumuman
              </NavLink>
              <NavLink href="/diskusi" className="text-indigo-600 transition">
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

        {isMobileMenuOpen && (
          <div className="sm:hidden bg-gray-800 text-white p-4 mx-2 mt-2 rounded-lg shadow-lg">
            <div className="flex flex-col space-y-4">
              <NavLink href="/" className="hover:text-indigo-400">
                Home
              </NavLink>
              <NavLink href="/pengumuman" className="hover:text-indigo-400">
                Pengumuman
              </NavLink>
              <NavLink href="/diskusi" className="hover:text-indigo-400">
                Diskusi
              </NavLink>
              <NavLink
                href={kampusData.link_aplikasi}
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
        <section className="transition-all duration-500 ease-in-out transform min-h-screen flex justify-center items-center flex-col mb-16">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">
            Diskusi Akademik
          </h1>
          <p className="text-lg text-center text-gray-600 mb-8">
            Ruang untuk mahasiswa berbagi ide, berdiskusi, dan mencari solusi
            akademik. Silakan bergabung dalam topik diskusi atau mulai diskusi
            baru.
          </p>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {kampusData.diskusi.map((diskusi) => (
              <Card
                key={diskusi.link}
                title={diskusi.title}
                description={diskusi.description}
                link={diskusi.link}
              />
            ))}
          </div>
        </section>
      </main>

      <footer className="bg-gray-800 text-white py-7">
        <div className="max-w-7xl mx-auto text-center">
          <p>
            © {new Date().getFullYear()} {kampusData.nama_forum}. All rights
            reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
