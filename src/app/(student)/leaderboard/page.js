'use client'
import { Trophy, Medal, User } from 'lucide-react';

export default function LeaderboardPage() {
  
  // Dummy Data Peringkat
  const leaderboardData = [
    { rank: 1, name: "Budi Santoso", school: "SDN 1 Jakarta", points: 2500, avatar: "bg-yellow-200" },
    { rank: 2, name: "Siti Aminah", school: "SDN 3 Bandung", points: 2350, avatar: "bg-gray-200" },
    { rank: 3, name: "Rizky Billar", school: "SDN 5 Surabaya", points: 2100, avatar: "bg-orange-200" },
    { rank: 4, name: "Dewi Persik", school: "SDN 2 Malang", points: 1950, avatar: "bg-blue-100" },
    { rank: 5, name: "Raffi Ahmad", school: "SDN 1 Depok", points: 1800, avatar: "bg-purple-100" },
    { rank: 6, name: "Nagita Slavina", school: "SDN 4 Bogor", points: 1750, avatar: "bg-pink-100" },
    { rank: 7, name: "Deddy C.", school: "SDN 1 Tangerang", points: 1600, avatar: "bg-green-100" },
  ];

  const topThree = leaderboardData.slice(0, 3);
  const restOfList = leaderboardData.slice(3);

  return (
    <div className="min-h-screen flex flex-col animate-fade-in pb-20">
      
      {/* --- HEADER --- */}
      <header className="text-center mb-8 px-4">
        <h1 className="text-2xl font-black text-slate-800 uppercase tracking-widest mb-2">
            PAPAN JUARA 🏆
        </h1>
        <p className="text-slate-500 text-sm">
            Siapakah siswa paling rajin minggu ini?
        </p>
      </header>

      {/* --- PODIUM (TOP 3) --- */}
      <div className="flex justify-center items-end gap-2 md:gap-6 mb-10 px-4 min-h-[220px]">
        
        {/* JUARA 2 */}
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-gray-300 overflow-hidden mb-2 relative shadow-lg">
                <div className="w-full h-full bg-gray-200 flex items-center justify-center font-bold text-gray-500 text-xl">
                    {topThree[1].name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-gray-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">2</div>
            </div>
            <div className="text-center mb-2">
                <div className="font-bold text-sm text-slate-800 line-clamp-1">{topThree[1].name}</div>
                <div className="text-xs text-blue-600 font-bold">{topThree[1].points} XP</div>
            </div>
            <div className="w-20 md:w-24 h-24 bg-gradient-to-t from-gray-300 to-gray-200 rounded-t-xl shadow-inner flex items-end justify-center pb-4 opacity-90">
                <Medal size={32} className="text-white drop-shadow-md" />
            </div>
        </div>

        {/* JUARA 1 */}
        <div className="flex flex-col items-center z-10 -mb-2">
             {/* Mahkota */}
            <Trophy size={32} className="text-yellow-500 mb-1 animate-bounce" />
            
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border-4 border-yellow-400 overflow-hidden mb-2 relative shadow-xl ring-4 ring-yellow-100">
                <div className="w-full h-full bg-yellow-100 flex items-center justify-center font-bold text-yellow-600 text-2xl">
                    {topThree[0].name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-yellow-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 border-white">1</div>
            </div>
            <div className="text-center mb-2">
                <div className="font-bold text-base text-slate-800">{topThree[0].name}</div>
                <div className="text-sm text-blue-600 font-bold">{topThree[0].points} XP</div>
            </div>
            <div className="w-24 md:w-32 h-32 bg-gradient-to-t from-yellow-400 to-yellow-300 rounded-t-2xl shadow-lg flex items-end justify-center pb-4">
                <div className="text-yellow-800 font-black text-4xl opacity-20">1</div>
            </div>
        </div>

        {/* JUARA 3 */}
        <div className="flex flex-col items-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-4 border-orange-300 overflow-hidden mb-2 relative shadow-lg">
                <div className="w-full h-full bg-orange-100 flex items-center justify-center font-bold text-orange-500 text-xl">
                    {topThree[2].name.charAt(0)}
                </div>
                <div className="absolute -bottom-1 -right-1 bg-orange-400 text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold border-2 border-white">3</div>
            </div>
            <div className="text-center mb-2">
                <div className="font-bold text-sm text-slate-800 line-clamp-1">{topThree[2].name}</div>
                <div className="text-xs text-blue-600 font-bold">{topThree[2].points} XP</div>
            </div>
            <div className="w-20 md:w-24 h-20 bg-gradient-to-t from-orange-300 to-orange-200 rounded-t-xl shadow-inner flex items-end justify-center pb-4 opacity-90">
                <Medal size={32} className="text-white drop-shadow-md" />
            </div>
        </div>

      </div>

      {/* --- LIST SISWA LAINNYA (Rank 4 dst) --- */}
      <main className="flex-1 px-4 max-w-2xl mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {restOfList.map((student) => (
                <div 
                    key={student.rank} 
                    className="flex items-center gap-4 p-4 border-b border-gray-50 hover:bg-slate-50 transition-colors last:border-0"
                >
                    <div className="font-bold text-slate-400 w-6 text-center">{student.rank}</div>
                    
                    <div className={`w-10 h-10 ${student.avatar} rounded-full flex items-center justify-center text-slate-600 font-bold text-sm`}>
                        {student.name.charAt(0)}
                    </div>
                    
                    <div className="flex-1">
                        <div className="font-bold text-slate-700 text-sm md:text-base">{student.name}</div>
                        <div className="text-xs text-slate-400">{student.school}</div>
                    </div>

                    <div className="font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full text-xs md:text-sm">
                        {student.points} XP
                    </div>
                </div>
            ))}
        </div>
        
        {/* CARD POSISI SAYA (Sticky Bottom jika list panjang) */}
        <div className="mt-6 bg-slate-900 text-white p-4 rounded-2xl flex items-center gap-4 shadow-xl transform hover:scale-[1.02] transition-transform cursor-pointer">
            <div className="font-bold text-slate-400 w-6 text-center">15</div>
             <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-white text-sm border-2 border-white/20">
                B
            </div>
            <div className="flex-1">
                <div className="font-bold text-white text-sm md:text-base">Budi (Saya)</div>
                <div className="text-xs text-slate-400">Terus belajar!</div>
            </div>
            <div className="font-bold text-yellow-400 text-sm md:text-base">
                1200 XP
            </div>
        </div>
      </main>

    </div>
  );
}