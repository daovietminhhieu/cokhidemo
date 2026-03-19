import React from "react";
import { Link } from "react-router-dom";

const IntroSheet = React.memo(({ style, t, hoveredCharIndex, setHoveredCharIndex }) => (
  <div style={style} className="sheet-content">
    <div className="container" style={{ position: "relative", zIndex: 2, userSelect: "none" }}>
      <div style={{ opacity: 1 }}>
        <div style={{ position: "relative", display: "inline-block", width: "100%", perspective: "1000px" }}>
          <h1 style={{ fontSize: "15vw", lineHeight: 0.8, letterSpacing: "-0.02em", color: "white", margin: "0 0 1rem 0", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 1, fontFamily: "'Black Ops One', cursive", textTransform: "uppercase", textAlign: "center", width: "100%" }}>
            {"Hardware".split("").map((char, idx) => (
              <span key={idx} style={{ display: "inline-block", transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)", transform: hoveredCharIndex === idx ? `translateY(-15px)` : "translateY(0)", animationName: hoveredCharIndex !== idx ? "float-subtle" : "none", animationDuration: "3s", animationTimingFunction: "ease-in-out", animationIterationCount: "infinite", animationDelay: `${idx * 0.1}s`, cursor: "pointer" }} onMouseEnter={() => setHoveredCharIndex(idx)} onMouseLeave={() => setHoveredCharIndex(-1)}>
                {char}
              </span>
            ))}
          </h1>
        </div>
        <h1 style={{ fontSize: "6vw", lineHeight: 0.8, letterSpacing: "-0.05em", color: "transparent", WebkitTextStroke: "2px white", margin: 0 }}>
          {t("shop_tagline")}
        </h1>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8vh", alignItems: "flex-end", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "2rem" }}>
        <p style={{ maxWidth: "400px", fontSize: "1.25rem", color: "var(--secondary)", lineHeight: 1.4 }}>
          {t("hero_desc")}
        </p>
        <Link to="/shop" className="btn-primary">
          {t("hero_cta")}
        </Link>
      </div>
    </div>
  </div>
));

export default IntroSheet;
