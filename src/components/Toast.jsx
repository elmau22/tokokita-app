import { useEffect } from 'react';

const Toast = ({ message, type, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(onClose, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    const bg = type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500';
    return (
        <div className={`fixed top-4 right-4 ${bg} text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-3 animate-bounce`}>
            <i className={`fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}`}></i>
            <span className="font-medium">{message}</span>
        </div>
    );
};

export default Toast;
