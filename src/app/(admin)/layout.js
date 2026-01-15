import AdminSidebar from "@/components/layouts/AdminSidebar";


export default function AdminLayout({ children }) {
  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar Fixed */}
      <AdminSidebar />

      {/* Konten Utama */}
      <main className="flex-1 ml-64 p-8">
        {children}
      </main>
    </div>
  );
}