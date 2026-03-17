import React, { useEffect, useState } from 'react';
import { 
    Mail, 
    Trash2, 
    CheckCircle, 
    Clock, 
    User, 
    Calendar,
    MessageSquare,
    Search,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AdminLayout from '../../components/admin/AdminLayout';
import { SeoTags } from '../../seo/SeoTags';
import { getContacts, updateContactStatus, deleteContact } from '../../services/api';
import './AdminContacts.css';

export default function AdminContacts() {
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, new, read, replied
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        fetchContacts();
    }, []);

    const fetchContacts = async () => {
        setLoading(true);
        try {
            const res = await getContacts();
            setContacts(res.data || []);
        } catch (err) {
            console.error("Error fetching contacts:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id, status) => {
        try {
            await updateContactStatus(id, status);
            fetchContacts();
        } catch (err) {
            console.error("Error updating status:", err);
            alert("Cập nhật trạng thái thất bại");
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm("Bạn có chắc chắn muốn xóa liên hệ này?")) return;
        try {
            await deleteContact(id);
            fetchContacts();
        } catch (err) {
            console.error("Error deleting contact:", err);
            alert("Xóa liên hệ thất bại");
        }
    };

    const filteredContacts = contacts.filter(c => {
        const matchesFilter = filter === 'all' || c.status === filter;
        const matchesSearch = 
            c.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
            c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            c.message.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesFilter && matchesSearch;
    }).sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return (
        <AdminLayout>
            <div className="container admin-contacts-page">
                <SeoTags title="Admin Contacts | Inox Diệp Dương" />
                <div className="page-header">
                    <div>
                        <h1 className="header-title">Liên hệ từ khách hàng</h1>
                        <p className="header-subtitle">Quản lý các yêu cầu tư vấn và hỗ trợ</p>
                    </div>
                </div>

                {/* Filters & Controls */}
                <div className="controls-card">
                    <div className="search-box">
                        <Search size={18} />
                        <input 
                            type="text" 
                            placeholder="Tìm kiếm theo tên, email hoặc nội dung..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="filter-group">
                        <Filter size={18} />
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">Tất cả trạng thái</option>
                            <option value="new">Chưa đọc</option>
                            <option value="read">Đã đọc</option>
                            <option value="replied">Đã phản hồi</option>
                        </select>
                    </div>
                </div>

                {/* Contacts List */}
                <div className="contacts-grid">
                    <AnimatePresence mode="popLayout">
                        {loading ? (
                            <div className="loading-state">Đang tải...</div>
                        ) : filteredContacts.length === 0 ? (
                            <div className="empty-state">Không tìm thấy liên hệ nào.</div>
                        ) : (
                            filteredContacts.map((contact) => (
                                <motion.div 
                                    key={contact.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className={`contact-card ${contact.status}`}
                                >
                                    <div className="card-header">
                                        <div className="status-badge">
                                            {contact.status === 'new' && <Clock size={14} />}
                                            {contact.status === 'read' && <CheckCircle size={14} />}
                                            {contact.status === 'replied' && <User size={14} />}
                                            <span>
                                                {contact.status === 'new' && 'Chưa đọc'}
                                                {contact.status === 'read' && 'Đã xem'}
                                                {contact.status === 'replied' && 'Đã phản hồi'}
                                            </span>
                                        </div>
                                        <button 
                                            onClick={() => handleDelete(contact.id)}
                                            className="delete-btn"
                                            title="Xóa liên hệ"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>

                                    <div className="card-body">
                                        <div className="info-row">
                                            <User size={16} />
                                            <span className="name">{contact.name}</span>
                                        </div>
                                        <div className="info-row">
                                            <Mail size={16} />
                                            <span className="email">{contact.email}</span>
                                        </div>
                                        <div className="info-row">
                                            <Calendar size={16} />
                                            <span className="date">
                                                {new Date(contact.createdAt).toLocaleString('vi-VN')}
                                            </span>
                                        </div>
                                        <div className="message-box">
                                            <MessageSquare size={16} />
                                            <p className="message-text">{contact.message}</p>
                                        </div>
                                    </div>

                                    <div className="card-actions">
                                        {contact.status === 'new' && (
                                            <button 
                                                onClick={() => handleStatusUpdate(contact.id, 'read')}
                                                className="action-btn read"
                                            >
                                                Đánh dấu đã xem
                                            </button>
                                        )}
                                        {contact.status !== 'replied' && (
                                            <button 
                                                onClick={() => handleStatusUpdate(contact.id, 'replied')}
                                                className="action-btn reply"
                                            >
                                                Đánh dấu đã phản hồi
                                            </button>
                                        )}
                                        {contact.status === 'replied' && (
                                            <button 
                                                onClick={() => handleStatusUpdate(contact.id, 'read')}
                                                className="action-btn undo"
                                            >
                                                Quay lại trạng thái đã xem
                                            </button>
                                        )}
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </AdminLayout>
    );
}
