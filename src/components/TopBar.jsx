const TopBar = ({ user, onLogout }) => (
    <div className="h-16 bg-white border-b border-slate-200 flex justify-between items-center px-6 sticky top-0 z-30">
        <div className="flex items-center gap-4 md:hidden">
            <i className="fas fa-bars text-xl text-slate-600"></i>
            <span className="font-bold text-indigo-600 text-lg">TokoKita</span>
        </div>
        <div className="hidden md:block text-xl font-bold text-slate-800">
            {user.role.charAt(0).toUpperCase() + user.role.slice(1)} Panel
        </div>
        <div className="flex items-center gap-4">
            <button className="text-slate-400 hover:text-indigo-500 relative">
                <i className="fas fa-bell text-xl"></i>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold border border-indigo-200">
                {user.name.charAt(0)}
            </div>
            <button onClick={onLogout} className="text-sm font-medium text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-lg transition-colors">
                Logout
            ...
            </button>
        </div>
    </div>
);

export default TopBar;
