"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Clock,
  ChevronRight,
  ChevronLeft,
  CheckCircle,
  XCircle,
  RefreshCw,
  Home,
} from "lucide-react";
import { useRouter } from "next/navigation";

export default function QuizInterfacePage({ params }) {
  const router = useRouter();

  // --- STATE MANAGEMENT ---
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600);

  // --- DUMMY DATA SOAL ---
  const questions = [
    {
      id: 1,
      question: "Hasil dari operasi hitung -12 + 7 adalah...",
      options: [
        { label: "A", text: "-19" },
        { label: "B", text: "-5" },
        { label: "C", text: "5" },
        { label: "D", text: "19" },
      ],
      correctAnswer: "B",
    },
    {
      id: 2,
      question: "Manakah di bawah ini yang merupakan bilangan prima?",
      options: [
        { label: "A", text: "9" },
        { label: "B", text: "15" },
        { label: "C", text: "17" },
        { label: "D", text: "21" },
      ],
      correctAnswer: "C",
    },
    {
      id: 3,
      question: "Rumus luas lingkaran yang benar adalah...",
      options: [
        { label: "A", text: "π x r" },
        { label: "B", text: "2 x π x r" },
        { label: "C", text: "π x r x r" },
        { label: "D", text: "π x d" },
      ],
      correctAnswer: "C",
    },
  ];

  // --- LOGIC TIMER ---
  useEffect(() => {
    if (showResult) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [showResult]);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // --- LOGIC JAWABAN ---
  const handleSelect = (optionLabel) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: optionLabel });
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correctCount++;
      }
    });
    const finalScore = (correctCount / questions.length) * 100;
    setScore(Math.floor(finalScore));
    setShowResult(true);
  };

  // --- TAMPILAN HASIL (Responsive Fix) ---
  if (showResult) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-slate-50 overflow-y-auto">
        <div className="bg-white w-full max-w-sm md:max-w-md p-6 md:p-8 rounded-3xl shadow-xl text-center border border-gray-100">
          <div className="mb-4 md:mb-6 flex justify-center">
            {score >= 70 ? (
              <div className="w-20 h-20 md:w-24 md:h-24 bg-green-100 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle
                  size={40}
                  className="md:w-12 md:h-12 text-green-600"
                />
              </div>
            ) : (
              <div className="w-20 h-20 md:w-24 md:h-24 bg-red-100 rounded-full flex items-center justify-center">
                <XCircle size={40} className="md:w-12 md:h-12 text-red-600" />
              </div>
            )}
          </div>

          <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-2">
            {score >= 70 ? "KERJA BAGUS! 🎉" : "JANGAN NYERAH! 💪"}
          </h2>
          <p className="text-sm md:text-base text-slate-500 mb-6 md:mb-8">
            Kamu menjawab benar {Math.round((score / 100) * questions.length)}{" "}
            dari {questions.length} soal.
          </p>

          <div className="text-5xl md:text-6xl font-black text-blue-600 mb-6 md:mb-8 tracking-tighter">
            {score}
          </div>

          <div className="space-y-3">
            <button
              onClick={() => window.location.reload()}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={18} className="inline" /> Coba Lagi
            </button>
            <Link
              href="/kuis"
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm md:text-base transition-all flex items-center justify-center gap-2"
            >
              <Home size={18} className="inline" /> Kembali ke Menu
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // --- TAMPILAN UTAMA (FIXED LAYOUT FOR MOBILE) ---
  return (
    // 'h-screen' memaksa tinggi pas 1 layar device, mencegah scroll page global
    <div className="h-screen flex flex-col bg-slate-50 overflow-hidden font-sans">
      {/* HEADER: Fixed Height */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 shrink-0 z-20">
        <div className="max-w-2xl mx-auto flex items-center justify-between mb-3">
          <div className="flex items-center gap-2 text-slate-700 font-bold bg-slate-100 px-3 py-1 rounded-lg text-sm md:text-base">
            <Clock size={16} className="text-blue-600" />
            <span className={timeLeft < 60 ? "text-red-500 animate-pulse" : ""}>
              {formatTime(timeLeft)}
            </span>
          </div>
          <div className="text-xs md:text-sm font-bold text-slate-500">
            Soal {currentQuestion + 1}{" "}
            <span className="text-slate-300">/ {questions.length}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="max-w-2xl mx-auto h-1.5 md:h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all duration-500 ease-out"
            style={{
              width: `${((currentQuestion + 1) / questions.length) * 100}%`,
            }}
          ></div>
        </div>
      </div>

      {/* QUESTION AREA: Scrollable Internal */}
      <main className="flex-1 overflow-y-auto p-4 md:p-6 scroll-smooth">
        <div className="w-full max-w-2xl mx-auto pb-4">
          {/* Card Soal */}
          <div className="bg-white rounded-2xl p-5 md:p-8 shadow-sm border border-gray-100 mb-4 md:mb-6 min-h-[150px] md:min-h-[200px] flex items-center justify-center md:justify-start">
            <h3 className="text-base md:text-xl font-medium text-slate-800 leading-relaxed text-center md:text-left">
              {questions[currentQuestion].question}
            </h3>
          </div>

          {/* Pilihan Jawaban */}
          <div className="space-y-3">
            {questions[currentQuestion].options.map((opt) => {
              const isSelected = selectedAnswers[currentQuestion] === opt.label;
              return (
                <button
                  key={opt.label}
                  onClick={() => handleSelect(opt.label)}
                  className={`w-full text-left p-3 md:p-4 rounded-xl border-2 transition-all flex items-center gap-3 md:gap-4 group active:scale-[0.98] ${
                    isSelected
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-100 bg-white hover:border-blue-200 hover:bg-slate-50 text-slate-700"
                  }`}
                >
                  {/* Label A/B/C/D tidak boleh mengecil (shrink-0) */}
                  <div
                    className={`w-8 h-8 md:w-10 md:h-10 shrink-0 rounded-lg flex items-center justify-center font-bold text-sm md:text-base transition-colors ${
                      isSelected
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-blue-500"
                    }`}
                  >
                    {opt.label}
                  </div>
                  <span className="font-medium text-sm md:text-lg leading-snug">
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </main>

      {/* FOOTER: Navigation Fixed Bottom */}
      <div className="bg-white border-t border-gray-200 p-3 md:p-4 shrink-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-2xl mx-auto flex justify-between gap-3">
          <button
            onClick={handlePrev}
            disabled={currentQuestion === 0}
            className="flex-1 md:flex-none px-4 py-3 rounded-xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors text-xs md:text-sm"
          >
            <ChevronLeft size={16} className="md:w-5 md:h-5" />{" "}
            <span className="hidden md:inline">Sebelumnya</span>{" "}
            <span className="md:hidden">Prev</span>
          </button>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex-[2] md:flex-none px-6 md:px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-lg shadow-green-200 flex items-center justify-center gap-2 transition-transform active:scale-95 text-xs md:text-sm"
            >
              Selesai <CheckCircle size={16} className="md: w-20 md:h-20" />
            </button>
          ) : (
            <button
              onClick={handleNext}
              className="flex-[2] md:flex-none px-6 md:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-transform active:scale-95 text-xs md:text-sm"
            >
              <span className="md:hidden">Next</span>{" "}
              <span className="hidden md:inline">Selanjutnya</span>{" "}
              <ChevronRight size={16} className="md:w-5 md:h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
