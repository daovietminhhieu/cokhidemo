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
        <div className="section container">
            <div className="glass" style={{
                padding: '4rem',
                borderRadius: '20px',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '2rem'
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
