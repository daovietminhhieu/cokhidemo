import { useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';

export default function StickySection({ children, className }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end start']
    });

    // For "book" or "paper stack" feel, we keep the previous page solid and fixed.
    // No scaling or fading, just simple sticky stacking with shadow.
    const scale = useTransform(scrollYProgress, [0, 1], [1, 1]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 1]);

    return (
        <motion.div
            ref={container}
            style={{
                scale,
                opacity,
                transformOrigin: 'top center' // Ensure it stays pinned at top while shrinking
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
