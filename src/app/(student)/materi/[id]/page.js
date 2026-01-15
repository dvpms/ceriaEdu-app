"use client";
import Link from "next/link";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useParams } from "next/navigation"; // Hook untuk menangkap id dari URL

export default function DetailMateriPage() {
  const params = useParams();
  const subjectId = params.id; // contoh: 'inggris', 'matematika'

  // --- DATABASE DUMMY ---
  // Di aplikasi nyata, data ini diambil dari API Backend berdasarkan ID
  const databaseMateri = {
    inggris: {
      title: "BAHASA INGGRIS",
      color: "border-blue-500", // Warna aksen
      classes: [
        {
          id: 1,
          grade: "Kelas 4",
          topics:
            "Greetings and Introductions, Self and Family, Classroom Objects, Colors and Numbers, Days of the Week.",
        },
        {
          id: 2,
          grade: "Kelas 5",
          topics:
            "Time and Dates, Animals and Adjectives, Present Continuous Tense, Simple Future Tense, Public Places.",
        },
        {
          id: 3,
          grade: "Kelas 6",
          topics:
            "Comparison, Public Holidays and Events, Feelings and Opinions, Conditional Sentences, Direction and Location.",
        },
      ],
    },
    matematika: {
      title: "MATEMATIKA",
      color: "border-green-500",
      classes: [
        {
          id: 1,
          grade: "Kelas 4",
          topics: "Pecahan, FPB & KPK, Pembulatan Angka, Bangun Datar.",
        },
        {
          id: 2,
          grade: "Kelas 5",
          topics:
            "Operasi Hitung Pecahan, Kecepatan & Debit, Skala & Denah, Bangun Ruang.",
        },
        {
          id: 3,
          grade: "Kelas 6",
          topics: "Bilangan Bulat Negatif, Lingkaran, Modus Median Mean.",
        },
      ],
    },
    // Default fallback jika mapel belum ada
    default: {
      title: "MATA PELAJARAN",
      color: "border-gray-500",
      classes: [],
    },
  };

  // Pilih data berdasarkan ID, atau pakai default jika tidak ditemukan
  const data = databaseMateri[subjectId] || databaseMateri["default"];

  return (
    <div className="min-h-screen flex flex-col animate-fade-in pb-10">
      {/* --- HEADER --- */}
      <header className="flex flex-col-reverse gap-4 md:flex-row md:items-start justify-between mb-10 px-2">
        {/* KIRI: Judul Mapel */}
        <div className="flex-1">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 uppercase tracking-wide">
            {data.title}
          </h1>
          {/* Garis Bawah Panjang Sesuai Wireframe */}
          <div
            className={`h-1 w-full md:w-2/3 mt-3 bg-slate-300 rounded-full relative overflow-hidden`}
          >
            <div
              className={`absolute left-0 top-0 h-full w-1/3 ${data.color.replace(
                "border",
                "bg"
              )}`}
            ></div>
          </div>
        </div>

        {/* KANAN: Tombol Aksi (Back & Logo) */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          {/* Tombol Kembali (Kotak 1 di wireframe) */}
          <Link
            href="/materi"
            className="w-10 h-10 md:w-12 md:h-12 bg-white border border-gray-300 hover:border-blue-500 rounded-lg flex items-center justify-center text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-all shadow-sm"
            title="Kembali"
          >
            <ArrowLeft size={24} />
          </Link>

          {/* Logo (Kotak 2 di wireframe) */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
              C
            </div>
            <span className="text-xl font-bold text-blue-600">CeriaEdu</span>
          </div>
        </div>
      </header>

      {/* --- MAIN CONTENT (LIST KELAS) --- */}
      <main className="flex-1 space-y-6 px-1">
        {data.classes.length > 0 ? (
          data.classes.map((item) => (
            <div
              key={item.id}
              className="bg-gray-100 hover:bg-white border border-transparent hover:border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer"
            >
              <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors">
                {item.grade}
              </h3>
              <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                {item.topics}
              </p>
            </div>
          ))
        ) : (
          // State Kosong (Jika mapel tidak ditemukan/belum ada isi)
          <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-medium">
              Materi untuk pelajaran ini belum tersedia.
            </p>
            <Link
              href="/materi"
              className="text-blue-500 font-bold text-sm mt-2 hover:underline"
            >
              Pilih pelajaran lain
            </Link>
          </div>
        )}
      </main>

      {/* --- FOOTER --- */}
      <footer className="text-center text-slate-500 font-medium py-8 mt-8 border-t border-gray-100 text-sm">
        &copy; 2025 CeriaEdu
      </footer>
    </div>
  );
}
