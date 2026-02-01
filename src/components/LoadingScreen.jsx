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
                // Random increment for realistic feel
                const increment = Math.random() * 15;
                return Math.min(prev + increment, 100);
            });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    const handleEnter = () => {
        play(); // Start audio on user interaction
        onComplete();
    };

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                background: "#050505",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
            }}
        >
            <div style={{ position: "relative", width: "300px", textAlign: "center" }}>
                {/* TEXT */}
                <h2
                    style={{
                        fontFamily: "'Black Ops One', cursive",
                        fontSize: "2rem",
                        letterSpacing: "0.1em",
                        marginBottom: "1rem",
                        color: "#ff9557ee", // Construction Yellow
                        textTransform: "uppercase",
                    }}
                >
                    {showEnter ? "Ready" : "Initializing"}
                </h2>

                {/* PROGRESS BAR CONTAINER */}
                <div
                    style={{
                        width: "100%",
                        height: "4px",
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "2px",
                        overflow: "hidden",
                        position: "relative",
                        marginBottom: "1rem"
                    }}
                >
                    {/* PROGRESS BAR FILL */}
                    <motion.div
                        style={{
                            height: "100%",
                            background: "#FFC857",
                            width: `${progress}%`,
                            transition: "width 0.2s ease-out",
                        }}
                    />
                </div>

                {/* ENTER BUTTON OR PERCENTAGE */}
                <div style={{ height: "40px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <AnimatePresence mode="wait">
                        {showEnter ? (
                            <motion.button
                                key="enter-btn"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                onClick={handleEnter}
                                style={{
                                    background: "transparent",
                                    border: "1px solid #FFC857",
                                    color: "#FFC857",
                                    padding: "8px 24px",
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: "1rem",
                                    cursor: "pointer",
                                    textTransform: "uppercase",
                                    letterSpacing: "2px",
                                    outline: "none",
                                    fontWeight: "bold"
                                }}
                                whileHover={{ scale: 1.05, background: "rgba(255, 200, 87, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Enter Store
                            </motion.button>
                        ) : (
                            <motion.div
                                key="percentage"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                style={{
                                    width: "100%",
                                    fontFamily: "'Courier New', monospace",
                                    fontSize: "0.9rem",
                                    color: "rgba(255, 255, 255, 0.5)",
                                    display: "flex",
                                    justifyContent: "space-between",
                                }}
                            >
                                <span>SYSTEM_CHECK...</span>
                                <span>{Math.round(progress)}%</span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* BACKGROUND ELEMENTS (Grid/Decor) */}
            <div
                style={{
                    position: "absolute",
                    bottom: "2rem",
                    left: "0",
                    width: "100%",
                    textAlign: "center",
                    opacity: 0.3,
                    fontSize: "0.7rem",
                    letterSpacing: "0.2rem",
                }}
            >
                HARDWARE STORE © 2026
            </div>
        </motion.div>
    );
}
