import React, { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
} from "framer-motion";

function StickySection({ children, index }) {
  const ref = useRef(null);
  const containerRef = useRef(null);

  // Track scroll: when this section enters -> exits viewport
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "center start"],
  });

  // Map progress to visual transforms for a cinematic card flip/peel effect
  const y = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    ["30vh", "0vh", "-30vh"],
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.3, 1, 1, 0.3],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 0.9]);
  // REMOVED BLUR & SHADOW ANIMATIONS FOR PERFORMANCE

  return (
    <div
      style={{ position: "relative", minHeight: "100vh" }}
      ref={containerRef}
    >
      <motion.div
        ref={ref}
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          zIndex: 10 + index,
          overflow: "hidden",
          transformOrigin: "center center",
          perspective: "1200px",
          y,
          opacity,
          scale,
          willChange: "transform, opacity", // Optimized
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function PullToReveal({ children }) {
  const sections = React.Children.toArray(children);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {sections.map((child, index) => (
        <StickySection key={index} index={index}>
          {child}
        </StickySection>
      ))}
    </div>
  );
}
