import { useState } from 'react';

const Login = ({ onLogin, onSimulateBuyer }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl flex overflow-hidden flex-col md:flex-row">
                {/* Bagian Info (Kiri) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-slate-50 relative">
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://placehold.co/600x800/e2e8f0/64748b?text=POS+System')] opacity-10 bg-cover"></div>
                    <div className="relative z-10">
                        <h1 className="text-4xl font-extrabold text-indigo-600 mb-4"><i className="fas fa-store mr-2"></i>TokoKita</h1>
                        <p className="text-slate-600 text-lg mb-8">Sistem Manajemen Toko Terpadu. Kelola penjualan, karyawan, dan inventaris dalam satu tempat.</p>
                        
                        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-100">
                            <h4 className="font-bold text-slate-700 mb-2">Simulasi Cepat (Pilih Peran):</h4>
                            <div className="flex flex-wrap gap-2">
                                <button onClick={() => onLogin('admin', 'admin')} className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg text-sm font-semibold hover:bg-indigo-200">Admin</button>
                                <button onClick={() => onLogin('manajer', 'manajer')} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200">Manajer</button>
                                <button onClick={() => onLogin('kasir', 'kasir')} className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-200">Kasir</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bagian Form (Kanan) */}
                <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                    <h2 className="text-2xl font-bold text-slate-800 mb-6">Login Sistem</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Username</label>
                            <input type="text" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="Masukkan username" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                            <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all" placeholder="••••••••" />
                        </div>
                        <button onClick={() => onLogin(username, password)} className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 transition-all active:scale-95">Masuk</button>
                    </div>
                    
                    <div className="mt-8 pt-8 border-t border-slate-100">
                        <h3 className="text-center text-sm font-medium text-slate-500 mb-4">Akses Pembeli (Tanpa Login)</h3>
                        <button onClick={onSimulateBuyer} className="w-full py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-xl shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2 active:scale-95">
                            <i className="fas fa-qrcode"></i> Scan QR / Beli Sekarang
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
