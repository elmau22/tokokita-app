const Employees = ({ users, setUsers, showToast }) => {
    const toggleStatus = (id) => {
        setUsers(users.map(u => u.id === id ? { ...u, active: !u.active } : u));
        showToast('Status karyawan diperbarui', 'success');
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Manajemen Karyawan</h2>
                <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700"><i className="fas fa-plus mr-2"></i>Tambah Staf</button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {users.filter(u => u.role !== 'admin' || u.id === 1).map(u => (
                    <div key={u.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center text-center">
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl font-bold text-white mb-4 ${u.role === 'admin' ? 'bg-indigo-500' : u.role === 'manager' ? 'bg-blue-500' : 'bg-emerald-500'}`}>
                            {u.name.charAt(0)}
                        </div>
                        <h3 className="font-bold text-lg text-slate-800">{u.name}</h3>
                        <p className="text-sm text-slate-500 capitalize mb-4">{u.role}</p>
                        
                        <div className="w-full mt-auto border-t pt-4 flex justify-between items-center">
                            <span className={`text-xs font-bold px-2 py-1 rounded-md ${u.active ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                                {u.active ? 'Aktif' : 'Non-Aktif'}
                            </span>
                            {u.role !== 'admin' && (
                                <button onClick={() => toggleStatus(u.id)} className="text-sm text-indigo-600 font-medium hover:underline">Ubah Status</button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Employees;
