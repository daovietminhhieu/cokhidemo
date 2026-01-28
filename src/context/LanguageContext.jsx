import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext();

const translations = {
    en: {
        nav_home: "Home",
        nav_products: "Products",
        nav_contact: "Contact",
        hero_precision: "PRECISION",
        hero_engineering: "ENGINEERING",
        hero_desc: "High-quality hardware for construction and industrial applications. Screws, fittings, and more, built to last.",
        hero_cta: "SHOP NOW",
        why_choose_us: "Why Choose Us",
        choose_durable: "Durable Materials",
        choose_durable_desc: "Titanium, Stainless Steel, and Brass alloys for maximum longevity.",
        choose_precision: "Precision",
        choose_precision_desc: "Manufactured to exact specifications for perfect fitment.",
        choose_shipping: "Fast Shipping",
        choose_shipping_desc: "Next-day delivery for all bulk orders within the city.",
        featured_products: "Featured Products",
        view_details: "View Details",
        add_to_cart: "Add to Cart",
        shop_title: "Shop Hardware",
        categories: "Categories",
        cat_all: "All",
        contact_title: "Contact Us",
        contact_name: "Name",
        contact_email: "Email",
        contact_message: "Message",
        contact_send: "Send Message",
        nav_login: "Login",
        nav_logout: "Logout",
        nav_admin: "Admin",
        login_title: "Admin Login",
        login_username: "Username",
        login_password: "Password",
        login_button: "Login",
        login_error: "Invalid credentials",
        admin_dashboard: "Admin Dashboard",
        admin_products: "Product Management",
        admin_add: "Add Product",
        admin_edit: "Edit",
        admin_delete: "Delete",
    },
    vi: {
        nav_home: "Trang Chủ",
        nav_products: "Sản Phẩm",
        nav_contact: "Liên Hệ",
        hero_precision: "KỸ THUẬT",
        hero_engineering: "CHÍNH XÁC",
        hero_desc: "Phần cứng chất lượng cao cho xây dựng và ứng dụng công nghiệp. Ốc vít, phụ kiện, và nhiều hơn nữa, bền bỉ với thời gian.",
        hero_cta: "MUA NGAY",
        why_choose_us: "Tại Sao Chọn Chúng Tôi",
        choose_durable: "Vật Liệu Bền Bỉ",
        choose_durable_desc: "Hợp kim Titan, Thép không gỉ, và Đồng thau cho độ bền tối đa.",
        choose_precision: "Chính Xác",
        choose_precision_desc: "Được sản xuất theo thông số kỹ thuật chính xác để vừa vặn hoàn hảo.",
        choose_shipping: "Giao Hàng Nhanh",
        choose_shipping_desc: "Giao hàng ngày hôm sau cho tất cả đơn hàng số lượng lớn trong thành phố.",
        featured_products: "Sản Phẩm Nổi Bật",
        view_details: "Xem Chi Tiết",
        add_to_cart: "Thêm Vào Giỏ",
        shop_title: "Cửa Hàng Phần Cứng",
        categories: "Danh Mục",
        cat_all: "Tất cả",
        contact_title: "Liên Hệ Chúng Tôi",
        contact_name: "Tên",
        contact_email: "Email",
        contact_message: "Tin Nhắn",
        contact_send: "Gửi Tin Nhắn",
        nav_login: "Đăng Nhập",
        nav_logout: "Đăng Xuất",
        nav_admin: "Quản Trị",
        login_title: "Đăng Nhập Quản Trị",
        login_username: "Tên Đăng Nhập",
        login_password: "Mật Khẩu",
        login_button: "Đăng Nhập",
        login_error: "Sai thông tin đăng nhập",
        admin_dashboard: "Bảng Điều Khiển",
        admin_products: "Quản Lý Sản Phẩm",
        admin_add: "Thêm Sản Phẩm",
        admin_edit: "Sửa",
        admin_delete: "Xóa",
    }
};

export function LanguageProvider({ children }) {
    const [language, setLanguage] = useState('en');

    const toggleLanguage = () => {
        setLanguage(prev => prev === 'en' ? 'vi' : 'en');
    };

    const t = (key) => {
        return translations[language][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, toggleLanguage, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export const useLanguage = () => useContext(LanguageContext);
