import { motion } from "framer-motion";

const easeSlow = [0.65, 0, 0.35, 1];

const panelVariant = (direction) => ({
    initial: { x: "0%" },
    animate: {
        x: direction === "left" ? "-100%" : "100%",
        transition: {
            duration: 1.4, // CHẬM HƠN
            ease: easeSlow,
        },
    },
    exit: {
        x: "0%",
        transition: {
            duration: 1.2,
            ease: easeSlow,
        },
    },
});

const contentVariants = {
    initial: { opacity: 0, scale: 0.98 },
    animate: {
        opacity: 1,
        scale: 1,
        transition: {
            delay: 0.6,
            duration: 0.6,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        scale: 0.99,
        transition: { duration: 0.3 },
    },
};

const HardwareText = ({ text, align }) => (
    <div
        style={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            fontSize: "clamp(1.8rem, 6vw, 4.5rem)",
            fontWeight: 700,
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "transparent",
            WebkitTextStroke: "1px rgba(255,255,255,0.35)",
            whiteSpace: "nowrap",
            userSelect: "none",
            pointerEvents: "none",
            ...(align === "right" ? { right: 0 } : { left: 0 }),
        }}
    >
        {text}
    </div>
);


export default function PageTransition({
    children,
    label1 = "HARD",
    label2 = "WARE"
}) {
    return (
        <div style={{ position: "relative", width: "100%" }}>
            {/* LEFT PANEL */}
            <motion.div
                variants={panelVariant("left")}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "50%",
                    height: "100vh",
                    background: "#0b0b0b",
                    zIndex: 9999,
                    overflow: "hidden",
                    pointerEvents: "none",
                }}
            >
                <HardwareText text={label1} align="right" />
            </motion.div>


            {/* RIGHT PANEL */}
            <motion.div
                variants={panelVariant("right")}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                    position: "fixed",
                    top: 0,
                    right: 0,
                    width: "50%",
                    height: "100vh",
                    background: "#0b0b0b",
                    zIndex: 9999,
                    overflow: "hidden",
                    pointerEvents: "none",
                }}
            >
                <HardwareText text={label2} align="left" />
            </motion.div>


            {/* PAGE CONTENT */}
            <motion.div
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ position: "relative", zIndex: 1 }}
            >
                {children}
            </motion.div>
        </div>
    );
}
