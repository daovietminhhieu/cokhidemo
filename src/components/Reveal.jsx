import React from 'react';
import { motion } from 'framer-motion';

export default function Reveal({ children, width = "fit-content" }) {
    return (
        <div style={{ position: "relative", width }}>
            <motion.div
                variants={{
                    hidden: { opacity: 0, y: 75 },
                    visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }} // Trigger every time
                transition={{ duration: 0.5, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </div>
    );
}

// Staggered reveal for lists
export function StaggerContainer({ children, className, style }) {
    return (
        <motion.div
            className={className}
            style={style}
            initial="hidden"
            whileInView="show"
            viewport={{ once: false, margin: "-50px" }}
            variants={{
                hidden: { opacity: 0 },
                show: {
                    opacity: 1,
                    transition: {
                        staggerChildren: 0.2
                    }
                }
            }}
        >
            {children}
        </motion.div>
    );
}

export function StaggerItem({ children, className, style }) {
    return (
        <motion.div
            className={className}
            style={style}
            variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0 }
            }}
        >
            {children}
        </motion.div>
    );
}
