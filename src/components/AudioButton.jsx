import React from 'react';
import { motion } from 'framer-motion';
import { useAudio } from '../context/AudioContext';

export default function AudioButton({ size = 56 }) {
    const { isPlaying, toggle } = useAudio();

    const iconSize = Math.round(size * 0.45);
    const barWidth = 3;
    const barGap = 2;
    const numberOfBars = 5;

    return (
        <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', marginRight: '1.5rem', pointerEvents: 'auto' }}>
            {/* Pulse Effect Background when playing */}
            {isPlaying && (
                <motion.div
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.6, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                    style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%',
                        background: 'rgba(255, 255, 255, 0.4)',
                        zIndex: 0
                    }}
                />
            )}

            <motion.button
                onClick={toggle}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                    backgroundColor: isPlaying ? 'rgba(255, 255, 255, 1)' : 'rgba(255, 255, 255, 0.05)',
                    borderColor: isPlaying ? 'transparent' : 'rgba(255, 255, 255, 0.3)',
                    color: isPlaying ? '#000' : '#fff',
                    boxShadow: isPlaying ? '0 0 25px rgba(255, 255, 255, 0.8)' : '0 4px 15px rgba(0, 0, 0, 0.2)'
                }}
                transition={{ duration: 0.3 }}
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    borderRadius: '50%',
                    border: '1px solid',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    zIndex: 1,
                    outline: 'none',
                    position: 'relative'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center', // Center vertically for waveform
                    justifyContent: 'center',
                    width: `${iconSize}px`,
                    height: `${iconSize}px`,
                    gap: `${barGap}px`
                }}>
                    {isPlaying ? (
                        /* Frequency Waveform Animation */
                        [...Array(numberOfBars)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{
                                    height: [
                                        // Randomize "frequency" effect
                                        `${Math.random() * 40 + 20}%`,
                                        `${Math.random() * 90 + 30}%`,
                                        `${Math.random() * 40 + 20}%`
                                    ]
                                }}
                                transition={{
                                    duration: 0.4,
                                    repeat: Infinity,
                                    repeatType: "reverse",
                                    ease: "easeInOut",
                                    // Stagger slightly or random delay
                                    delay: i * 0.1
                                }}
                                style={{
                                    width: `${barWidth}px`,
                                    backgroundColor: 'currentColor',
                                    borderRadius: '2px',
                                    minHeight: '20%'
                                }}
                            />
                        ))
                    ) : (
                        /* Play Icon */
                        <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: '2px' }}>
                            <path d="M8 5v14l11-7z" />
                        </svg>
                    )}
                </div>
            </motion.button>
        </div>
    );
}
