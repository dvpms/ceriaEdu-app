'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, BookOpen, Trophy, Gamepad2, User, FlaskConical } from 'lucide-react';
import {useSelector} from 'react-redux';

export default function StudentNavigation() {
  const pathname = usePathname();
  const {user} = useSelector((state) => state.auth);

  const navItems = [
    { name: 'Home', href: '/dashboard', icon: <Home size={24} /> },
    { name: 'Kuis', href: '/kuis', icon: <FlaskConical size={24} /> },
    { name: 'Materi', href: '/materi', icon: <BookOpen size={24} /> },
    // { name: 'Games', href: '/games', icon: <Gamepad2 size={24} /> },
    { name: 'Peringkat', href: '/leaderboard', icon: <Trophy size={24} /> },
    { name: 'Profile', href: '/profile', icon: <User size={24} /> },
    // Profile bisa ditambahkan nanti
  ];

  // Helper untuk mengecek link aktif
  const isActive = (path) => pathname === path;

  return (
    <>
      {/* --- DESKTOP NAVIGATION (Top Bar) --- */}
      {/* Hidden di Mobile (md:hidden), Tampil di Layar Sedang ke atas (md:flex) */}
      <nav className="hidden md:flex fixed top-0 w-full bg-white border-b border-gray-200 z-50 h-16 items-center justify-between px-8 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">C</div>
          <span className="text-xl font-bold text-blue-600">CeriaEdu</span>
        </div>

        <div className="flex gap-8">
          {navItems.map((item) => (
            <Link 
              key={item.href} 
              href={item.href}
              className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                isActive(item.href) ? 'text-blue-600' : 'text-gray-500 hover:text-blue-400'
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Halo, {user.name}!</span>
            <div className="w-8 h-8 rounded-full bg-gray-200 border border-gray-300"></div>
        </div>
      </nav>

      {/* --- MOBILE NAVIGATION (Bottom Bar) --- */}
      {/* Tampil di Mobile, Hidden di Layar Sedang ke atas (md:hidden) */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-gray-200 z-50 h-16 flex justify-around items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        {navItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
              isActive(item.href) ? 'text-blue-600' : 'text-gray-400'
            }`}
          >
            {/* Clone element agar bisa ubah ukuran icon jika perlu */}
            {item.icon} 
            <span className="text-[10px] font-medium">{item.name}</span>
          </Link>
        ))}
      </nav>
    </>
  );
}