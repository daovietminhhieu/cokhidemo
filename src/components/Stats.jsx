import React from 'react';

const StatItem = ({ number, label }) => (
    <div style={{ textAlign: 'center' }}>
        <h3 className="stat-number" style={{
            fontSize: '3.5rem',
            marginBottom: '0.5rem',
            background: 'linear-gradient(45deg, var(--text-light), var(--text-muted))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: '800'
        }}>
            {number}
        </h3>
        <p style={{ color: 'var(--secondary)', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.9rem' }}>{label}</p>
    </div>
);

const Stats = () => {
    return (
        <div className="section container" style={{ paddingTop: '1rem', paddingBottom: '1rem' }}>
            <div className="glass" style={{
                padding: '2rem 2rem',
                borderRadius: '16px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                gap: '1rem',
                background: 'rgba(40, 0, 0, 0.8)',
                border: '1px solid rgba(255, 85, 60, 0.9)',
                boxShadow: '0 12px 40px rgba(255, 72, 44, 0.5)'
            }}>
                <StatItem number="2500+" label="Premium Products" />
                <StatItem number="15k+" label="Happy Clients" />
                <StatItem number="24/7" label="Expert Support" />
                <StatItem number="50" label="Global Partners" />
            </div>
        </div>
    );
};

export default Stats;
