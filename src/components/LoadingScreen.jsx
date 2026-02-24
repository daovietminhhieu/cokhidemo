import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../context/AudioContext";

const Letter = ({ char, index }) => (
    <motion.span
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
            duration: 0.8,
            delay: index * 0.05,
            ease: [0.215, 0.61, 0.355, 1],
        }}
        style={{
            display: "inline-block",
            color: "white",
            position: "relative",
            textShadow: "0 0 20px rgba(255,255,255,0.3)",
        }}
    >
        {char}
    </motion.span>
);

const GearIcon = ({ size = 100, color = "#FFA500", duration = 10, clockwise = true }) => (
    <motion.svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ rotate: 0 }}
        animate={{ rotate: clockwise ? 360 : -360 }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ opacity: 0.15, position: "absolute" }}
    >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </motion.svg>
);

const Screw = ({ style }) => (
    <div style={{
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        background: "rgba(255,165,0,0.2)",
        border: "1px solid rgba(255,165,0,0.3)",
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...style
    }}>
        <div style={{ width: "6px", height: "1px", background: "rgba(255,165,0,0.4)", transform: "rotate(45deg)" }} />
    </div>
);

const DataColumn = ({ left }) => {
    const data = ["#00FF23", "AUTH_REQ", "LOAD_SYS", "MEM_OK", "GEAR_SET", "V_CALIB", "D_SYNC", "AXIS_Z", "LINK_ST", "P_PRESS"];
    return (
        <div style={{
            position: "absolute",
            [left ? "left" : "right"]: "120px",
            top: "50%",
            transform: "translateY(-50%)",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            opacity: 0.1,
            fontFamily: "monospace",
            fontSize: "0.5rem",
            color: "#FFA500",
            pointerEvents: "none",
            zIndex: 5
        }}>
            {data.map((item, i) => (
                <motion.div
                    key={i}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                >
                    {item}
                </motion.div>
            ))}
        </div>
    );
};

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [showEnter, setShowEnter] = useState(false);
    const { play } = useAudio();

    useEffect(() => {
        // Lock body and html scroll aggressively
        const originalOverflowBody = document.body.style.overflow;
        const originalOverflowHtml = document.documentElement.style.overflow;

        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";
        document.body.style.height = "100%";
        document.documentElement.style.height = "100%";

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(() => setShowEnter(true), 400);
                    return 100;
                }
                const increment = Math.random() * 12 + 3;
                return Math.min(prev + increment, 100);
            });
        }, 120);

        return () => {
            clearInterval(timer);
            // Unlock scroll
            document.body.style.overflow = originalOverflowBody || "auto";
            document.documentElement.style.overflow = originalOverflowHtml || "auto";
            document.body.style.height = "auto";
            document.documentElement.style.height = "auto";
        };
    }, []);

    const handleEnter = () => {
        play();
        onComplete();
    };

    const titleChars = "inoxdiepduong".toUpperCase().split("");

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
            style={{
                position: "fixed",
                inset: 0,
                background: "#080809",
                zIndex: 9999,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
            }}
        >
            <style>{`
                html, body {
                    overflow: hidden !important;
                    height: 100% !important;
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                html::-webkit-scrollbar, body::-webkit-scrollbar {
                    display: none !important;
                }
            `}</style>

            {/* BLUEPRINT GRID */}
            <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `
                    linear-gradient(rgba(255,165,0,0.03) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255,165,0,0.03) 1px, transparent 1px)
                `,
                backgroundSize: "40px 40px",
                pointerEvents: "none",
                zIndex: 1,
            }} />

            {/* RADIAL SCAN EFFECT */}
            <motion.div
                animate={{
                    opacity: [0, 0.15, 0],
                    top: ["-10%", "110%"],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                style={{
                    position: "absolute",
                    left: 0,
                    right: 0,
                    height: "15vh",
                    background: "linear-gradient(transparent, rgba(255,165,0,0.2), transparent)",
                    zIndex: 2,
                    pointerEvents: "none",
                }}
            />

            {/* MECHANICAL ELEMENTS */}
            <div style={{ position: "absolute", top: "10%", left: "10%", pointerEvents: "none" }}>
                <GearIcon size={120} duration={15} />
            </div>
            <div style={{ position: "absolute", bottom: "10%", right: "10%", pointerEvents: "none" }}>
                <GearIcon size={150} duration={20} clockwise={false} />
            </div>
            <div style={{ position: "absolute", top: "15%", right: "15%", pointerEvents: "none" }}>
                <GearIcon size={80} duration={8} />
            </div>

            {/* CORNER BRACKETS */}
            <div style={{ position: "absolute", top: "40px", left: "40px", width: "80px", height: "80px", borderTop: "2px solid rgba(255,165,0,0.3)", borderLeft: "2px solid rgba(255,165,0,0.3)", zIndex: 10 }}>
                <Screw style={{ top: "-5px", left: "-5px" }} />
                <Screw style={{ top: "-5px", left: "75px" }} />
                <Screw style={{ top: "75px", left: "-5px" }} />
            </div>
            <div style={{ position: "absolute", top: "40px", right: "40px", width: "80px", height: "80px", borderTop: "2px solid rgba(255,165,0,0.3)", borderRight: "2px solid rgba(255,165,0,0.3)", zIndex: 10 }}>
                <Screw style={{ top: "-5px", right: "-5px" }} />
                <Screw style={{ top: "-5px", right: "75px" }} />
                <Screw style={{ top: "75px", right: "-5px" }} />
            </div>
            <div style={{ position: "absolute", bottom: "40px", left: "40px", width: "80px", height: "80px", borderBottom: "2px solid rgba(255,165,0,0.3)", borderLeft: "2px solid rgba(255,165,0,0.3)", zIndex: 10 }}>
                <Screw style={{ bottom: "-5px", left: "-5px" }} />
                <Screw style={{ bottom: "-5px", left: "75px" }} />
                <Screw style={{ bottom: "75px", left: "-5px" }} />
            </div>
            <div style={{ position: "absolute", bottom: "40px", right: "40px", width: "80px", height: "80px", borderBottom: "2px solid rgba(255,165,0,0.3)", borderRight: "2px solid rgba(255,165,0,0.3)", zIndex: 10 }}>
                <Screw style={{ bottom: "-5px", right: "-5px" }} />
                <Screw style={{ bottom: "-5px", right: "75px" }} />
                <Screw style={{ bottom: "75px", right: "-5px" }} />
            </div>

            {/* DATA COLUMNS */}
            <DataColumn left />
            <DataColumn />

            {/* AMBIENT BACKGROUND */}
            <motion.div
                animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: "absolute",
                    top: "20%",
                    left: "10%",
                    width: "40vw",
                    height: "40vw",
                    background: "radial-gradient(circle, rgba(255,165,0,0.08) 0%, transparent 70%)",
                    filter: "blur(60px)",
                    pointerEvents: "none",
                    zIndex: 0,
                }}
            />

            {/* LOGO SECTION */}
            <div style={{ textAlign: "center", marginBottom: "3rem", zIndex: 10, position: "relative" }}>
                {/* LOGO RETICLE */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "110%",
                        height: "150%",
                        border: "1px dashed rgba(255,165,0,0.1)",
                        borderRadius: "50%",
                        zIndex: -1,
                        pointerEvents: "none"
                    }}
                />

                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "8vw",
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: "0.05em",
                    marginBottom: "1rem",
                    fontFamily: "'Audiowide', sans-serif"
                }}>
                    {titleChars.map((char, i) => (
                        <Letter key={i} char={char} index={i} />
                    ))}
                </div>
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    style={{
                        height: "2px",
                        width: "100%",
                        maxWidth: "600px",
                        margin: "1rem auto",
                        background: "linear-gradient(90deg, transparent, rgba(255,165,0,0.5), transparent)",
                    }}
                />
                <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 0.6, y: 0 }}
                    transition={{ duration: 1, delay: 1.2 }}
                    style={{
                        fontSize: "1.2rem",
                        color: "white",
                        textTransform: "uppercase",
                        margin: 0,
                        marginTop: "1rem",
                        fontWeight: 400,
                        letterSpacing: "0.8em",
                    }}
                >
                    Vật liệu xây dựng & Cơ khí
                </motion.p>
            </div>

            {/* PROGRESS TRACKER */}
            <div style={{ width: "400px", position: "relative", zIndex: 10 }}>
                <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-end",
                    marginBottom: "0.8rem",
                    fontFamily: "'Share Tech Mono', monospace",
                }}>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", textTransform: "uppercase" }}>
                        {progress < 30 ? "Đang khởi tạo hệ thống..." :
                            progress < 60 ? "Đang tải cấu trúc cơ khí..." :
                                progress < 90 ? "Đang hiệu chuẩn thiết bị..." : "Sẵn sàng"}
                    </div>
                    <span style={{ fontSize: "1.4rem", color: "#FFA500", fontWeight: "bold" }}>
                        {Math.round(progress)}%
                    </span>
                </div>

                <div style={{
                    height: "4px",
                    width: "100%",
                    background: "rgba(255,255,255,0.05)",
                    position: "relative",
                    overflow: "hidden",
                    borderRadius: "2px",
                }}>
                    <motion.div
                        style={{
                            height: "100%",
                            background: "linear-gradient(90deg, #FFA500, #FFD700)",
                            width: `${progress}%`,
                            boxShadow: "0 0 15px rgba(255,165,0,0.5)",
                        }}
                    />
                </div>

                {/* TECHNICAL DATA STRIP */}
                {/* <div style={{
                    marginTop: "1rem",
                    display: "flex",
                    justifyContent: "space-between",
                    fontSize: "0.6rem",
                    color: "rgba(255,165,0,0.3)",
                    fontFamily: "monospace",
                    letterSpacing: "0.1em"
                }}>
                    <span>MÃ SỐ: CK-2026-X</span>
                    <span>TRẠNG THÁI: ĐANG CHẠY</span>
                    <span>HỆ SỐ TẢI: 0.985</span>
                </div> */}
            </div>

            {/* ACTION BUTTON */}
            <div style={{ height: "80px", marginTop: "4rem", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10 }}>
                <AnimatePresence>
                    {showEnter && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleEnter}
                            style={{
                                background: "transparent",
                                border: "5px solid rgba(255,165,0,0.5)",
                                borderRadius: "20px",
                                padding: "1rem 3.5rem",
                                color: "#FFA500",
                                fontSize: "0.9rem",
                                textTransform: "uppercase",
                                letterSpacing: "0.3em",
                                fontWeight: 600,
                                cursor: "pointer",
                                position: "relative",
                                transition: "all 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
                            }}
                        >
                            <div style={{ position: "relative", zIndex: 1 }}>Vào cửa hàng</div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileHover={{ opacity: 1 }}
                                style={{
                                    position: "absolute",
                                    inset: 0,
                                    background: "rgba(255,165,0,0.1)",
                                    boxShadow: "inset 0 0 20px rgba(255,165,0,0.2)",
                                    zIndex: 0,
                                }}
                            />
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>

            {/* CORNER DETAILS */}
            <div style={{
                position: "absolute",
                left: "40px",
                bottom: "40px",
                fontSize: "0.6rem",
                opacity: 0.2,
                letterSpacing: "0.1em",
                color: "white",
            }}>
                THIẾT LẬP 2026 / DỤNG CỤ CHÍNH XÁC
            </div>
        </motion.div>
    );
}
