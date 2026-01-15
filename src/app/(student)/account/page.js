'use client'
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import { User, Mail, School, LogOut, Award, Edit3, Settings, Trophy, Star } from 'lucide-react';
import { logout } from '@/lib/redux/slices/authSlice'; // Pastikan path ini sesuai dengan slice Redux Anda

export default function ProfilePage() {
  const router = useRouter();
  const dispatch = useDispatch();
  
  // Ambil data dari Redux
  const { user } = useSelector((state) => state.auth);

  // Dummy Data Tambahan (karena di Redux baru ada nama)
  const userDetails = {
    nisn: "1234567890",
    email: "budisantoso@sekolah.id",
    school: "SDN 1 Jakarta",
    class: "Kelas 6A",
    joinDate: "Januari 2025"
  };

  // Dummy Data Pencapaian (Badges)
  const badges = [
    { id: 1, name: "Si Paling Rajin", icon: <Star size={20} />, color: "bg-yellow-100 text-yellow-600", desc: "Login 7 hari berturut-turut" },
    { id: 2, name: "Matematika Master", icon: <Trophy size={20} />, color: "bg-blue-100 text-blue-600", desc: "Nilai 100 di ujian Math" },
    { id: 3, name: "Kutu Buku", icon: <Award size={20} />, color: "bg-purple-100 text-purple-600", desc: "Membaca 10 materi" },
  ];

  const handleLogout = () => {
    // 1. Reset state Redux
    dispatch(logout());
    // 2. Redirect ke halaman login
    router.push('/login');
  };

  return (
    <div className="min-h-screen animate-fade-in pb-24">
      
      {/* --- HEADER PROFILE CARD --- */}
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden mb-6 relative">
        {/* Background Banner */}
        <div className="h-32 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
        
        <div className="px-6 pb-6 relative">
            {/* Avatar (Overlapping Banner) */}
            <div className="-mt-12 mb-4 flex justify-between items-end">
                <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full p-1.5 shadow-md">
                    <div className="w-full h-full bg-slate-200 rounded-full flex items-center justify-center text-slate-400">
                        <User size={48} />
                    </div>
                </div>
                
                {/* Tombol Edit (Kanan Atas Avatar) */}
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors">
                    <Edit3 size={16} /> <span className="hidden md:inline">Edit Profil</span>
                </button>
            </div>

            {/* Nama & Info Utama */}
            <div>
                <h1 className="text-2xl md:text-3xl font-black text-slate-800 mb-1">
                    {user?.name || "Siswa Ceria"}
                </h1>
                <div className="flex items-center gap-2 text-slate-500 font-medium text-sm md:text-base">
                    <School size={16} /> {userDetails.school} • {userDetails.class}
                </div>
            </div>
        </div>
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* KOLOM KIRI: Biodata & Stats */}
        <div className="md:col-span-1 space-y-6">
            
            {/* Stats Kecil */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 grid grid-cols-2 gap-4 text-center">
                <div className="p-2">
                    <div className="text-2xl font-black text-blue-600">1,250</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Total XP</div>
                </div>
                <div className="p-2 border-l border-gray-100">
                    <div className="text-2xl font-black text-yellow-500">#15</div>
                    <div className="text-xs font-bold text-slate-400 uppercase">Ranking</div>
                </div>
            </div>

            {/* Detail Kontak */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
                <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-2">Info Pribadi</h3>
                
                <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                        <User size={16} />
                    </div>
                    <div>
                        <div className="text-xs text-slate-400">NISN</div>
                        <div className="text-sm font-semibold">{userDetails.nisn}</div>
                    </div>
                </div>

                <div className="flex items-center gap-3 text-slate-600">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center text-blue-500">
                        <Mail size={16} />
                    </div>
                    <div>
                        <div className="text-xs text-slate-400">Email</div>
                        <div className="text-sm font-semibold">{userDetails.email}</div>
                    </div>
                </div>
            </div>

            {/* Tombol Logout & Settings (Mobile Friendly) */}
            <div className="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 space-y-1">
                <button className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-slate-50 rounded-xl transition-colors font-medium text-sm">
                    <Settings size={18} /> Pengaturan Akun
                </button>
                <button 
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors font-medium text-sm"
                >
                    <LogOut size={18} /> Keluar Aplikasi
                </button>
            </div>
        </div>

        {/* KOLOM KANAN: Pencapaian (Badges) */}
        <div className="md:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                <h3 className="font-bold text-slate-800 border-b border-gray-100 pb-4 mb-4 flex items-center justify-between">
                    <span>Koleksi Lencana</span>
                    <span className="text-xs font-normal text-slate-400 bg-slate-100 px-2 py-1 rounded-full">3 Terkumpul</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {badges.map((badge) => (
                        <div key={badge.id} className="flex items-center gap-4 p-4 rounded-xl border border-gray-100 hover:border-blue-200 hover:bg-blue-50 transition-all group">
                            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${badge.color} shadow-sm group-hover:scale-110 transition-transform`}>
                                {badge.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-slate-800 text-sm group-hover:text-blue-600">{badge.name}</h4>
                                <p className="text-xs text-slate-500">{badge.desc}</p>
                            </div>
                        </div>
                    ))}

                    {/* Slot Kosong (Gamification: Bikin penasaran) */}
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-dashed border-gray-200 opacity-60">
                        <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-100 text-gray-400">
                            ?
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-400 text-sm">Lencana Misterius</h4>
                            <p className="text-xs text-gray-400">Terus belajar untuk membuka!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>

    </div>
  );
}