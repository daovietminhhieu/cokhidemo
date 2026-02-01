import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import Reveal from './Reveal';

const TestimonialCard = ({ name, role, content, delay }) => (
    <div className="glass" style={{
        padding: '2rem',
        borderRadius: '12px',
        marginBottom: '1rem',
        animation: `fadeInUp 0.6s ease-out ${delay}s backwards`
    }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{
                width: '40px', height: '40px', borderRadius: '50%', background: 'var(--secondary)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', marginRight: '1rem'
            }}>
                {name.charAt(0)}
            </div>
            <div>
                <h4 style={{ margin: 0 }}>{name}</h4>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{role}</span>
            </div>
        </div>
        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>"{content}"</p>
        <div style={{ color: '#FFD700', marginTop: '1rem' }}>★★★★★</div>
    </div>
);

const Testimonials = () => {
    const { t, language } = useLanguage();

    const testimonials = [
        {
            name: "Nguyen Van A",
            role: "Construction Manager",
            en_role: "Construction Manager",
            content_vi: "Sản phẩm cực kỳ chất lượng. Tôi đã dùng ốc vít của họ cho dự án chung cư cao cấp và rất hài lòng.",
            content_en: "Extremely high quality products. I used their fasteners for a high-end apartment project and I am very satisfied."
        },
        {
            name: "John Smith",
            role: "DIY Enthusiast",
            en_role: "DIY Enthusiast",
            content_vi: "Giao hàng nhanh trong ngày. Đóng gói cẩn thận. Chắc chắn sẽ ủng hộ tiếp.",
            content_en: "Fast same-day shipping. Careful packaging. Will definitely buy again."
        },
        {
            name: "Tran Thi B",
            role: "Interior Designer",
            en_role: "Interior Designer",
            content_vi: "Mẫu mã đẹp, phù hợp với thiết kế công nghiệp hiện đại. Giá cả hợp lý.",
            content_en: "Beautiful designs, fits clear with modern industrial design. Reasonable prices."
        }
    ];

    return (
        <div className="section container">
            <Reveal>
                <h2 style={{ marginBottom: '3rem' }}>{t('testimonials_title')}</h2>
            </Reveal>
            <div className="grid">
                {testimonials.map((item, index) => (
                    <TestimonialCard
                        key={index}
                        name={item.name}
                        role={language === 'vi' ? item.role : item.en_role}
                        content={language === 'vi' ? item.content_vi : item.content_en}
                        delay={index * 0.2}
                    />
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
