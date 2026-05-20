const Dashboard = ({ orders }) => {
    const totalRevenue = orders.filter(o => o.status === 'paid').reduce((sum, o) => sum + o.total, 0);
    const totalOrders = orders.filter(o => o.status === 'paid').length;
    
    return (
        <div className="p-6 space-y-6">
            <h2 className="text-2xl font-bold text-slate-800">Ringkasan Hari Ini</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-2xl"><i className="fas fa-wallet"></i></div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Pendapatan</p>
                        <p className="text-2xl font-bold text-slate-800">Rp {totalRevenue.toLocaleString('id-ID')}</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center text-2xl"><i className="fas fa-shopping-bag"></i></div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Pesanan Selesai</p>
                        <p className="text-2xl font-bold text-slate-800">{totalOrders} Transaksi</p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
                    <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center text-2xl"><i className="fas fa-users"></i></div>
                    <div>
                        <p className="text-sm text-slate-500 font-medium">Pengunjung (Est)</p>
                        <p className="text-2xl font-bold text-slate-800">{totalOrders > 0 ? totalOrders * 2 : 0} Orang</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;