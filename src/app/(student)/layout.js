import StudentNavigation from '@/components/layouts/StudentNavigation';

export default function StudentLayout({ children }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <StudentNavigation />
      
      {/* RESPONSIVE PADDING:
         pt-4 pb-20 -> Mobile (Padding atas dikit, Bawah banyak biar ga ketutup nav bawah)
         md:pt-24 md:pb-8 -> Desktop (Padding atas banyak biar ga ketutup nav atas, Bawah normal)
      */}
      <main className="max-w-5xl mx-auto px-4 pt-4 pb-24 md:pt-24 md:pb-8">
        {children}
      </main>
    </div>
  );
}