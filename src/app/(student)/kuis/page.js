'use client'
import Link from 'next/link';
import { Trophy, Clock, HelpCircle, ChevronRight, Play } from 'lucide-react';

export default function QuizListPage() {
  
  // Dummy Data Kuis
  const quizzes = [
    { 
      id: 1, 
      title: "Latihan Bilangan Bulat", 
      subject: "Matematika", 
      totalQuestions: 10, 
      duration: "15 Menit", 
      bestScore: 85, // null jika belum pernah main
      difficulty: "Easy"
    },
    { 
      id: 2, 
      title: "Vocabulary: Daily Activity", 
      subject: "B. Inggris", 
      totalQuestions: 20, 
      duration: "20 Menit", 
      bestScore: null, 
      difficulty: "Medium"
    },
    { 
      id: 3, 
      title: "Ekosistem & Rantai Makanan", 
      subject: "IPA", 
      totalQuestions: 15, 
      duration: "15 Menit", 
      bestScore: null, 
      difficulty: "Hard"
    },
  ];

  return (
    <div className="min-h-screen flex flex-col animate-fade-in pb-20">
      
      {/* --- HEADER --- */}
      <header className="mb-8 px-2">
        <h1 className="text-2xl font-black text-slate-800 tracking-wide uppercase mb-2">
            TANTANGAN KUIS 🏆
        </h1>
        <p className="text-slate-500 text-sm">
            Asah kemampuanmu dan kumpulkan poin tertinggi!
        </p>
      </header>

      {/* --- STATS SUMMARY (Gamification Kecil) --- */}
      <div className="grid grid-cols-2 gap-4 mb-8 px-1">
          <div className="bg-yellow-50 border border-yellow-100 p-4 rounded-xl flex flex-col items-center justify-center text-center">
             <Trophy size={24} className="text-yellow-500 mb-2" />
             <div className="text-2xl font-bold text-slate-800">1,250</div>
             <div className="text-xs font-semibold text-slate-400 uppercase">Total Poin</div>
          </div>
          <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex flex-col items-center justify-center text-center">
             <HelpCircle size={24} className="text-blue-500 mb-2" />
             <div className="text-2xl font-bold text-slate-800">12</div>
             <div className="text-xs font-semibold text-slate-400 uppercase">Kuis Selesai</div>
          </div>
      </div>

      {/* --- LIST KUIS --- */}
      <main className="flex-1 space-y-4 px-1">
        {quizzes.map((quiz) => (
          <div 
            key={quiz.id} 
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 relative overflow-hidden group"
          >
            {/* Indikator Kesulitan (Garis Warna di Kiri) */}
            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                quiz.difficulty === 'Easy' ? 'bg-green-400' : 
                quiz.difficulty === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
            }`}></div>

            {/* Info Kuis */}
            <div className="flex-1 pl-4">
                <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400 border border-gray-200 px-2 py-0.5 rounded-full">
                        {quiz.subject}
                    </span>
                    {quiz.bestScore !== null && (
                         <span className="text-[10px] font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Trophy size={10} /> Skor: {quiz.bestScore}
                         </span>
                    )}
                </div>
                <h3 className="font-bold text-slate-800 text-lg group-hover:text-blue-600 transition-colors">
                    {quiz.title}
                </h3>
                <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1"><HelpCircle size={14} /> {quiz.totalQuestions} Soal</span>
                    <span className="flex items-center gap-1"><Clock size={14} /> {quiz.duration}</span>
                </div>
            </div>

            {/* Tombol Mulai */}
            <Link 
                href={`/kuis/${quiz.id}`}
                className="self-start md:self-center bg-slate-900 hover:bg-blue-600 text-white pl-4 pr-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-all shadow-lg shadow-slate-200 group-hover:shadow-blue-200"
            >
                <Play size={16} fill="currentColor" />
                Mulai
            </Link>
          </div>
        ))}
      </main>

    </div>
  );
}