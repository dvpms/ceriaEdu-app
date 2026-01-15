import Link from 'next/link';
import { Book, Calculator, Globe, Microscope } from 'lucide-react';

export default function SubjectCard({ title, href, color }) {
  // Mapping ikon
  const getIcon = () => {
    // Ukuran Icon: Mobile 32px, Desktop 64px
    const iconClass = "text-white w-8 h-8 md:w-16 md:h-16"; 
    
    if (title.toLowerCase().includes('matematika')) return <Calculator className={iconClass} />;
    if (title.toLowerCase().includes('inggris')) return <Globe className={iconClass} />;
    if (title.toLowerCase().includes('ipa')) return <Microscope className={iconClass} />;
    return <Book className={iconClass} />;
  };

  return (
    <Link href={href} className="group flex flex-col items-center gap-2 md:gap-4 w-full">
      {/* KOTAK GAMBAR */}
      <div className={`w-full aspect-square rounded-2xl md:rounded-3xl ${color} shadow-md group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 flex items-center justify-center relative overflow-hidden`}>
        
        {/* Hiasan background (Opacity dikurangi biar ga ganggu) */}
        <div className="absolute top-0 right-0 w-16 h-16 md:w-32 md:h-32 bg-white/20 rounded-full -mr-8 -mt-8 md:-mr-10 md:-mt-10"></div>
        <div className="absolute bottom-0 left-0 w-12 h-12 md:w-24 md:h-24 bg-white/10 rounded-full -ml-4 -mb-4 md:-ml-5 md:-mb-5"></div>
        
        {/* Ikon di tengah */}
        <div className="z-10 drop-shadow-md transform group-hover:rotate-12 transition-transform duration-300">
            {getIcon()}
        </div>
      </div>

      {/* JUDUL MAPEL */}
      <div className="text-center w-full px-1">
        {/* Font: Mobile text-xs (kecil), Desktop text-xl (besar) */}
        <h3 className="text-xs md:text-xl font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase tracking-wider leading-tight">
          {title}
        </h3>
        {/* Garis bawah: Hidden di mobile biar ga semak, muncul di desktop */}
        <div className="hidden md:block h-1 w-12 bg-slate-300 mx-auto mt-2 rounded-full group-hover:bg-blue-600 group-hover:w-24 transition-all"></div>
      </div>
    </Link>
  );
}


// card2

// import Link from 'next/link';
// import { PlayCircle, FileText, Clock, ChevronRight } from 'lucide-react';

// export default function MateriCard({ id, title, category, type, duration, progress, image }) {
//   // Logic warna badge
//   const isVideo = type === 'Video';
//   const badgeColor = isVideo ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600';
//   const Icon = isVideo ? PlayCircle : FileText;

//   return (
//     <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col">
      
//       {/* Thumbnail Image */}
//       <div className="relative h-48 overflow-hidden bg-gray-100">
//         <img 
//           src={image} 
//           alt={title} 
//           className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
//         />
//         <div className="absolute top-3 left-3">
//             <span className={`px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 shadow-sm ${badgeColor}`}>
//                 <Icon size={12} /> {type}
//             </span>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="p-5 flex flex-col flex-1">
//         <div className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{category}</div>
        
//         <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2 group-hover:text-blue-600 transition-colors">
//           {title}
//         </h3>
        
//         <div className="flex items-center gap-2 text-gray-500 text-xs mb-4">
//           <Clock size={14} />
//           <span>{duration}</span>
//         </div>

//         {/* Progress Bar */}
//         <div className="mt-auto space-y-2">
//             <div className="flex justify-between text-xs font-medium">
//                 <span className="text-slate-500">Progress Belajar</span>
//                 <span className="text-slate-900">{progress}%</span>
//             </div>
//             <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
//                 <div 
//                     className="bg-blue-600 h-full rounded-full transition-all duration-500" 
//                     style={{ width: `${progress}%` }}
//                 ></div>
//             </div>

//             <Link 
//                 href={`/materi/${id}`} 
//                 className="w-full mt-4 flex items-center justify-center gap-2 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-semibold py-2.5 rounded-xl text-sm transition-colors border border-transparent hover:border-blue-200"
//             >
//                 Buka Materi <ChevronRight size={16} />
//             </Link>
//         </div>
//       </div>
//     </div>
//   );
// }