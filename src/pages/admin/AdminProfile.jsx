import React, { useState } from 'react';
import { 
    User, 
    Mail, 
    Shield, 
    Calendar, 
    Save, 
    CreditCard,
    ArrowLeft
} from 'lucide-react';
import { motion } from 'motion/react';
import AdminLayout from '../../components/admin/AdminLayout';
import { SeoTags } from '../../seo/SeoTags';
import { useAuth } from '../../context/AuthContext';
import { updateProfile } from '../../services/api';
import './AdminProfile.css';

export default function AdminProfile() {
    const { user, updateSession } = useAuth();
    const [name, setName] = useState(user?.name || '');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage({ type: '', text: '' });

        try {
            const res = await updateProfile(user._id, { name });
            if (res.success) {
                updateSession(res.data);
                setMessage({ type: 'success', text: 'Cập nhật thông tin thành công!' });
            }
        } catch (err) {
            console.error(err);
            setMessage({ type: 'error', text: 'Có lỗi xảy ra khi cập nhật.' });
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    return (
        <AdminLayout>
            <div className="container admin-profile-page">
                <SeoTags title="Admin Profile | Inox Diệp Dương" />
                <div className="page-header">
                    <h1 className="header-title">Hồ sơ cá nhân</h1>
                    <p className="header-subtitle">Quản lý thông tin tài khoản admin</p>
                </div>

                <div className="profile-container">
                    {/* Profile Header/Avatar Section */}
                    <div className="profile-card hero-card">
                        <div className="profile-avatar-large">
                            {user.name.charAt(0)}
                        </div>
                        <div className="profile-info-hero">
                            <h2>{user.name}</h2>
                            <p className="role-badge">{user.role}</p>
                            <p className="join-date">
                                <Calendar size={14} />
                                Tham gia từ: {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                            </p>
                        </div>
                    </div>

                    <div className="profile-grid">
                        {/* Edit Form */}
                        <motion.div 
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="profile-card edit-section"
                        >
                            <div className="card-header">
                                <User size={20} />
                                <h3>Thông tin cơ bản</h3>
                            </div>
                            <form onSubmit={handleSubmit} className="profile-form">
                                <div className="form-group">
                                    <label>Họ và tên</label>
                                    <input 
                                        type="text" 
                                        value={name} 
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Nhập họ tên..."
                                        required
                                    />
                                </div>
                                <div className="form-group disabled">
                                    <label>Email (Không thể thay đổi)</label>
                                    <div className="input-readonly">
                                        <Mail size={16} />
                                        <span>{user.email}</span>
                                    </div>
                                </div>
                                <div className="form-group disabled">
                                    <label>Vai trò</label>
                                    <div className="input-readonly">
                                        <Shield size={16} />
                                        <span>{user.role}</span>
                                    </div>
                                </div>

                                {message.text && (
                                    <div className={`form-message ${message.type}`}>
                                        {message.text}
                                    </div>
                                )}

                                <button 
                                    type="submit" 
                                    className="save-btn"
                                    disabled={loading || name === user.name}
                                >
                                    {loading ? 'Đang lưu...' : (
                                        <>
                                            <Save size={18} />
                                            Lưu thay đổi
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Account Stats/Other Info */}
                        <motion.div 
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="profile-card stats-section"
                        >
                            <div className="card-header">
                                <CreditCard size={20} />
                                <h3>Trạng thái tài khoản</h3>
                            </div>
                            <div className="stats-list">
                                <div className="stat-item">
                                    <span className="label">Trạng thái</span>
                                    <span className="value status-active">{user.status}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="label">Số dư tín dụng</span>
                                    <span className="value">{user.credit?.toLocaleString('vi-VN')} đ</span>
                                </div>
                                <div className="stat-item">
                                    <span className="label">ID người dùng</span>
                                    <span className="value code-font">{user._id}</span>
                                </div>
                            </div>

                            <div className="security-notice">
                                <Shield size={32} />
                                <div className="notice-content">
                                    <h4>Bảo mật tài khoản</h4>
                                    <p>Tài khoản của bạn được bảo vệ bởi hệ thống xác thực của 3D Hardware Store. Để đổi mật khẩu, vui lòng liên hệ bộ phận kỹ thuật.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
