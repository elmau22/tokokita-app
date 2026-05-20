import { useState } from 'react';
import Modal from '../components/Modal';

const Inventory = ({ products, setProducts, showToast, userRole }) => {
    const [showHPPModal, setShowHPPModal] = useState(false);
    const [calcData, setCalcData] = useState({ bahan: '', tenaga: '', overhead: '' });
    const [hppResult, setHppResult] = useState(0);

    const calculateHPP = () => {
        const total = (Number(calcData.bahan) || 0) + (Number(calcData.tenaga) || 0) + (Number(calcData.overhead) || 0);
        setHppResult(total);
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Inventaris & Stok</h2>
                {userRole === 'admin' && (
                    <div className="flex gap-2">
                        <button onClick={() => setShowHPPModal(true)} className="px-4 py-2 bg-amber-100 text-amber-700 rounded-lg font-medium hover:bg-amber-200 transition">
                            <i className="fas fa-calculator mr-2"></i>Kalkulator HPP
                        </button>
                        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition">
                            <i className="fas fa-plus mr-2"></i>Tambah Produk
                        </button>
                    </div>
                )}
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 text-slate-500 text-sm border-b">
                                <th className="p-4 font-medium">Nama Produk</th>
                                <th className="p-4 font-medium">Kategori</th>
                                <th className="p-4 font-medium">Stok</th>
                                <th className="p-4 font-medium">HPP (Modal)</th>
                                <th className="p-4 font-medium">Harga Jual</th>
                                <th className="p-4 font-medium">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(p => (
                                <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50/50">
                                    <td className="p-4 font-medium text-slate-800">{p.name}</td>
                                    <td className="p-4">
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs rounded-full">{p.category}</span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`font-bold ${p.stock < 10 ? 'text-red-500' : 'text-emerald-600'}`}>{p.stock}</span>
                                    </td>
                                    <td className="p-4 text-slate-500">Rp {p.hpp.toLocaleString('id-ID')}</td>
                                    <td className="p-4 font-bold text-indigo-600">Rp {p.price.toLocaleString('id-ID')}</td>
                                    <td className="p-4">
                                        <button className="text-slate-400 hover:text-indigo-600 mr-3"><i className="fas fa-edit"></i></button>
                                        <button className="text-slate-400 hover:text-red-600"><i className="fas fa-trash"></i></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <Modal isOpen={showHPPModal} title="Kalkulator HPP" onClose={() => setShowHPPModal(false)}>
                <div className="space-y-4">
                    <p className="text-sm text-slate-500 mb-4">Hitung modal dasar untuk menentukan harga jual yang tepat.</p>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Total Biaya Bahan Baku (Rp)</label>
                        <input type="number" value={calcData.bahan} onChange={e => setCalcData({...calcData, bahan: e.target.value})} className="w-full border rounded-lg p-2" placeholder="Cth: 150000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Biaya Tenaga Kerja (Rp)</label>
                        <input type="number" value={calcData.tenaga} onChange={e => setCalcData({...calcData, tenaga: e.target.value})} className="w-full border rounded-lg p-2" placeholder="Cth: 50000" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">Biaya Overhead (Rp)</label>
                        <input type="number" value={calcData.overhead} onChange={e => setCalcData({...calcData, overhead: e.target.value})} className="w-full border rounded-lg p-2" placeholder="Cth: 20000" />
                    </div>
                    <button onClick={calculateHPP} className="w-full bg-indigo-600 text-white p-2 rounded-lg font-bold mt-2 hover:bg-indigo-700">Hitung Total HPP</button>
                    
                    {hppResult > 0 && (
                        <div className="mt-4 p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center">
                            <p className="text-sm text-emerald-600 font-medium mb-1">Total HPP Produksi</p>
                            <p className="text-2xl font-bold text-emerald-700">Rp {hppResult.toLocaleString('id-ID')}</p>
                            <p className="text-xs text-emerald-600 mt-2">*Bagi dengan jumlah porsi/unit yang dihasilkan untuk mendapat HPP per unit.</p>
                        </div>
                    )}
                </div>
            </Modal>
        </div>
    );
};

export default Inventory;
