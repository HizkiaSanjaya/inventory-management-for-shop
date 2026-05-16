"use client";

export default function Header({ title }) {
  const isStockPage = title === "Stok Masuk" || title === "Stok Keluar";

  return (
    <header className="w-full bg-white border-b border-[#F3F4F6] px-6 flex justify-between items-center h-[84.67px] z-20">
      <div className="hidden md:block">
        <h2 className="text-[20px] font-bold text-[#1F2937] font-['Segoe_UI']">{title}</h2>
      </div>

      {/* TAMPILAN MOBILE: Nama Aplikasi Baru */}
      <div className="flex md:hidden items-center gap-2">
        {!isStockPage ? (
          <>
            <div className="w-7 h-7 bg-[#212C3E] rounded flex items-center justify-center text-white p-1 shrink-0">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L7 5v4l5 3 5-3V5l-5-3zm-6 9l-5 3v4l5 3 5-3v-4l-5-3zm12 0l-5 3v4l5 3 5-3v-4l-5-3z"/>
              </svg>
            </div>
            <span className="font-bold text-xs text-[#212C3E] font-['Segoe_UI'] tracking-tight">
              Inventory Management for Shop
            </span>
          </>
        ) : (
          <span className="font-bold text-base text-[#1F2937] font-['Segoe_UI']">{title}</span>
        )}
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex flex-col text-right">
          <span className="text-sm font-bold text-[#1F2937] font-['Segoe_UI']">Sandika</span>
          <span className="text-xs text-[#6B7280] font-['Segoe_UI']">Admin</span>
        </div>
        <div className="w-10 h-10 rounded-full border border-[#E5E7EB] bg-[#F3F4F6] flex items-center justify-center shadow-sm">
          <span className="text-[16px] font-bold text-[#212C3E] font-['Segoe_UI']">BO</span>
        </div>
      </div>
    </header>
  );
}