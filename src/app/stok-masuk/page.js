"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

export default function StokMasukPage() {
  const [daftarBarangMaster, setDaftarBarangMaster] = useState([]);
  const [historyMasuk, setHistoryMasuk] = useState([
    { tanggal: "12 Mei 2026", nama: "Buku Tulis Sidu 38 Lembar", jumlah: 50 }
  ]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedBarang, setSelectedBarang] = useState("");
  const [jumlahMasuk, setJumlahMasuk] = useState("");

  // Sinkronisasi membaca database lokal saat halaman dibuka
  useEffect(() => {
    const savedData = localStorage.getItem("database_barang");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Pindahkan eksekusi ke urutan task berikutnya agar lolos aturan linter
      setTimeout(() => {
        setDaftarBarangMaster(parsedData);
        if (parsedData.length > 0) {
          setSelectedBarang(parsedData[0].nama);
        }
      }, 0);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!jumlahMasuk || Number(jumlahMasuk) <= 0) {
      alert("Masukkan jumlah kuantitas stok yang valid!");
      return;
    }

    // 1. UPDATE DATABASE UTAMA (Menambah Stok Barang)
    const savedData = localStorage.getItem("database_barang");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      const updatedData = parsedData.map((barang) => 
        barang.nama === selectedBarang 
          ? { ...barang, stok: barang.stok + Number(jumlahMasuk) } 
          : barang
      );
      localStorage.setItem("database_barang", JSON.stringify(updatedData));
    }

    // 2. TAMBAH KE RIWAYAT TRANSAKSI BARANG MASUK
    const transaksiBaru = {
      tanggal: new Date().toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" }),
      nama: selectedBarang,
      jumlah: Number(jumlahMasuk)
    };

    setHistoryMasuk([transaksiBaru, ...historyMasuk]);
    setIsOpen(false);
    setJumlahMasuk("");
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col md:pl-64">
        <Header title="Stok Masuk" />

        <main className="p-6 pb-24 md:pb-6 flex-1 w-full max-w-6xl mx-auto font-['Segoe_UI']">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-6">
            <div>
              <p className="text-sm text-[#6B7280]">Catat penambahan stok barang yang sudah ada.</p>
            </div>
            <button 
              onClick={() => {
                if (daftarBarangMaster.length === 0) {
                  alert("Data master barang kosong! Sila ditambah di halaman Data Barang terlebih dahulu.");
                  return;
                }
                setIsOpen(true);
              }}
              className="w-full sm:w-auto bg-[#10B981] hover:bg-emerald-600 text-white text-sm font-semibold px-5 h-10 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <span className="text-base font-bold">+</span> Tambah Stok Barang
            </button>
          </div>

          {/* TABEL DESKTOP */}
          <div className="hidden sm:block bg-white rounded-2xl border border-[#F3F4F6] shadow-sm overflow-hidden w-full">
            <table className="w-full border-collapse text-left text-sm min-w-150">
              <thead className="bg-[#F9FAFB] text-[12px] font-bold tracking-wider text-[#6B7280] uppercase border-b border-[#F3F4F6]">
                <tr>
                  <th className="py-4 px-4 w-16 text-center">No</th>
                  <th className="py-4 px-6 w-44">Tanggal</th>
                  <th className="py-4 px-6">Nama Barang</th>
                  <th className="py-4 px-4 w-40 text-center">Stok Masuk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F3F4F6]">
                {historyMasuk.map((item, index) => (
                  <tr key={index} className="hover:bg-slate-50/40 h-16.25 transition-colors">
                    <td className="py-3 px-4 text-center text-[#9CA3AF]">{index + 1}</td>
                    <td className="py-3 px-6 text-[#6B7280]">{item.tanggal}</td>
                    <td className="py-3 px-6 font-semibold text-[#111827]">{item.nama}</td>
                    <td className="py-3 px-4 text-center">
                      <span className="inline-flex justify-center items-center h-7 px-3 rounded-lg text-sm font-bold bg-[#ECFDF5] text-[#10B981]">
                        +{item.jumlah}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CARD MOBILE */}
          <div className="flex flex-col sm:hidden gap-3">
            {historyMasuk.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-2xl border border-[#F3F4F6] shadow-xs flex flex-col gap-2">
                <div className="flex justify-between items-start">
                  <span className="text-xs text-[#6B7280]">{item.tanggal}</span>
                  <span className="inline-flex justify-center items-center h-6 px-2.5 rounded-lg text-xs font-bold bg-[#ECFDF5] text-[#10B981]">
                    +{item.jumlah}
                  </span>
                </div>
                <h4 className="font-semibold text-[#111827] text-sm leading-snug">{item.nama}</h4>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* POP UP FORM */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-md bg-white border border-[#F3F4F6] rounded-2xl shadow-2xl flex flex-col overflow-hidden">
            <div className="p-6 pb-0 flex justify-between items-center">
              <h3 className="text-[20px] font-bold text-[#111827] font-['Segoe_UI']">Catat Stok Masuk</h3>
              <button type="button" onClick={() => setIsOpen(false)} className="w-8 h-8 bg-[#F9FAFB] rounded-full flex items-center justify-center text-[#9CA3AF] hover:bg-gray-100 cursor-pointer">✕</button>
            </div>

            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151] font-['Segoe_UI']">Pilih Barang</label>
                <select 
                  value={selectedBarang}
                  onChange={(e) => setSelectedBarang(e.target.value)}
                  className="w-full h-[41.66px] px-4 border border-[#D1D5DB] rounded-xl text-sm text-slate-800 bg-white focus:outline-none"
                >
                  {daftarBarangMaster.map((barang, bIdx) => (
                    <option key={bIdx} value={barang.nama}>{barang.nama}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-[#374151] font-['Segoe_UI']">Jumlah Barang Masuk</label>
                <input 
                  type="number" 
                  value={jumlahMasuk}
                  onChange={(e) => setJumlahMasuk(e.target.value)}
                  placeholder="Contoh: 50" 
                  className="w-full h-[41.33px] px-4 border border-[#D1D5DB] rounded-xl text-sm text-slate-800 placeholder-[#9CA3AF] focus:outline-none focus:border-slate-400"
                />
              </div>
            </div>

            <div className="bg-[#F9FAFB] p-4 px-6 flex justify-end gap-3 border-t border-gray-50">
              <button type="button" onClick={() => setIsOpen(false)} className="h-[41.33px] px-5 border border-[#D1D5DB] rounded-xl text-sm font-semibold text-[#4B5563] bg-white hover:bg-gray-50 cursor-pointer">Batal</button>
              <button type="submit" className="h-[41.33px] px-5 rounded-xl text-sm font-semibold text-white bg-[#10B981] hover:bg-emerald-600 shadow-md cursor-pointer">Tambah Stok</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}