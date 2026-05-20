import { useState } from 'react';

const BuyerView = ({ products, onPlaceOrder, onExit }) => {
    const [cart, setCart] = useState([]);
    const [view, setView] = useState('menu');
    const [paymentMethod, setPaymentMethod] = useState('');

    const addToCart = (product) => {
        const existing = cart.find(item => item.id === product.id);
        if (existing) {
            setCart(cart.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item));
        } else {
            setCart([...cart, { ...product, qty: 1 }]);
        }
    };

    const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);

    const confirmPayment = () => {
        onPlaceOrder(cart, total, paymentMethod, 'online');
        setView('success');
    };

    if (view === 'success') {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center text-5xl mb-6 shadow-lg shadow-emerald-100">
                    <i className="fas fa-check"></i>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Pesanan Diterima!</h2>
                <p className="text-slate-600 mb-8 max-w-xs">
                    {paymentMethod === 'cash' ? 'Silakan menuju kasir untuk melakukan pembayaran tunai.' : 'Pembayaran QRIS sedang diverifikasi oleh sistem.'}
                </p>
                <button onClick={onExit} className="px-8 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-200">Selesai</button>
            </div>
        );
    }

    if (view === 'payment') {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col">
                <div className="p-4 bg-white border-b flex items-center gap-4 sticky top-0 z-10">
                    <button onClick={() => setView('cart')} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center"><i className="fas fa-arrow-left"></i></button>
                    <h2 className="font-bold text-lg">Pilih Pembayaran</h2>
                </div>
                <div className="p-6 flex-1 max-w-md mx-auto w-full">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 mb-6">
                        <p className="text-sm text-slate-500 mb-1">Total Tagihan</p>
                        <p className="text-3xl font-bold text-indigo-600">Rp {total.toLocaleString('id-ID')}</p>
                    </div>
                    
                    <h3 className="font-bold text-slate-800 mb-4">Metode Pembayaran</h3>
                    <div className="space-y-3 mb-8">
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'qris' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' : 'bg-white hover:bg-slate-50'}`}>
                            <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('qris')} />
                            <i className="fas fa-qrcode text-2xl text-blue-500 mr-4"></i>
                            <div className="flex-1">
                                <h4 className="font-bold">QRIS</h4>
                                <p className="text-xs text-slate-500">Gopay, OVO, Dana, M-Banking</p>
                            </div>
                            {paymentMethod === 'qris' && <i className="fas fa-check-circle text-indigo-500 text-xl"></i>}
                        </label>
                        <label className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${paymentMethod === 'cash' ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200' : 'bg-white hover:bg-slate-50'}`}>
                            <input type="radio" name="payment" className="hidden" onChange={() => setPaymentMethod('cash')} />
                            <i className="fas fa-money-bill-wave text-2xl text-emerald-500 mr-4"></i>
                            <div className="flex-1">
                                <h4 className="font-bold">Tunai di Kasir</h4>
                                <p className="text-xs text-slate-500">Bayar langsung ke staf kami</p>
                            </div>
                            {paymentMethod === 'cash' && <i className="fas fa-check-circle text-indigo-500 text-xl"></i>}
                        </label>
                    </div>

                    <button onClick={confirmPayment} disabled={!paymentMethod} className="w-full py-4 bg-indigo-600 text-white font-bold rounded-xl shadow-lg shadow-indigo-200 disabled:opacity-50 mt-auto">
                        Konfirmasi & Pesan Sekarang
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50 pb-24">
            <div className="bg-indigo-600 p-6 rounded-b-3xl text-white shadow-md sticky top-0 z-10">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold mb-1">Menu TokoKita</h1>
                        <p className="text-indigo-200 text-sm">Pesan langsung dari meja Anda</p>
                    </div>
                    <button onClick={onExit} className="text-indigo-200 hover:text-white"><i className="fas fa-times text-xl"></i></button>
                </div>
            </div>

            <div className="p-4 max-w-md mx-auto space-y-4 mt-2">
                {products.map(p => (
                    <div key={p.id} className="bg-white p-4 rounded-2xl shadow-sm flex items-center gap-4">
                        <div className="w-20 h-20 bg-slate-100 rounded-xl flex items-center justify-center text-3xl text-slate-300 shrink-0">
                            <i className={`fas ${p.category==='Minuman'?'fa-coffee': p.category==='Makanan'?'fa-hamburger':'fa-cookie'}`}></i>
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-slate-800">{p.name}</h3>
                            <p className="text-indigo-600 font-bold mt-1">Rp {p.price.toLocaleString('id-ID')}</p>
                        </div>
                        <button onClick={() => addToCart(p)} className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-full flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-colors">
                            <i className="fas fa-plus"></i>
                        </button>
                    </div>
                ))}
            </div>

            {cart.length > 0 && (
                <div className="fixed bottom-0 left-0 w-full p-4 bg-white border-t border-slate-200 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] z-20">
                    <div className="max-w-md mx-auto flex justify-between items-center">
                        <div>
                            <p className="text-xs text-slate-500 mb-1">{cart.reduce((a,b)=>a+b.qty,0)} Item di Keranjang</p>
                            <p className="font-bold text-lg text-slate-800">Rp {total.toLocaleString('id-ID')}</p>
                        </div>
                        <button onClick={() => setView('payment')} className="px-6 py-3 bg-indigo-600 text-white font-bold rounded-xl shadow-md flex items-center gap-2">
                            Checkout <i className="fas fa-arrow-right"></i>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BuyerView;
