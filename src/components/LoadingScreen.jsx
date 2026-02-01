import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../context/AudioContext";

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [showEnter, setShowEnter] = useState(false);
    const { play } = useAudio();

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setShowEnter(true);
                    return 100;
                }
                const increment = Math.random() * 8 + 4; // Smooth progression
                return Math.min(prev + increment, 100);
            });
        }, 100);

        return () => clearInterval(timer);
    }, []);

    const handleEnter = () => {
        setTimeout(() => {
            play();
        }, 100);
        onComplete();
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{
                opacity: 0,
                transition: { duration: 0.6, ease: "easeInOut" }
            }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "#1d1d1f", // đổi thành đen
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "#FFA500", // đổi text chính thành cam
                overflow: "hidden",
            }}
        >

            {/* Logo/Title */}
            <div style={{
                marginBottom: "4rem",
                textAlign: "center"
            }}>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{
                        fontSize: "2.5rem",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        margin: 0,
                        fontFamily: "system-ui, -apple-system, sans-serif"
                    }}
                >
                    inoxdiepduong.com
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.5 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    style={{
                        fontSize: "1rem",
                        fontWeight: 400,
                        marginTop: "0.5rem",
                        fontFamily: "system-ui, -apple-system, sans-serif"
                    }}
                >
                    Vật liệu xây dựng
                </motion.p>
            </div>

            {/* Progress Indicator */}
            <div style={{ width: "280px", marginBottom: "3rem" }}>
                <div style={{
                    height: "2px",
                    width: "100%",
                    background: "rgba(255,165,0,0.2)", // nền nhạt cam
                    borderRadius: "1px",
                    overflow: "hidden"
                }}>
                    <motion.div
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.3 }}
                        style={{
                            height: "100%",
                            background: "#FFA500", // thanh tiến trình cam
                            borderRadius: "1px"
                        }}
                    />
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginTop: "0.5rem",
                        fontSize: "0.875rem",
                        color: "rgba(255, 255, 255, 1)",
                        fontFamily: "system-ui, -apple-system, sans-serif"
                    }}
                >
                    <span>Đang tải</span>
                    <span>{Math.round(progress)}%</span>
                </motion.div>
            </div>

            {/* Enter Button */}
            <AnimatePresence>
                {showEnter && (
                    <motion.button
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        onClick={handleEnter}
                        style={{
                            background: "transparent",
                            color: "#FFA500",
                            border: "1.5px solid #FFA500",
                            padding: "0.875rem 2.5rem",
                            fontSize: "1rem",
                            fontWeight: 500,
                            borderRadius: "24px",
                            cursor: "pointer",
                            fontFamily: "system-ui, -apple-system, sans-serif",
                            letterSpacing: "-0.01em",
                            transition: "all 0.2s ease",
                        }}
                        whileHover={{
                            background: "#FFA500",
                            color: "#1d1d1f"
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        Vào cửa hàng
                    </motion.button>

                )}
            </AnimatePresence>

            {/* Subtle Animation */}
            <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    bottom: "-300px",
                    width: "600px",
                    height: "600px",
                    background: "radial-gradient(circle, rgba(255,165,0,0.05) 0%, transparent 70%)",
                    borderRadius: "50%",
                    pointerEvents: "none"
                }}
            />

        </motion.div>
    );
}