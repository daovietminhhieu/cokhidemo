import React from "react";
import Reveal from "../components/Reveal";

export default function About() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "6rem 2rem",
      }}
    >
      <Reveal width="80%">
        <div style={{ maxWidth: "900px", margin: "0 auto", color: "white" }}>
          <h1 style={{ fontSize: "3.2rem", marginBottom: "1rem" }}>
            About Hardware.Store
          </h1>
          <p style={{ color: "#ccc", fontSize: "1.05rem", lineHeight: 1.6 }}>
            We craft precision tools for creators and makers. Our mission is to
            provide durable, accurate, and thoughtfully engineered hardware that
            professionals can rely on. From material selection to final
            delivery, every step is optimized for performance and longevity.
          </p>

          <div
            style={{
              marginTop: "2.5rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
            }}
          >
            <div>
              <h3 style={{ marginBottom: "0.5rem" }}>Our Values</h3>
              <ul style={{ color: "#bbb" }}>
                <li>Precision engineering</li>
                <li>Material durability</li>
                <li>Customer-first service</li>
              </ul>
            </div>
            <div>
              <h3 style={{ marginBottom: "0.5rem" }}>Contact</h3>
              <p style={{ color: "#bbb" }}>
                Reach us at hello@hardware.store for wholesale and support.
              </p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
