"use client";
import Link from "next/link";
import { useSelector } from "react-redux";
import { PlayCircle, MessageSquarePlus, Star } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  // 1. Ambil data nama user dari Redux Store yang sudah kita buat
  const { user } = useSelector((state) => state.auth);

  // Dummy data untuk Testimoni (Nanti bisa dari API)
  const testimonials = [
    {
      id: 1,
      name: "Ayu Lestari",
      text: "Belajar matematika jadi gampang banget di sini!",
      rating: 5,
    },
    {
      id: 2,
      name: "Dimas Anggara",
      text: "Kuisnya seru, kayak main game beneran.",
      rating: 4,
    },
    {
      id: 3,
      name: "Siti Nurhaliza",
      text: "Suka banget sama fitur rankingnya, jadi semangat.",
      rating: 5,
    },
  ];

  return (
    <div className="space-y-10 animate-fade-in">
      {/* --- SECTION 1: HERO (Selamat Datang) --- */}
      <section className="bg-white rounded-3xl p-6 md:p-10 shadow-sm border border-gray-100 flex flex-col-reverse md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4 text-center md:text-left">
          <h1 className="text-xl md:text-4xl font-extrabold text-slate-800 leading-tight">
            Selamat Datang
            <br />
            <span className="text-blue-600">
              {user?.name || "Siswa Juara"}!
            </span>{" "}
            👋
          </h1>
          <p className="text-gray-500 text-lg">
            Belajar jadi lebih seru dan menyenangkan.
          </p>

          <div className="pt-4">
            <Link
              href="/materi"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transform hover:-translate-y-1"
            >
              <PlayCircle size={20} />
              Mulai Belajar
            </Link>
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 flex items-center justify-center relative overflow-hidden">
            <Image
              src="/children-school.png"
              width={740}
              height={740}
              alt="Student Learning"
              className="relative z-10 w-4/5 h-auto object-contain mix-blend-darken"
              // Note: Gunakan gambar placeholder online agar langsung terlihat bagus
            />
          </div>
        </div>
      </section>

      {/* --- SECTION 3: TESTIMONI (Transformasi dari Tabel ke Grid) --- */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-slate-800 border-l-4 border-blue-600 pl-3">
            Apa Kata Mereka?
          </h2>
          <button className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-lg transition-colors">
            <MessageSquarePlus size={18} />+ Tulis Ulasan
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex text-yellow-400 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < item.rating ? "currentColor" : "none"}
                    className={i < item.rating ? "" : "text-gray-300"}
                  />
                ))}
              </div>
              <p className="text-gray-600 italic mb-4 text-sm">
                &quot;{item.text}&quot;
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-500">
                  {item.name.charAt(0)}
                </div>
                <span className="text-sm font-semibold text-slate-700">
                  {item.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center text-gray-400 text-sm py-8 border-t border-gray-100 mt-12">
        &copy; 2025 CeriaEdu. All rights reserved.
      </footer>
    </div>
  );
}
