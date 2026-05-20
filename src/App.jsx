import { useState } from 'react';
import { initialUsers, initialProducts } from './data/mockData';

// Mengimpor Komponen
import Toast from './components/Toast';
import Modal from './components/Modal';
import TopBar from './components/TopBar';
import Sidebar from './components/Sidebar';
import MobileNav from './components/MobileNav';

// Mengimpor Halaman
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Inventory from './pages/Inventory';
import Employees from './pages/Employees';
import CashierPOS from './pages/CashierPOS';
import OnlineOrders from './pages/OnlineOrders';
import BuyerView from './pages/BuyerView';

const App = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [isBuyerMode, setIsBuyerMode] = useState(false);
    const [activeMenu, setActiveMenu] = useState('dashboard');
    
    const [users, setUsers] = useState(initialUsers);
    const [products, setProducts] = useState(initialProducts);
    const [orders, setOrders] = useState([]);
    
    const [toast, setToast] = useState(null);
    const [showTutorial, setShowTutorial] = useState(false);

    const showToast = (message, type = 'info') => setToast({ message, type });

    const handleLogin = (username, password) => {
        const user = users.find(u => u.username === username);
        if (user && user.active) {
            setCurrentUser(user);
            setActiveMenu(user.role === 'cashier' ? 'pos' : 'dashboard');
            showToast(`Selamat datang, ${user.name}`, 'success');
        } else if (user && !user.active) {
            showToast('Akun Anda dinonaktifkan', 'error');
        } else {
            showToast('Username atau password salah', 'error');
        }
    };

    const handleLogout = () => {
        setCurrentUser(null);
        setActiveMenu('dashboard');
    };

    const handlePlaceOrder = (cart, total, paymentMethod, type) => {
        const newOrder = {
            id: Math.floor(Math.random() * 10000),
            items: cart,
            total,
            paymentMethod,
            type,
            status: type === 'direct' ? 'paid' : 'pending',
            timestamp: new Date().toISOString()
        };
        setOrders([newOrder, ...orders]);
        
        if(type === 'direct') {
            showToast('Transaksi Berhasil Disimpan', 'success');
        } else {
            setTimeout(() => {
                showToast('Ada Pesanan Online Baru!', 'info');
            }, 1000);
        }
    };

    const updateOrderStatus = (id, status) => {
        setOrders(orders.map(o => o.id === id ? { ...o, status } : o));
    };

    const renderContent = () => {
        switch (activeMenu) {
            case 'dashboard': return <Dashboard orders={orders} />;
            case 'inventory': return <Inventory products={products} setProducts={setProducts} showToast={showToast} userRole={currentUser?.role} />;
            case 'employees': return <Employees users={users} setUsers={setUsers} showToast={showToast} />;
            case 'pos': return <CashierPOS products={products} onCheckout={handlePlaceOrder} />;
            case 'online-orders': return <OnlineOrders orders={orders} updateOrderStatus={updateOrderStatus} showToast={showToast} />;
            case 'reports': 
            case 'history':
                return (
                    <div className="p-6">
                        <h2 className="text-2xl font-bold text-slate-800 mb-6">Riwayat Transaksi</h2>
                        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-3">
                            {orders.length === 0 ? <p className="text-slate-500 text-center py-8">Belum ada transaksi</p> : 
                             orders.map(o => (
                                <div key={o.id} className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0">
                                    <div>
                                        <p className="font-bold text-slate-800">#{o.id} <span className={`text-xs px-2 py-0.5 rounded ml-2 ${o.status==='paid'?'bg-emerald-100 text-emerald-700':'bg-amber-100 text-amber-700'}`}>{o.status}</span></p>
                                        <p className="text-sm text-slate-500">{new Date(o.timestamp).toLocaleString()}</p>
                                    </div>
                                    <p className="font-bold text-indigo-600">Rp {o.total.toLocaleString('id-ID')}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            default: return <div className="p-6 text-slate-500">Fitur sedang dalam pengembangan.</div>;
        }
    };

    if (isBuyerMode) {
        return <BuyerView products={products} onPlaceOrder={handlePlaceOrder} onExit={() => setIsBuyerMode(false)} />;
    }

    if (!currentUser) {
        return <Login onLogin={handleLogin} onSimulateBuyer={() => setIsBuyerMode(true)} />;
    }

    return (
        <div className="flex bg-slate-50 min-h-screen">
            <Sidebar currentMenu={activeMenu} setMenu={setActiveMenu} role={currentUser.role} />
            
            <div className="flex-1 md:ml-64 flex flex-col h-screen overflow-hidden relative">
                <TopBar user={currentUser} onLogout={handleLogout} />
                
                <main className="flex-1 overflow-y-auto pb-20 md:pb-0 relative">
                    {renderContent()}
                    
                    <button onClick={() => setShowTutorial(true)} className="fixed bottom-24 md:bottom-8 right-4 md:right-8 w-12 h-12 bg-indigo-600 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-indigo-700 transition animate-pulse z-40">
                        <i className="fas fa-question text-xl"></i>
                    </button>
                </main>

                <MobileNav currentMenu={activeMenu} setMenu={setActiveMenu} role={currentUser.role} />
            </div>

            {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
            
            <Modal isOpen={showTutorial} title="Panduan Penggunaan" onClose={() => setShowTutorial(false)}>
                <div className="space-y-4 text-slate-600">
                    <p><strong>Admin & Manajer:</strong> Gunakan menu navigasi untuk melihat laporan dan mengelola stok/karyawan.</p>
                    <p><strong>Kasir:</strong> Buka menu Kasir/POS untuk melayani pelanggan langsung, atau pantau tab Pesanan Online.</p>
                </div>
            </Modal>
        </div>
    );
};

export default App;
