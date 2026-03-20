import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import Reveal from '../components/Reveal';
import { SeoTags } from '../seo/SeoTags';
import { submitOrder } from '../services/api';
const generateOrderId = () => {
  return 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase();
};
export default function CartPage() {
  const { cart, cartCount, removeFromCart, clearCart } = useCart();
  const { t, language } = useLanguage();
  const [isCheckout, setIsCheckout] = React.useState(false);
  const [isOrdered, setIsOrdered] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [formData, setFormData] = React.useState({
    orderId: generateOrderId(),
    products: cart,
    quantity: cart.reduce((sum, item) => sum + item.quantity, 0),
    name: '',
    phone: '',
    address: '',
    email: ''
  });

  const total = cart.reduce((sum, item) => sum + (item.price || 0) * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleOrder = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
      return;
    }
    
    setIsLoading(true);
    try {
      console.log("Form data: ", formData);
      const res = await submitOrder(formData);
      console.log(res);

      setIsOrdered(true);
      clearCart();
    } catch (error) {
      console.error(error);
      alert('Có lỗi xảy ra khi đặt hàng. Vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <SeoTags
        title={'Giỏ hàng'}
        description={'Xem lại toàn bộ sản phẩm bạn đã thêm vào giỏ tại Inox Diệp Dương.'}
      />
      <div className="container section" style={{ marginTop: '80px', marginBottom: '80px' }} key={language}>
        <Reveal width="100%">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '3rem' }}>
            <h1
              style={{
                fontSize: '3rem',
                textTransform: 'uppercase',
                lineHeight: 1.2,
                margin: 0,
                color: '#ffffff',
              }}
            >
              Giỏ hàng
            </h1>
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                style={{
                  padding: '0.8rem 1.8rem',
                  borderRadius: '999px',
                  border: '1px solid rgba(255,255,255,0.3)',
                  background: 'transparent',
                  color: '#fff',
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  cursor: 'pointer',
                }}
              >
                Xóa giỏ hàng
              </button>
            )}
          </div>
        </Reveal>

        {isOrdered ? (
          <Reveal width="100%">
            <div
              style={{
                padding: '4rem 2rem',
                borderRadius: '24px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.03)',
                textAlign: 'center',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div
                style={{
                  width: '80px',
                  height: '80px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 2rem',
                  fontSize: '2rem',
                }}
              >
                ✓
              </div>
              <h2 style={{ fontSize: '2rem', color: '#fff', marginBottom: '1rem' }}>
                Đặt hàng thành công!
              </h2>
              <p style={{ color: '#888', marginBottom: '2.5rem', maxWidth: '500px', margin: '0 auto 2.5rem' }}>
                Cảm ơn {formData.name} đã tin tưởng Inox Diệp Dương. Chúng tôi sẽ sớm liên hệ với bạn qua số điện thoại {formData.phone} để xác nhận đơn hàng.
              </p>
              <Link
                to="/shop"
                style={{
                  display: 'inline-block',
                  padding: '1rem 2.5rem',
                  borderRadius: '999px',
                  background: '#ffffff',
                  color: '#000000',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                }}
              >
                Tiếp tục mua sắm
              </Link>
            </div>
          </Reveal>
        ) : cart.length === 0 ? (
          <div
            style={{
              padding: '4rem 2rem',
              borderRadius: '16px',
              border: '1px solid rgba(255,255,255,0.06)',
              background: 'rgba(255,255,255,0.02)',
              textAlign: 'center',
              color: '#888',
            }}
          >
            <p style={{ marginBottom: '1.5rem', fontSize: '1rem' }}>
              Giỏ hàng trống
            </p>
            <Link
              to="/shop"
              style={{
                display: 'inline-block',
                padding: '0.9rem 2.2rem',
                borderRadius: '999px',
                border: 'none',
                background: '#ffffff',
                color: '#000000',
                fontSize: '0.85rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}
            >
              Quay lại trang sản phẩm
            </Link>
          </div>
        ) : !isCheckout ? (
          <div className="cart-grid">
            {/* Items list */}
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                padding: '1.5rem',
              }}
            >
              <div className="cart-header">
                <span>Sản phẩm</span>
                <span>Số lượng</span>
                <span>Giá</span>
                <span />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div>
                      <div
                        style={{
                          fontSize: '0.95rem',
                          fontWeight: 500,
                          color: '#fff',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#777' }}>
                        {item.category}
                      </div>
                    </div>

                    <div style={{ fontSize: '0.9rem', color: '#fff' }}>x{item.quantity}</div>

                    <div style={{ fontSize: '0.9rem', color: '#fff' }}>
                      {((item.price || 0).toLocaleString())} đ
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255,255,255,0.7)',
                        fontSize: '0.85rem',
                        cursor: 'pointer',
                      }}
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Summary */}
            <div
              style={{
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(255,255,255,0.02)',
                padding: '1.5rem',
              }}
            >
              <h2
                style={{
                  fontSize: '1.1rem',
                  margin: 0,
                  marginBottom: '1.5rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.08em',
                  color: '#fff',
                }}
              >
                Đơn hàng
              </h2>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '0.8rem',
                  fontSize: '0.9rem',
                  color: '#aaa',
                }}
              >
                <span>Sản phẩm</span>
                <span>{cartCount}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginTop: '1.2rem',
                  paddingTop: '1.2rem',
                  borderTop: '1px solid rgba(255,255,255,0.06)',
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                <span>Tổng tiền</span>
                <span>{total.toLocaleString()}đ</span>
              </div>

              <button
                style={{
                  marginTop: '1.8rem',
                  width: '100%',
                  padding: '1rem 1.5rem',
                  borderRadius: '999px',
                  border: 'none',
                  background: '#ffffff',
                  color: '#000',
                  fontSize: '0.9rem',
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'opacity 0.3s ease',
                }}
                onClick={() => setIsCheckout(true)}
              >
                Tiến hành đặt hàng
              </button>
            </div>
          </div>
        ) : (
          <Reveal width="100%">
            <div className="cart-grid">
              {/* Checkout Form */}
              <div
                style={{
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '2.5rem',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem' }}>
                  <button
                    onClick={() => setIsCheckout(false)}
                    style={{
                      padding: '0.5rem',
                      color: '#666',
                      fontSize: '1.2rem',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    ←
                  </button>
                  <h2 style={{ fontSize: '1.5rem', color: '#fff' }}>Thông tin giao hàng</h2>
                </div>

                <form onSubmit={handleOrder} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Họ tên *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Nguyễn Văn A"
                        style={{
                          padding: '1.1rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff',
                          outline: 'none',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                      <label style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Số điện thoại *</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        placeholder="..."
                        style={{
                          padding: '1.1rem',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '12px',
                          color: '#fff',
                          outline: 'none',
                          fontSize: '0.95rem',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Email (không bắt buộc)</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Hệ thống sẽ gửi mail xác nhận đơn hàng"
                      style={{
                        padding: '1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                        outline: 'none',
                        fontSize: '0.95rem',
                      }}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <label style={{ fontSize: '0.8rem', color: '#666', textTransform: 'uppercase' }}>Địa chỉ nhận hàng *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành phố"
                      rows="3"
                      style={{
                        padding: '1.1rem',
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '12px',
                        color: '#fff',
                        outline: 'none',
                        fontSize: '0.95rem',
                        resize: 'none',
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      marginTop: '1rem',
                      padding: '1.2rem',
                      borderRadius: '999px',
                      border: 'none',
                      background: isLoading ? 'rgba(255,255,255,0.5)' : '#ffffff',
                      color: '#000',
                      fontSize: '1rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '10px'
                    }}
                  >
                    {isLoading ? (
                      <>
                        <span className="loader-dots">Đang xử lý</span>
                      </>
                    ) : (
                      'Xác nhận đặt hàng'
                    )}
                  </button>
                </form>
              </div>

              {/* Order Sticky Summary */}
              <div
                style={{
                  borderRadius: '20px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  background: 'rgba(255,255,255,0.02)',
                  padding: '1.5rem',
                  position: 'sticky',
                  top: '100px',
                }}
              >
                <h3 style={{ fontSize: '1rem', color: '#fff', marginBottom: '1.5rem', textTransform: 'uppercase' }}>
                  Tóm tắt đơn hàng
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                      <span style={{ color: '#888' }}>{item.name} x{item.quantity}</span>
                      <span style={{ color: '#fff' }}>{((item.price || 0) * item.quantity).toLocaleString()}đ</span>
                    </div>
                  ))}
                  <div
                    style={{
                      marginTop: '1rem',
                      paddingTop: '1rem',
                      borderTop: '1px solid rgba(255,255,255,0.06)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                    }}
                  >
                    <span style={{ color: '#fff' }}>Tổng cộng</span>
                    <span style={{ color: '#fff' }}>{total.toLocaleString()}đ</span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </>
  );
}

