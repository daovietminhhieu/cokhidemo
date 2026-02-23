import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";

function StickySection({ children, index }) {
  const ref = useRef(null);
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

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
      style={{ position: "relative", minHeight: isMobile ? "auto" : "100vh" }}
      ref={containerRef}
    >
      <motion.div
        ref={ref}
        style={{
          position: isMobile ? "static" : "sticky",
          top: isMobile ? "auto" : 0,
          height: isMobile ? "auto" : "100vh",
          zIndex: 10 + index,
          overflow: isMobile ? "visible" : "hidden",
          transformOrigin: "center center",
          perspective: "1200px",
          y: isMobile ? 0 : y,
          opacity: isMobile ? 1 : opacity,
          scale: isMobile ? 1 : scale,
          willChange: isMobile ? "auto" : "transform, opacity",
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
