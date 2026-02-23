import React, { useState, useEffect } from 'react';

const ScrollIndicator = () => {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="scroll-indicator" style={{ opacity: isVisible ? 0.8 : 0, transition: 'opacity 0.5s ease' }}>
            <div className="mouse">
                <div className="wheel"></div>
            </div>
            <div className="arrow">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    );
};

export default ScrollIndicator;
