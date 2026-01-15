import Link from 'next/link';
import { LayoutDashboard, BookOpen, Users, LogOut } from 'lucide-react';

export default function AdminSidebar() {
  const menuItems = [
    { name: 'Dashboard', icon: <LayoutDashboard size={20} />, href: '/admin/dashboard' },
    { name: 'Kelola Materi', icon: <BookOpen size={20} />, href: '/admin/materi' },
    { name: 'Monitoring Siswa', icon: <Users size={20} />, href: '/admin/siswa' },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-white min-h-screen fixed left-0 top-0 p-4">
      <div className="mb-8 px-2">
        <h1 className="text-2xl font-bold text-blue-400">CeriaEdu <span className="text-xs text-gray-400">Admin</span></h1>
      </div>
      
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link 
            key={item.href} 
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors"
          >
            {item.icon}
            <span>{item.name}</span>
          </Link>
        ))}
        
        <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-900/20 rounded-lg mt-8 transition-colors">
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </aside>
  );
}