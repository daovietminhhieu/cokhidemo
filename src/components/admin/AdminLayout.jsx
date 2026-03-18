import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard,
    User,
    Mail,
    LogOut,
    Globe,
    Package
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import './AdminLayout.css';

export default function AdminLayout({ children }) {
    const { user, logout } = useAuth();
    const { t, language, setLanguage } = useLanguage();
    const location = useLocation();
    const navigate = useNavigate();

    const menuItems = [
        {
            path: '/admin',
            label: t('admin_dashboard') || 'Dashboard',
            icon: <LayoutDashboard size={18} />
        },
        {
            path: '/admin/contacts',
            label: 'Liên hệ',
            icon: <Mail size={18} />
        },
        {
            path: '/admin/profile',
            label: 'Hồ sơ',
            icon: <User size={18} />
        }
    ];

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <div className="admin-layout-wrapper">
            {/* Top Navigation Bar */}
            <nav className="navbar admin-navbar">
                <div className="container navbar-content">
                    <div className="nav-menu">
                        {menuItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </Link>
                        ))}
                    </div>

                    {/* <div className="nav-actions">
                        <button
                            className="lang-toggle"
                            onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
                        >
                            <Globe size={18} />
                            {language.toUpperCase()}
                        </button> */}

                        <div className="divider" />

                        <div className="user-profile">
                            <div className="user-info">
                                <p className="user-name">{user.name}</p>
                                <p className="user-role">{user.role}</p>
                            </div>
                            <div className="user-avatar">
                                {user.name.charAt(0)}
                            </div>
                            <button onClick={handleLogout} className="logout-btn-icon" title="Đăng xuất">
                                <LogOut size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Page Content */}
            <main className="admin-page-container">
                {children}
            </main>
        </div>
    );
}
