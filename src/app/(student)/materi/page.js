"use client";
import SubjectCard from "@/components/fragments/SubjectCard";

export default function MateriPage() {
  const subjects = [
    {
      id: 1,
      title: "Bahasa Inggris",
      href: "/materi/inggris",
      color: "bg-red-400",
    },
    {
      id: 2,
      title: "Matematika",
      href: "/materi/matematika",
      color: "bg-blue-400",
    },
    { id: 3, title: "IPA", href: "/materi/ipa", color: "bg-green-400" }, // Singkat nama mapel panjang utk mobile
    {
      id: 4,
      title: "Bhs Indonesia",
      href: "/materi/indonesia",
      color: "bg-orange-400",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col animate-fade-in pb-24 md:pb-8">
      {/* HEADER RESPONSIF */}
      <header className="flex justify-between items-center mb-8 md:mb-12 px-2">
        {/* Kotak Judul "MATERI" */}
        <div className="bg-gray-200 px-6 py-2 md:px-8 md:py-3 rounded-lg md:rounded-xl">
          <h1 className="text-lg md:text-2xl font-black text-slate-700 tracking-widest uppercase">
            MATERI
          </h1>
        </div>

        {/* Logo Kecil di Kanan */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">
            C
          </div>
          <span className="text-xl font-bold text-blue-600">CeriaEdu</span>
        </div>
      </header>

      {/* GRID CONTENT */}
      <main className="flex-1">
        {/* Mobile: Gap-4 (Rapat), Desktop: Gap-10 (Lega) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-10">
          {subjects.map((sub) => (
            <SubjectCard
              key={sub.id}
              title={sub.title}
              href={sub.href}
              color={sub.color}
            />
          ))}
        </div>
      </main>
    </div>
  );
}


// second
// 'use client'
// import { useState } from 'react';
// import { Search } from 'lucide-react';
// import MateriCard from '@/components/fragments/MateriCard';

// export default function MateriPage() {
//   const [activeFilter, setActiveFilter] = useState('Semua');
//   const filters = ['Semua', 'Matematika', 'Bhs. Indonesia', 'IPA', 'IPS'];

//   // Dummy Data
//   const materiList = [
//     {
//       id: 1,
//       title: "Operasi Hitung Bilangan Bulat",
//       category: "Matematika",
//       type: "Video",
//       duration: "10 Menit",
//       progress: 75,
//       image: "https://img.freepik.com/free-vector/chalkboard-with-math-elements_1419-2117.jpg"
//     },
//     {
//       id: 2,
//       title: "Mengenal Ekosistem Sawah",
//       category: "IPA",
//       type: "E-Book",
//       duration: "12 Halaman",
//       progress: 30,
//       image: "https://img.freepik.com/free-vector/hand-drawn-ecology-background_23-2149479633.jpg"
//     },
//     {
//       id: 3,
//       title: "Sejarah Kemerdekaan Indonesia",
//       category: "IPS",
//       type: "Video",
//       duration: "25 Menit",
//       progress: 0,
//       image: "https://img.freepik.com/free-vector/indonesia-independence-day-background_52683-40989.jpg"
//     }
//   ];

//   return (
//     <div className="space-y-8 animate-fade-in">
      
//       {/* Header Section */}
//       <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
//         <div>
//             <h1 className="text-2xl font-bold text-slate-800">Perpustakaan Materi</h1>
//             <p className="text-gray-500 mt-1">Lanjutkan progres belajarmu hari ini.</p>
//         </div>
        
//         {/* Search Bar */}
//         <div className="relative w-full md:w-72">
//             <input 
//                 type="text" 
//                 placeholder="Cari pelajaran..." 
//                 className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all text-sm"
//             />
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
//         </div>
//       </div>

//       {/* Filter Chips */}
//       <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
//         {filters.map((f) => (
//             <button 
//                 key={f}
//                 onClick={() => setActiveFilter(f)}
//                 className={`px-5 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
//                     activeFilter === f 
//                     ? 'bg-slate-900 text-white' 
//                     : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
//                 }`}
//             >
//                 {f}
//             </button>
//         ))}
//       </div>

//       {/* Grid Content */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {materiList.map((item) => (
//             <MateriCard key={item.id} {...item} />
//         ))}
//       </div>

//     </div>
//   );
// }