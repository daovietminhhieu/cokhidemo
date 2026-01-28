import { motion } from 'framer-motion';

const contentVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { delay: 0.4, duration: 0.4 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
};

const shutterVariants = {
    initial: { y: "100%" },
    animate: { y: "-100%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } },
    exit: { y: "0%", transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }
};

export default function PageTransition({ children }) {
    return (
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
            {/* Shutter Overlay */}
            <motion.div
                variants={shutterVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100vh',
                    background: '#101010', // Dark industrial color
                    zIndex: 9999,
                    pointerEvents: 'none', // Ensure clicks pass through when hidden/animating away
                }}
            />

            {/* Page Content */}
            <motion.div
                variants={contentVariants}
                initial="initial"
                animate="animate"
                exit="exit"
            >
                {children}
            </motion.div>
        </div>
    );
}
