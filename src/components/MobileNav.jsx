const MobileNav = ({ currentMenu, setMenu, role }) => {
    const menuItems = {
        admin: [{ id: 'dashboard', icon: 'fa-chart-pie' }, { id: 'inventory', icon: 'fa-box' }, { id: 'employees', icon: 'fa-users' }, { id: 'reports', icon: 'fa-file-invoice-dollar' }],
        cashier: [{ id: 'pos', icon: 'fa-calculator' }, { id: 'online-orders', icon: 'fa-mobile-alt' }, { id: 'history', icon: 'fa-history' }]
    };
    const items = menuItems[role] || menuItems.admin;

    return (
        <div className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-slate-200 flex justify-around p-2 pb-safe z-40">
            {items.map(item => (
                <button key={item.id} onClick={() => setMenu(item.id)} className={`flex flex-col items-center p-2 rounded-xl w-16 ${currentMenu === item.id ? 'text-indigo-600 bg-indigo-50' : 'text-slate-400'}`}>
                    <i className={`fas ${item.icon} text-xl mb-1`}></i>
                </button>
            ))}
        </div>
    );
};

export default MobileNav;