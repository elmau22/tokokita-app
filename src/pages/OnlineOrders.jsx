import { useState } from 'react';
import Modal from '../components/Modal';

const OnlineOrders = ({ orders, updateOrderStatus, showToast }) => {
    const pendingOrders = orders.filter(o => o.type === 'online' && o.status === 'pending');
    const [selectedOrder, setSelectedOrder] = useState(null);

    const handleConfirm = (id) => {
        updateOrderStatus(id, 'paid');
        showToast('Pembayaran Dikonfirmasi!', 'success');
        setSelectedOrder(null);
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                Pesanan Online Masuk
                {pendingOrders.length > 0 && <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{pendingOrders.length}</span>}
            </h2>
            
            {pendingOrders.length === 0 ? (
                <div className="bg-white rounded-2xl p-12 text-center text-slate-400 border border-dashed border-slate-300">
                    <i className="fas fa-check-circle text-5xl mb-4 text-slate-200"></i>
                    <p className="text-lg">Tidak ada pesanan online yang tertunda.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pendingOrders.map(order => (
                        <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200 border-l-4 border-l-orange-500 relative overflow-hidden">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <span className="text-xs font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded-md mb-1 inline-block">Table / QR</span>
                                    <h3 className="font-bold text-slate-800 text-lg">Order #{order.id}</h3>
                                </div>
                                <span className="text-sm text-slate-500">{new Date(order.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">{order.items.length} item • Total: <span className="font-bold text-indigo-600">Rp {order.total.toLocaleString('id-ID')}</span></p>
                            <div className="flex gap-2">
                                <button onClick={() => setSelectedOrder(order)} className="flex-1 py-2 bg-slate-100 text-slate-700 font-medium rounded-lg hover:bg-slate-200 transition">Lihat Detail</button>
                                {order.paymentMethod === 'cash' && (
                                    <button onClick={() => handleConfirm(order.id)} className="flex-1 py-2 bg-emerald-500 text-white font-medium rounded-lg hover:bg-emerald-600 transition shadow-sm shadow-emerald-200">Terima Tunai</button>
                                )}
                                {order.paymentMethod === 'qris' && (
                                    <button disabled className="flex-1 py-2 bg-blue-100 text-blue-500 font-medium rounded-lg cursor-wait">Menunggu QRIS</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <Modal isOpen={!!selectedOrder} title={`Detail Order #${selectedOrder?.id}`} onClose={() => setSelectedOrder(null)}>
                {selectedOrder && (
                    <div>
                        <div className="space-y-3 mb-6">
                            {selectedOrder.items.map((item, idx) => (
                                <div key={idx} className="flex justify-between text-sm">
                                    <span>{item.qty}x {item.name}</span>
                                    <span className="font-medium">Rp {(item.price * item.qty).toLocaleString('id-ID')}</span>
                                </div>
                            ))}
                        </div>
                        <div className="border-t border-dashed pt-4 mb-6">
                            <div className="flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span className="text-indigo-600">Rp {selectedOrder.total.toLocaleString('id-ID')}</span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">Metode: {selectedOrder.paymentMethod.toUpperCase()}</p>
                        </div>
                        {selectedOrder.paymentMethod === 'cash' && (
                            <button onClick={() => handleConfirm(selectedOrder.id)} className="w-full py-3 bg-emerald-500 text-white font-bold rounded-xl">Konfirmasi Pembayaran Tunai & Cetak</button>
                        )}
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default OnlineOrders;
