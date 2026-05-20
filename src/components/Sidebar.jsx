const Sidebar = ({ currentMenu, setMenu, role }) => {
    const menuItems = {
        admin: [
            { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
            { id: 'inventory', icon: 'fa-box', label: 'Inventaris & HPP' },
            { id: 'employees', icon: 'fa-users', label: 'Karyawan' },
            { id: 'reports', icon: 'fa-file-invoice-dollar', label: 'Laporan' },
            { id: 'complaints', icon: 'fa-comments', label: 'Aduan' },
        ],
        manager: [
            { id: 'dashboard', icon: 'fa-chart-pie', label: 'Dashboard' },
            { id: 'inventory', icon: 'fa-box', label: 'Stok Barang' },
            { id: 'reports', icon: 'fa-file-invoice-dollar', label: 'Laporan Penjualan' },
            { id: 'complaints', icon: 'fa-comments', label: 'Aduan' },
        ],
        cashier: [
            { id: 'pos', icon: 'fa-calculator', label: 'Kasir / POS' },
            { id: 'online-orders', icon: 'fa-mobile-alt', label: 'Pesanan Online' },
            { id: 'history', icon: 'fa-history', label: 'Riwayat Transaksi' },
            { id: 'help', icon: 'fa-headset', label: 'Bantuan CS' },
        ]
    };

    const items = menuItems[role] || [];

    return (
        <div className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col h-screen fixed left-0 top-0">
            <div className="h-16 flex items-center px-6 border-b border-slate-800 bg-slate-950">
                <i className="fas fa-store text-indigo-500 text-2xl mr-3"></i>
                <span className="text-white font-bold text-xl tracking-wide">TokoKita</span>
            </div>
            <div className="flex-1 overflow-y-auto py-4">
                {items.map(item => (
                    <button
                        key={item.id}
                        onClick={() => setMenu(item.id)}
                        className={`w-full flex items-center px-6 py-3 mb-1 transition-colors ${currentMenu === item.id ? 'bg-indigo-600 text-white border-l-4 border-indigo-400' : 'hover:bg-slate-800 hover:text-white border-l-4 border-transparent'}`}
                    >
                        <i className={`fas ${item.icon} w-6 text-center mr-3`}></i>
                        <span className="font-medium">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Sidebar;
