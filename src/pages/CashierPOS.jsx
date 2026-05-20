import { useState } from 'react';

const CashierPOS = ({ products, onCheckout }) => {
    const [cart, setCart] = useState([]);
    const [filter, setFilter] = useState('Semua');

    const categories = ['Semua', ...new Set(products.map(p => p.category))];
    const displayedProducts = filter === 'Semua' ? products : products.filter(p => p.category === filter);

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    const updateQty = (id, delta) => {
        setCart(cart.map(item => {
            if (item.id === id) {
                const newQty = item.qty + delta;
                return newQty > 0 ? { ...item, qty: newQty } : null;
            }
            return item;
        }).filter(Boolean));
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const handlePay = (method) => {
        if(cart.length === 0) return;
        onCheckout(cart, total, method, 'direct');
        setCart([]);
    };

    return (
        <div className="flex flex-col md:flex-row h-[calc(100vh-4rem)] md:h-screen">
            <div className="flex-1 bg-slate-50 overflow-y-auto p-4 md:p-6 pb-24 md:pb-6">
                <div className="flex gap-2 mb-6 overflow-x-auto no-scrollbar pb-2">
                    {categories.map(c => (
                        <button key={c} onClick={() => setFilter(c)} className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-medium transition-colors ${filter === c ? 'bg-indigo-600 text-white shadow-md' : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'}`}>
                            {c}
                        </button>
                    ))}
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {displayedProducts.map(p => (
                        <div key={p.id} onClick={() => addToCart(p)} className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 cursor-pointer hover:shadow-md hover:border-indigo-300 transition-all active:scale-95 flex flex-col justify-between">
                            <div className="h-24 bg-slate-100 rounded-xl mb-3 flex items-center justify-center text-slate-300 text-4xl">
                                <i className={`fas ${p.category==='Minuman'?'fa-coffee': p.category==='Makanan'?'fa-hamburger':'fa-cookie'}`}></i>
                            </div>
                            <h3 className="font-bold text-slate-800 text-sm leading-tight mb-1">{p.name}</h3>
                            <p className="text-indigo-600 font-bold">Rp {p.price.toLocaleString('id-ID')}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="w-full md:w-96 bg-white border-t md:border-l border-slate-200 flex flex-col fixed bottom-0 md:relative h-[60vh] md:h-full z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] md:shadow-none rounded-t-3xl md:rounded-none">
                <div className="p-4 border-b flex justify-between items-center bg-white rounded-t-3xl md:rounded-none">
                    <h2 className="font-bold text-lg">Pesanan Saat Ini</h2>
                    <span className="bg-indigo-100 text-indigo-700 px-2 py-1 rounded-lg text-sm font-bold">{cart.length} Item</span>
                </div>
                
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {cart.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-slate-400">
                            <i className="fas fa-shopping-basket text-4xl mb-2"></i>
                            <p>Belum ada pesanan</p>
                        </div>
                    ) : cart.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div className="flex-1">
                                <h4 className="font-medium text-sm">{item.name}</h4>
                                <p className="text-indigo-600 text-sm font-bold">Rp {(item.price * item.qty).toLocaleString('id-ID')}</p>
                            </div>
                            <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-1">
                                <button onClick={() => updateQty(item.id, -1)} className="w-6 h-6 rounded-md bg-white text-slate-600 shadow-sm flex items-center justify-center"><i className="fas fa-minus text-xs"></i></button>
                                <span className="text-sm font-bold w-4 text-center">{item.qty}</span>
                                <button onClick={() => updateQty(item.id, 1)} className="w-6 h-6 rounded-md bg-indigo-500 text-white shadow-sm flex items-center justify-center"><i className="fas fa-plus text-xs"></i></button>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="p-4 bg-slate-50 border-t mt-auto">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-slate-500 font-medium">Total Tagihan</span>
                        <span className="text-2xl font-bold text-slate-800">Rp {total.toLocaleString('id-ID')}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        <button onClick={() => handlePay('cash')} disabled={cart.length===0} className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                            <i className="fas fa-money-bill-wave"></i> Tunai
                        </button>
                        <button onClick={() => handlePay('qris')} disabled={cart.length===0} className="w-full py-3 bg-blue-500 text-white font-bold rounded-xl active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2">
                            <i className="fas fa-qrcode"></i> QRIS
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CashierPOS;
