'use client'
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Pause, Play, RefreshCw, Heart, Timer } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function PlayGamePage({ params }) {
  const router = useRouter();
  
  // Game State
  const [isPlaying, setIsPlaying] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [timeLeft, setTimeLeft] = useState(10); // 10 detik per soal
  
  // Soal State
  const [question, setQuestion] = useState({ text: "", answer: 0, options: [] });

  // --- ENGINE: GENERATE SOAL ---
  const generateQuestion = () => {
    // Random angka 1-20
    const num1 = Math.floor(Math.random() * 20) + 1;
    const num2 = Math.floor(Math.random() * 20) + 1;
    const isAddition = Math.random() > 0.5; // 50% Tambah, 50% Kurang
    
    let ans = 0;
    let text = "";

    if (isAddition) {
        ans = num1 + num2;
        text = `${num1} + ${num2}`;
    } else {
        // Pastikan hasil tidak negatif agar mudah untuk anak SD
        const max = Math.max(num1, num2);
        const min = Math.min(num1, num2);
        ans = max - min;
        text = `${max} - ${min}`;
    }

    // Generate Pilihan Jawaban (1 Benar, 3 Salah)
    const options = new Set([ans]); // Set mencegah duplikat
    while(options.size < 4) {
        const wrong = ans + Math.floor(Math.random() * 10) - 5; // Jawaban salah mirip2
        if(wrong >= 0) options.add(wrong);
    }

    // Acak posisi pilihan
    setQuestion({
        text,
        answer: ans,
        options: Array.from(options).sort(() => Math.random() - 0.5)
    });
    
    setTimeLeft(10); // Reset waktu tiap soal baru
  };

  // --- ENGINE: TIMER LOOP ---
  useEffect(() => {
    let timer;
    if (isPlaying && !isGameOver) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleWrongAnswer(); // Waktu habis = Salah
            return 10;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, isGameOver, lives]); // Dependency lives penting agar timer tdk zombie

  // --- HANDLERS ---
  const startGame = () => {
    setScore(0);
    setLives(3);
    setIsGameOver(false);
    setIsPlaying(true);
    generateQuestion();
  };

  const handleAnswer = (val) => {
    if (val === question.answer) {
      // BENAR
      setScore(score + 10);
      generateQuestion(); // Soal baru
    } else {
      // SALAH
      handleWrongAnswer();
    }
  };

  const handleWrongAnswer = () => {
    if (lives > 1) {
        setLives(lives - 1);
        generateQuestion(); // Lewati soal ini
    } else {
        setLives(0);
        setIsGameOver(true);
        setIsPlaying(false);
    }
  };

  // --- LAYOUT ---
  return (
    <div className="h-screen flex flex-col bg-slate-900 text-white font-sans overflow-hidden">
      
      {/* GAME HEADER */}
      <header className="p-4 flex items-center justify-between shrink-0">
        <Link href="/games" className="p-2 bg-slate-800 rounded-xl hover:bg-slate-700 transition-colors">
            <ArrowLeft size={20} />
        </Link>
        <div className="font-bold text-lg tracking-wider">MATH RUSH</div>
        <div className="w-10"></div> {/* Spacer kanan */}
      </header>

      {/* GAME AREA */}
      <main className="flex-1 flex flex-col items-center justify-center p-4 relative">
        
        {/* BACKGROUND DECORATION */}
        <div className="absolute inset-0 overflow-hidden opacity-10 pointer-events-none">
            <div className="absolute top-10 left-10 text-9xl font-black">?</div>
            <div className="absolute bottom-20 right-10 text-9xl font-black">+</div>
            <div className="absolute top-1/2 left-1/2 text-[200px] font-black -translate-x-1/2 -translate-y-1/2">%</div>
        </div>

        {!isPlaying && !isGameOver ? (
            // --- MENU START ---
            <div className="text-center z-10 space-y-8 animate-fade-in">
                <div className="w-32 h-32 mx-auto bg-blue-500 rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(59,130,246,0.5)] animate-bounce">
                    <Play size={64} fill="currentColor" className="ml-2" />
                </div>
                <div>
                    <h1 className="text-4xl font-black mb-2">SIAP MAIN?</h1>
                    <p className="text-slate-400">Jawab soal matematika secepat mungkin!</p>
                </div>
                <button 
                    onClick={startGame}
                    className="bg-green-500 hover:bg-green-600 text-white font-black py-4 px-12 rounded-full text-xl shadow-lg transition-transform hover:scale-105 active:scale-95"
                >
                    MULAI
                </button>
            </div>
        ) : isGameOver ? (
            // --- GAME OVER SCREEN ---
            <div className="text-center z-10 space-y-6 animate-fade-in">
                <div className="text-red-500 font-black text-5xl mb-4">GAME OVER</div>
                
                <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 w-64 mx-auto">
                    <div className="text-slate-400 text-sm uppercase font-bold mb-1">Skor Akhir</div>
                    <div className="text-5xl font-black text-white">{score}</div>
                </div>

                <div className="flex gap-4 justify-center pt-4">
                    <Link href="/games" className="p-4 bg-slate-800 rounded-2xl hover:bg-slate-700">
                        <ArrowLeft size={24} />
                    </Link>
                    <button 
                        onClick={startGame}
                        className="flex-1 max-w-[200px] bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 shadow-lg"
                    >
                        <RefreshCw size={24} /> Main Lagi
                    </button>
                </div>
            </div>
        ) : (
            // --- GAMEPLAY INTERFACE ---
            <div className="w-full max-w-md z-10 flex flex-col h-full justify-center">
                
                {/* HUD (Heads Up Display) */}
                <div className="flex justify-between items-center mb-8 md:mb-12">
                    <div className="flex gap-1">
                        {[...Array(3)].map((_, i) => (
                            <Heart 
                                key={i} 
                                size={28} 
                                fill={i < lives ? "#ef4444" : "none"} 
                                className={i < lives ? "text-red-500" : "text-slate-700"} 
                            />
                        ))}
                    </div>
                    <div className="text-2xl font-black text-white">{score}</div>
                </div>

                {/* TIMER BAR */}
                <div className="w-full h-3 bg-slate-800 rounded-full mb-8 overflow-hidden border border-slate-700">
                    <div 
                        className={`h-full transition-all duration-1000 ease-linear ${timeLeft < 4 ? 'bg-red-500' : 'bg-green-500'}`}
                        style={{ width: `${(timeLeft / 10) * 100}%` }}
                    ></div>
                </div>

                {/* SOAL CARD */}
                <div className="bg-white text-slate-900 rounded-3xl p-8 text-center mb-8 shadow-2xl transform scale-100 transition-transform">
                    <div className="text-slate-400 text-sm font-bold uppercase mb-2">Hitung Cepat!</div>
                    <div className="text-6xl font-black tracking-tight">{question.text}</div>
                </div>

                {/* PILIHAN JAWABAN (Grid 2x2) */}
                <div className="grid grid-cols-2 gap-4">
                    {question.options.map((opt, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleAnswer(opt)}
                            className="bg-slate-800 hover:bg-blue-600 border-b-4 border-slate-950 hover:border-blue-800 text-white text-2xl font-bold py-6 rounded-2xl transition-all active:translate-y-1 active:border-b-0"
                        >
                            {opt}
                        </button>
                    ))}
                </div>
            </div>
        )}

      </main>
    </div>
  );
}