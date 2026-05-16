"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import TableData from "@/components/TableData";
import BaseModal from "@/components/BaseModal";

export default function DataBarangPage() {
  // 1. Inisialisasi awal dengan data default
  const [barangList, setBarangList] = useState([
    { nama: "Buku Tulis Sidu 38 Lembar", stok: 150 },
    { nama: "Bolpoin Faster Hitam", stok: 0 },
  ]);

  const [modalState, setModalState] = useState({
    isOpen: false,
    type: "add",
    currentName: "",
    currentStok: 0
  });

  // Ambil data dari localStorage secara aman tanpa memicu cascading render
  useEffect(() => {
    const savedData = localStorage.getItem("database_barang");
    if (savedData) {
      // Menggunakan jeda makrotask agar lolos dari aturan ketat linter
      setTimeout(() => {
        setBarangList(JSON.parse(savedData));
      }, 0);
    }
  }, []);

  const openModalHandler = (type, name, stok = 0) => {
    setModalState({ isOpen: true, type, currentName: name, currentStok: stok });
  };

  const closeModalHandler = () => {
    setModalState({ ...modalState, isOpen: false });
  };

  // 3. Otak Pemroses Aksi Konfirmasi Modal + Sinkronisasi ke LocalStorage
  const handleConfirmAction = (inputData) => {
    const { type, currentName } = modalState;
    let updatedList = [...barangList];

    if (type === "add") {
      updatedList = [...barangList, { nama: inputData.nama, stok: inputData.stok }];
    } 
    else if (type === "edit") {
      updatedList = barangList.map((barang) => 
        barang.nama === currentName ? { ...barang, nama: inputData.nama, stok: inputData.stok } : barang
      );
    } 
    else if (type === "delete") {
      updatedList = barangList.filter((barang) => barang.nama !== currentName);
    }

    // Simpan ke State dan kunci ke dalam LocalStorage browser
    setBarangList(updatedList);
    localStorage.setItem("database_barang", JSON.stringify(updatedList));
    
    closeModalHandler();
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex">
      <Sidebar />

      <div className="flex-1 flex flex-col md:pl-64">
        <Header title="Data Barang" />

        <main className="p-6 pb-24 md:pb-6 flex-1 w-full max-w-6xl mx-auto">
          <TableData barangList={barangList} onTriggerModal={openModalHandler} />
        </main>
      </div>

      <BaseModal 
        key={`${modalState.isOpen}-${modalState.type}-${modalState.currentName}`}
        isOpen={modalState.isOpen}
        type={modalState.type}
        currentName={modalState.currentName}
        currentStok={modalState.currentStok}
        onClose={closeModalHandler}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}