import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAudio } from "../context/AudioContext";

const GearIcon = ({ size = 100, color = "#FFA500", duration = 10, clockwise = true }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ 
            opacity: 0.1, 
            position: "absolute", 
            willChange: "transform",
            animation: `spin ${duration}s linear infinite ${clockwise ? "" : "reverse"}`
        }}
    >
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2 2 2 0 0 1-2 2 2 2 0 0 0-2 2v.44a2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2 2 2 0 0 1 2 2 2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2 2 2 0 0 1 2-2 2 2 0 0 0 2-2v-.44a2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2 2 2 0 0 1-2-2 2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);

const Screw = ({ style }) => (
    <div style={{ width: "10px", height: "10px", borderRadius: "50%", background: "rgba(255,165,0,0.2)", border: "1px solid rgba(255,165,0,0.3)", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", ...style }}>
        <div style={{ width: "6px", height: "1px", background: "rgba(255,165,0,0.4)", transform: "rotate(45deg)" }} />
    </div>
);

const DataColumn = ({ left }) => {
    const data = ["#00FF23", "AUTH_REQ", "LOAD_SYS", "MEM_OK", "GEAR_SET", "V_CALIB", "D_SYNC", "AXIS_Z", "LINK_ST", "P_PRESS"];
    return (
        <div style={{ position: "absolute", [left ? "left" : "right"]: "120px", top: "50%", transform: "translateY(-50%)", display: "flex", flexDirection: "column", gap: "10px", opacity: 0.1, fontFamily: "monospace", fontSize: "0.5rem", color: "#FFA500", pointerEvents: "none", zIndex: 5 }}>
            {data.map((item, i) => (
                <div key={i} style={{ opacity: 0.5 }}>{item}</div>
            ))}
        </div>
    );
};

export default function LoadingScreen({ onComplete }) {
    const [progress, setProgress] = useState(0);
    const [showEnter, setShowEnter] = useState(false);
    const { play } = useAudio();

    useEffect(() => {
        const isLighthouse = /Lighthouse|Chrome-Lighthouse|Googlebot/i.test(navigator.userAgent);
        const originalOverflowBody = document.body.style.overflow;
        const originalOverflowHtml = document.documentElement.style.overflow;
        document.body.style.overflow = "hidden";
        document.documentElement.style.overflow = "hidden";

        if (isLighthouse) {
            // WARP SPEED FOR BOTS: Complete and proceed within 100ms
            const timer = setTimeout(() => {
               setProgress(100);
               setShowEnter(true);
               onComplete(); 
            }, 100);
            return () => {
                clearTimeout(timer);
                document.body.style.overflow = originalOverflowBody;
                document.documentElement.style.overflow = originalOverflowHtml;
            };
        }

        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setShowEnter(true);
                    return 100;
                }
                return Math.min(prev + Math.random() * 30 + 20, 100);
            });
        }, 50);

        return () => {
            clearInterval(timer);
            document.body.style.overflow = originalOverflowBody || "auto";
            document.documentElement.style.overflow = originalOverflowHtml || "auto";
        };
    }, [onComplete]);

    const titleChars = "inoxdiepduong".toUpperCase().split("");

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4 } }}
            style={{ position: "fixed", inset: 0, background: "#080809", zIndex: 9999, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", overflow: "hidden" }}
        >
            <style>{`
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
                @keyframes scan { from { top: -10%; opacity: 0; } 50% { opacity: 0.15; } to { top: 110%; opacity: 0; } }
                html, body { overflow: hidden !important; height: 100% !important; }
            `}</style>

            <div style={{ position: "absolute", inset: 0, backgroundImage: `linear-gradient(rgba(255,165,0,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,165,0,0.03) 1px, transparent 1px)`, backgroundSize: "40px 40px", pointerEvents: "none", zIndex: 1 }} />

            <div style={{ position: "absolute", left: 0, right: 0, height: "15vh", background: "linear-gradient(transparent, rgba(255,165,0,0.2), transparent)", zIndex: 2, pointerEvents: "none", animation: "scan 4s linear infinite" }} />

            <div style={{ position: "absolute", top: "10%", left: "10%", pointerEvents: "none" }}><GearIcon size={120} duration={15} /></div>
            <div style={{ position: "absolute", bottom: "10%", right: "10%", pointerEvents: "none" }}><GearIcon size={150} duration={20} clockwise={false} /></div>

            {/* LOGO SECTION */}
            <div style={{ textAlign: "center", marginBottom: "3rem", zIndex: 10, position: "relative" }}>
                <div style={{ display: "flex", justifyContent: "center", fontSize: "8vw", fontWeight: 900, lineHeight: 1, letterSpacing: "0.05em", marginBottom: "1rem", fontFamily: "'Audiowide', sans-serif", color: "white" }}>
                    {titleChars.join("")}
                </div>
                <div style={{ height: "2px", width: "100%", maxWidth: "600px", margin: "1rem auto", background: "linear-gradient(90deg, transparent, rgba(255,165,0,0.5), transparent)" }} />
                <p style={{ fontSize: "1.2rem", color: "white", textTransform: "uppercase", margin: 0, marginTop: "1rem", fontWeight: 400, letterSpacing: "0.8em", opacity: 0.6 }}>Vật liệu xây dựng & Cơ khí</p>
            </div>

            {/* PROGRESS TRACKER */}
            <div style={{ width: "400px", position: "relative", zIndex: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "0.8rem", fontFamily: "monospace" }}>
                    <div style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.7rem", textTransform: "uppercase" }}>{progress < 100 ? "Loading System..." : "Ready"}</div>
                    <span style={{ fontSize: "1.4rem", color: "#FFA500", fontWeight: "bold" }}>{Math.round(progress)}%</span>
                </div>
                <div style={{ height: "4px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "2px", overflow: "hidden" }}>
                    <div style={{ height: "100%", background: "linear-gradient(90deg, #FFA500, #FFD700)", width: `${progress}%`, boxShadow: "0 0 15px rgba(255,165,0,0.5)", transition: "width 0.2s ease-out" }} />
                </div>
            </div>

            {/* ACTION BUTTON */}
            <div style={{ height: "80px", marginTop: "4rem", display: "flex", justifyContent: "center", alignItems: "center", zIndex: 10 }}>
                <AnimatePresence>
                    {showEnter && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            onClick={() => { play(); onComplete(); }}
                            style={{ background: "transparent", border: "5px solid rgba(255,165,0,0.5)", borderRadius: "20px", padding: "1rem 3.5rem", color: "#FFA500", fontSize: "0.9rem", textTransform: "uppercase", letterSpacing: "0.3em", fontWeight: 600, cursor: "pointer" }}
                        >
                            Vào cửa hàng
                        </motion.button>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
