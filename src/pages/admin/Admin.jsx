import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
    Plus,
    Search,
    Filter,
    Edit2,
    Trash2,
    Package,
    AlertTriangle,
    DollarSign,
    X,
    ChevronRight,
    Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';

import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import Reveal from '../../components/Reveal';
import { SeoTags } from '../../seo/SeoTags';
import AdminLayout from '../../components/admin/AdminLayout';
import './Admin.css';

import { getItems, submitNewItem, updateItem, deleteItem, upFileToStorage } from '../../services/api';

export default function AdminDashboard() {
    const { user, authReady } = useAuth();
    const { t, language, setLanguage } = useLanguage();
    const navigate = useNavigate();

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddForm, setShowAddForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [notification, setNotification] = useState(null);

    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [uploading, setUploading] = useState(false);
    const [fileType, setFileType] = useState("");
    const [activeCategoryInput, setActiveCategoryInput] = useState(null);
    const categoryBlurTimeout = useRef(null);
    const fileInputRef = useRef(null);
    const editFileInputRef = useRef(null);
    // Form State
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        image: '',
        quantity: ''
    });

    const [editFormData, setEditFormData] = useState({
        id: '',
        name: '',
        price: '',
        category: '',
        description: '',
        image: '',
        quantity: ''
    });

    useEffect(() => {
        if (!authReady) return;

        if (!user) {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [user, navigate, authReady]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const res = await getItems();
            console.log(res);
            setProducts(res);
        } catch (err) {
            console.error("Error fetching products:", err);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };


    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const isVideo = file.type.startsWith("video/");
        const isImage = file.type.startsWith("image/");
        if (!isVideo && !isImage) {
            alert("Chỉ chấp nhận ảnh/video");
            return;
        }

        setUploading(true);

        // không block UI
        setTimeout(() => uploadFile(file, isVideo), 0);
    };

    const uploadFile = async (file, isVideo) => {
        try {
            const url = await upFileToStorage(file);
            setFileType(isVideo ? "video" : "image");

            setFormData(prev => ({
                ...prev,
                image: url
            }));
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setUploading(false);
            if (fileInputRef.current) {
                fileInputRef.current.value = "";
            }
        }
    };


    const showToast = (message, type) => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleEdit = (product) => {
        setEditFormData({
            ...product,
            price: product.price || '',
            quantity: product.quantity || '',
            image: product.image || ''
        });
        const isVideo = product.image?.toLowerCase().match(/\.(mp4|webm|ogg)$/);
        setFileType(isVideo ? "video" : "image");
        setShowEditForm(true);
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        console.log(editFormData);
        try {
            await updateItem(editFormData.id, editFormData);
            alert("Cập nhật sản phẩm thành công");
            showToast("Cập nhật sản phẩm thành công", "success");
            setShowEditForm(false);
            fetchProducts();
        } catch (err) {
            console.log(err);
            showToast('Failed to update product', 'error');
        }
    };

    const handleDelete = async (id) => {
        try {
            const res = await deleteItem(id);
            alert("Xóa sản phẩm thành công");
            console.log(res);
            showToast("Xóa sản phẩm thành công", "success");
            fetchProducts();
        } catch (err) {
            showToast('Failed to delete product', 'error');
            console.error("Error deleting product:", err);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await submitNewItem(formData);

            alert("Thêm sản phẩm thành công");
            console.log(res);
            showToast("Thêm sản phẩm thành công", "success");
            setFormData({
                name: '',
                price: '',
                category: '',
                description: '',
                image: '',
                quantity: ''
            });
            setShowAddForm(false);
            fetchProducts();

        } catch (error) {
            showToast('Failed to add product', 'error');
            console.error("Error adding product:", error);
        }
    };

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            const name = p.name?.toLowerCase() || '';
            const nameVi = p.name_vi?.toLowerCase() || '';

            const matchesSearch =
                name.includes(debouncedSearch.toLowerCase()) ||
                nameVi.includes(debouncedSearch.toLowerCase());

            const matchesCategory =
                selectedCategory === 'All' || p.category === selectedCategory;

            return matchesSearch && matchesCategory;
        });
    }, [products, debouncedSearch, selectedCategory]);

    const stats = useMemo(() => {
        const total = products.length;
        const lowStock = products.filter(p => p.quantity < 10).length;
        const totalValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
        return { total, lowStock, totalValue };
    }, [products]);

    const categorySuggestions = useMemo(() => {
        return Array.from(new Set(products.map(p => p.category).filter(Boolean)));
    }, [products]);

    const visibleCategorySuggestions = useMemo(() => {
        const query = activeCategoryInput === 'edit' ? editFormData.category : formData.category;
        const normalizedQuery = (query || '').toLowerCase();
        return categorySuggestions.filter(cat =>
            !normalizedQuery || cat.toLowerCase().includes(normalizedQuery)
        );
    }, [categorySuggestions, activeCategoryInput, formData.category, editFormData.category]);

    const categories = useMemo(() => {
        return ['All', ...categorySuggestions];
    }, [categorySuggestions]);

    const openCategorySuggestions = (type) => {
        if (categoryBlurTimeout.current) {
            clearTimeout(categoryBlurTimeout.current);
            categoryBlurTimeout.current = null;
        }
        setActiveCategoryInput(type);
    };

    const closeCategorySuggestions = () => {
        if (categoryBlurTimeout.current) {
            clearTimeout(categoryBlurTimeout.current);
        }
        categoryBlurTimeout.current = setTimeout(() => setActiveCategoryInput(null), 100);
    };

    const handleCategorySuggestionClick = (type, category) => {
        if (type === 'edit') {
            setEditFormData(prev => ({ ...prev, category }));
        } else {
            setFormData(prev => ({ ...prev, category }));
        }
        setActiveCategoryInput(null);
    };

    if (!user) return null;

    return (
        <AdminLayout>
            <div className="admin-dashboard">
                <SeoTags title="Admin Dashboard | Inox Diệp Dương" />

                <div className="container main-content">
                {/* Header Section */}
                <div className="header-section">
                    <div>
                        <h1 className="header-title">{t('admin_dashboard')}</h1>
                        <p className="header-subtitle">{t('manage_stock')}</p>
                    </div>
                    <button
                        onClick={() => setShowAddForm(true)}
                        className="btn-primary"
                    >
                        <Plus size={20} />
                        {t('admin_add')}
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="stats-grid">
                    <StatCard
                        title={t('total_products')}
                        value={stats.total}
                        icon={<Package size={24} />}
                        color="blue"
                    />
                    <StatCard
                        title={t('low_stock')}
                        value={stats.lowStock}
                        icon={<AlertTriangle size={24} />}
                        color="amber"
                        alert={stats.lowStock > 0}
                    />
                    <StatCard
                        title={t('total_value')}
                        value={`${stats.totalValue.toLocaleString()} VND`}
                        icon={<DollarSign size={24} />}
                        color="emerald"
                    />
                </div>

                {/* Filters & Table Section */}
                <div className="table-card">
                    <div className="table-header">
                        <div className="table-controls">
                            <div className="search-wrapper">
                                <Search className="search-icon" />
                                <input
                                    type="text"
                                    placeholder={t('search')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="search-input"
                                />
                            </div>
                            <div className="filter-wrapper">
                                <Filter className="filter-icon" />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="filter-select"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat === 'All' ? t('all_categories') : cat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="table-responsive">
                        <table>
                            <thead>
                                <tr>
                                    <th>{t('product_name')}</th>
                                    <th>{t('category')}</th>
                                    <th>{t('price')}</th>
                                    <th>{t('stock')}</th>
                                    <th style={{ textAlign: 'right' }}>{t('actions')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <AnimatePresence mode="popLayout">
                                    {filteredProducts.map((product) => (
                                        <motion.tr
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                        >
                                            <td data-label={t('product_name')} className="product-td">
                                                <div className="product-cell">
                                                    <img
                                                        src={product.image}
                                                        alt={product.name}
                                                        className="product-img"
                                                        referrerPolicy="no-referrer"
                                                    />
                                                    <div className="product-info">
                                                        <p className="product-name">{product.name}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td data-label={t('category')}>
                                                <span className="category-tag">
                                                    {product.category}
                                                </span>
                                            </td>
                                            <td data-label={t('price')} style={{ fontWeight: 600 }}>
                                                {product.price} VND
                                            </td>
                                            <td data-label={t('stock')}>
                                                <div className="stock-indicator">
                                                    <div className={clsx(
                                                        "dot",
                                                        product.quantity < 10 ? "dot-red" : "dot-green"
                                                    )} />
                                                    <span className={clsx(
                                                        product.quantity < 10 ? "text-red" : "text-green"
                                                    )}>
                                                        {product.quantity}
                                                    </span>
                                                </div>
                                            </td>
                                            <td data-label={t('actions')}>
                                                <div className="actions-cell">
                                                    <button className="btn-icon edit-btn" onClick={() => handleEdit(product)}>
                                                        <Edit2 size={16} />
                                                    </button>
                                                    <button className="btn-icon delete-btn" onClick={() => handleDelete(product.id)}>
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                                {filteredProducts.length === 0 && (
                                    <tr>
                                        <td colSpan={5} style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
                                            {t('no_products_found')}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
                </div>

            {/* Add Product Modal */}
            <AnimatePresence>
                {showAddForm && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowAddForm(false)}
                            className="modal-backdrop"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 40 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="modal-container"
                        >
                            <div className="modal-header">
                                <h2 className="modal-title">{t('add_new_product')}</h2>
                                <button
                                    onClick={() => setShowAddForm(false)}
                                    className="close-btn"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="form-body">
                                <div className="form-grid">
                                    {/* <div className="form-group">
                                        <label>{t('name_en')}</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div> */}
                                    <div className="form-group">
                                        <label>Tên sản phẩm</label>
                                        <input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('price_vnd')}</label>
                                        <input
                                            name="price"
                                            type="number"
                                            value={formData.price}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('stock_quantity')}</label>
                                        <input
                                            name="quantity"
                                            type="number"
                                            value={formData.quantity}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div className="form-group category-input-group">
                                        <label>{t('category')}</label>
                                        <input
                                            name="category"
                                            value={formData.category}
                                            onChange={handleInputChange}
                                            onFocus={() => openCategorySuggestions('add')}
                                            onBlur={closeCategorySuggestions}
                                            autoComplete="off"
                                        />
                                        {activeCategoryInput === 'add' && (
                                            <div className="category-suggestions-list">
                                                {visibleCategorySuggestions.length > 0 ? (
                                                    visibleCategorySuggestions.map(cat => (
                                                        <button
                                                            key={cat}
                                                            type="button"
                                                            className="category-suggestion-item"
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            onClick={() => handleCategorySuggestionClick('add', cat)}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="category-suggestions-empty">Không có danh mục phù hợp</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    {/* <div className="form-group">
                                        <label>{t('image_url')}</label>
                                        <input
                                            name="image"
                                            value={formData.image}
                                            onChange={handleInputChange}
                                        />
                                    </div> */}
                                    <div className="form-group full-width">
                                        <label>Media</label>
                                        <div className="media-upload-wrapper">
                                            <label className="file-upload-btn" htmlFor="add-file-input">
                                                {uploading ? 'Đang tải lên...' : '📁 Chọn ảnh / video'}
                                            </label>
                                            <input
                                                id="add-file-input"
                                                type="file"
                                                accept="image/*,video/*"
                                                onChange={handleFileChange}
                                                ref={fileInputRef}
                                                style={{ display: 'none' }}
                                            />
                                            {uploading && <p className="upload-status">Đang xử lý...</p>}
                                            {formData.image && !uploading && (
                                                <div className="media-preview">
                                                    {fileType === "image"
                                                        ? <img src={formData.image} alt="preview" />
                                                        : <video src={formData.image} controls />}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group full-width">
                                        <label>{t('description')}</label>
                                        <textarea
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={() => setShowAddForm(false)}
                                        className="btn-secondary"
                                    >
                                        {t('admin_cancel')}
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={uploading}
                                    >
                                        {uploading ? 'Đang tải lên...' : 'Thêm sản phẩm'}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Edit Product Modal */}
            <AnimatePresence>
                {showEditForm && (
                    <div className="modal-overlay">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowEditForm(false)}
                            className="modal-backdrop"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 40 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="modal-container"
                        >
                            <div className="modal-header">
                                <h2 className="modal-title">Cập nhật sản phẩm</h2>
                                <button
                                    onClick={() => setShowEditForm(false)}
                                    className="close-btn"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <form onSubmit={handleUpdateSubmit} className="form-body">
                                <div className="form-grid">
                                    <div className="form-group">
                                        <label>Tên sản phẩm</label>
                                        <input
                                            name="name"
                                            value={editFormData.name}
                                            onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('price_vnd')}</label>
                                        <input
                                            name="price"
                                            type="number"
                                            value={editFormData.price}
                                            onChange={(e) => setEditFormData({ ...editFormData, price: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>{t('stock_quantity')}</label>
                                        <input
                                            name="quantity"
                                            type="number"
                                            value={editFormData.quantity}
                                            onChange={(e) => setEditFormData({ ...editFormData, quantity: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group category-input-group">
                                        <label>{t('category')}</label>
                                        <input
                                            name="category"
                                            value={editFormData.category}
                                            onChange={(e) => setEditFormData({ ...editFormData, category: e.target.value })}
                                            onFocus={() => openCategorySuggestions('edit')}
                                            onBlur={closeCategorySuggestions}
                                            autoComplete="off"
                                        />
                                        {activeCategoryInput === 'edit' && (
                                            <div className="category-suggestions-list">
                                                {visibleCategorySuggestions.length > 0 ? (
                                                    visibleCategorySuggestions.map(cat => (
                                                        <button
                                                            key={cat}
                                                            type="button"
                                                            className="category-suggestion-item"
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            onClick={() => handleCategorySuggestionClick('edit', cat)}
                                                        >
                                                            {cat}
                                                        </button>
                                                    ))
                                                ) : (
                                                    <div className="category-suggestions-empty">Không có danh mục phù hợp</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                    <div className="form-group full-width">
                                        <label>Media</label>
                                        <div className="media-upload-wrapper">
                                            <label className="file-upload-btn" htmlFor="edit-file-input">
                                                {uploading ? 'Đang tải lên...' : '📁 Chọn ảnh / video'}
                                            </label>
                                            <input
                                                id="edit-file-input"
                                                type="file"
                                                accept="image/*,video/*"
                                                onChange={async (e) => {
                                                    const file = e.target.files[0];
                                                    if (!file) return;
                                                    setUploading(true);
                                                    try {
                                                        const url = await upFileToStorage(file);
                                                        const isVideo = file.type.startsWith("video/");
                                                        setFileType(isVideo ? "video" : "image");
                                                        setEditFormData({ ...editFormData, image: url });
                                                    } catch (err) {
                                                        alert("Upload failed");
                                                    } finally {
                                                        setUploading(false);
                                                    }
                                                }}
                                                ref={editFileInputRef}
                                                style={{ display: 'none' }}
                                            />
                                            {uploading && <p className="upload-status">Đang xử lý...</p>}
                                            {editFormData.image && !uploading && (
                                                <div className="media-preview">
                                                    {fileType === "image"
                                                        ? <img src={editFormData.image} alt="preview" />
                                                        : <video src={editFormData.image} controls />}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="form-group full-width">
                                        <label>{t('description')}</label>
                                        <textarea
                                            name="description"
                                            value={editFormData.description}
                                            onChange={(e) => setEditFormData({ ...editFormData, description: e.target.value })}
                                            rows={3}
                                        />
                                    </div>
                                </div>

                                <div className="form-actions">
                                    <button
                                        type="button"
                                        onClick={() => setShowEditForm(false)}
                                        className="btn-secondary"
                                    >
                                        {t('admin_cancel')}
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn-submit"
                                        disabled={uploading}
                                    >
                                        {uploading ? "Đang tải lên..." : "Cập nhật"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Notifications */}
            <AnimatePresence>
                {notification && (
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        className={clsx(
                            "toast",
                            notification.type === 'success' ? "toast-success" : "toast-error"
                        )}
                    >
                        <div className={clsx(
                            "toast-icon",
                            notification.type === 'success' ? "icon-success" : "icon-error"
                        )}>
                            {notification.type === 'success' ? <Package size={16} /> : <AlertTriangle size={16} />}
                        </div>
                        <p className="toast-message">{notification.message}</p>
                    </motion.div>
                )}
            </AnimatePresence>
            </div>
        </AdminLayout>
    );
}

function StatCard({ title, value, icon, color, alert }) {
    return (
        <Reveal width="100%">
            <div className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                    <div className={clsx("stat-icon-wrapper", `icon-${color}`)}>
                        {icon}
                    </div>
                    {alert && (
                        <div className="stat-alert" />
                    )}
                </div>
                <div>
                    <p className="stat-label">{title}</p>
                    <div className="stat-value-container">
                        <h3 className="stat-value">{value}</h3>
                        <ChevronRight size={16} style={{ color: '#d1d5db' }} />
                    </div>
                </div>
            </div>
        </Reveal>
    );
}
