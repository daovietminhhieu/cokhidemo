import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Reveal from '../components/Reveal';

export default function Admin() {
    const { user } = useAuth();
    const { t, language } = useLanguage();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        name_vi: '',
        price: '',
        category: '',
        description: '',
        image: 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=600',
        stock: 0
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
        } else {
            fetchProducts();
        }
    }, [user, navigate]);

    const fetchProducts = () => {
        fetch('http://localhost:3001/api/products')
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(err => console.error("Error fetching products:", err));
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:3001/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    price: Number(formData.price),
                    stock: Number(formData.stock)
                })
            });

            if (res.ok) {
                alert('Product added successfully!');
                setShowAddForm(false);
                fetchProducts(); // Refresh list
                setFormData({
                    name: '', name_vi: '', price: '', category: '', description: '', image: '', stock: 0
                });
            } else {
                alert('Failed to add product');
            }
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    if (!user) return null;

    return (
        <div className="container section" style={{ marginTop: '100px' }}>
            <Reveal width="100%">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                    <h1>{t('admin_dashboard')}</h1>
                    <button onClick={() => setShowAddForm(!showAddForm)}>
                        {showAddForm ? 'Cancel' : t('admin_add')}
                    </button>
                </div>
            </Reveal>

            {showAddForm && (
                <Reveal width="100%">
                    <div className="card" style={{ padding: '2rem', marginBottom: '2rem' }}>
                        <h2 style={{ marginBottom: '1rem' }}>Add New Product</h2>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '1rem', gridTemplateColumns: '1fr 1fr' }}>
                            <input name="name" placeholder="Name (EN)" value={formData.name} onChange={handleInputChange} required style={{ padding: '10px' }} />
                            <input name="name_vi" placeholder="Name (VI)" value={formData.name_vi} onChange={handleInputChange} style={{ padding: '10px' }} />
                            <input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleInputChange} required style={{ padding: '10px' }} />
                            <input name="stock" type="number" placeholder="Stock Quantity" value={formData.stock} onChange={handleInputChange} required style={{ padding: '10px' }} />
                            <input name="category" placeholder="Category" value={formData.category} onChange={handleInputChange} style={{ padding: '10px' }} />
                            <input name="image" placeholder="Image URL" value={formData.image} onChange={handleInputChange} style={{ padding: '10px' }} />
                            <textarea name="description" placeholder="Description" value={formData.description} onChange={handleInputChange} style={{ gridColumn: '1/-1', padding: '10px' }} />
                            <button type="submit" style={{ gridColumn: '1/-1' }}>Save Product</button>
                        </form>
                    </div>
                </Reveal>
            )}

            <Reveal width="100%">
                <div className="card" style={{ padding: '2rem' }}>
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>{t('admin_products')}</h2>
                    <div style={{ overflowX: 'auto' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead>
                                <tr style={{ borderBottom: '1px solid #444' }}>
                                    <th style={{ padding: '10px' }}>ID</th>
                                    <th style={{ padding: '10px' }}>Name</th>
                                    <th style={{ padding: '10px' }}>Price</th>
                                    <th style={{ padding: '10px' }}>Stock</th>
                                    <th style={{ padding: '10px' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid #333' }}>
                                        <td style={{ padding: '10px' }}>{product.id}</td>
                                        <td style={{ padding: '10px' }}>
                                            {language === 'vi' ? product.name_vi : product.name}
                                        </td>
                                        <td style={{ padding: '10px' }}>{product.price.toLocaleString()} VND</td>
                                        <td style={{ padding: '10px', color: product.stock < 10 ? 'red' : 'green' }}>
                                            {product.stock || 0}
                                        </td>
                                        <td style={{ padding: '10px' }}>
                                            <button style={{ marginRight: '10px', fontSize: '0.8rem' }}>{t('admin_edit')}</button>
                                            <button style={{ background: '#d32f2f', fontSize: '0.8rem' }}>{t('admin_delete')}</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </Reveal>
        </div>
    );
}
