import React from 'react';

const Marquee = () => {
    return (
        <div style={{
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            padding: '4rem 0',
            background: 'var(--bg-dark)',
            position: 'relative'
        }}>
            {/* Gradient Fade Edges */}
            <div style={{
                position: 'absolute', top: 0, left: 0, height: '100%', width: '150px',
                background: 'linear-gradient(to right, var(--bg-dark), transparent)', zIndex: 2
            }}></div>
            <div style={{
                position: 'absolute', top: 0, right: 0, height: '100%', width: '150px',
                background: 'linear-gradient(to left, var(--bg-dark), transparent)', zIndex: 2
            }}></div>

            <div className="marquee-content" style={{ display: 'inline-block' }}>
                <span className="marquee-text">PREMIUM TOOLS &nbsp;•&nbsp; LIFETIME WARRANTY &nbsp;•&nbsp; PRECISION ENGINEERING &nbsp;•&nbsp; INDUSTRIAL GRADE &nbsp;•&nbsp; </span>
                <span className="marquee-text">PREMIUM TOOLS &nbsp;•&nbsp; LIFETIME WARRANTY &nbsp;•&nbsp; PRECISION ENGINEERING &nbsp;•&nbsp; INDUSTRIAL GRADE &nbsp;•&nbsp; </span>
            </div>
        </div>
    );
};

export default Marquee;
