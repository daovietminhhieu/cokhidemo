import React from "react";
import { useLanguage } from "../context/LanguageContext";
import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import Reveal from "./Reveal";

export default function Footer() {
  const { t } = useLanguage();
  const { scrollYProgress } = useScroll();

  // Animate footer based on scroll
  const footerOpacity = useTransform(scrollYProgress, [0.7, 1], [0.3, 1]);
  const footerY = useTransform(scrollYProgress, [0.7, 1], [40, 0]);
  const footerRotate = useTransform(scrollYProgress, [0.7, 1], [2, 0]);

  return (
    <motion.footer
      style={{
        padding: "4rem var(--spacing-container)",
        marginTop: "auto",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        position: "relative",
        zIndex: 10,
        scrollSnapAlign: "end",
        opacity: footerOpacity,
        y: footerY,
        rotateX: footerRotate,
      }}
    >
      <Reveal width="100%">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "4rem",
          }}
        >
          {/* Brand */}
          <motion.div
            style={{ maxWidth: "400px" }}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: false }}
          >
            <h2
              style={{
                fontSize: "2rem",
                marginBottom: "1rem",
                textTransform: "uppercase",
                letterSpacing: "-0.02em",
              }}
            >
              Hardware<span style={{ opacity: 0.5 }}>.Store</span>
            </h2>
            <p style={{ color: "#666", fontSize: "0.9rem" }}>
              Precision tools for the modern creator. <br />
              Engineered for those who demand excellence.
            </p>
          </motion.div>

          {/* Links */}
          <div style={{ display: "flex", gap: "4rem" }}>
            {[
              {
                title: "Explore",
                links: [
                  { label: "Home", to: "/" },
                  { label: "Shop", to: "/shop" },
                  { label: "Contact", to: "/contact" },
                ],
              },
              {
                title: "Connect",
                links: [
                  { label: "Instagram", to: "#" },
                  { label: "Twitter", to: "#" },
                  { label: "Email", to: "#" },
                ],
              },
            ].map((section, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                viewport={{ once: false }}
              >
                <h4
                  style={{
                    textTransform: "uppercase",
                    marginBottom: "1.5rem",
                    fontSize: "0.85rem",
                    color: "#888",
                  }}
                >
                  {section.title}
                </h4>
                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.8rem",
                  }}
                >
                  {section.links.map((link, linkIdx) => (
                    <motion.li
                      key={linkIdx}
                      whileHover={{ x: 5, color: "var(--accent)" }}
                      transition={{ duration: 0.2 }}
                    >
                      <Link
                        to={link.to}
                        style={{
                          fontSize: "1.1rem",
                          textDecoration: "none",
                          color: "inherit",
                        }}
                      >
                        {link.label}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid rgba(255,255,255,0.1)",
            display: "flex",
            justifyContent: "space-between",
            color: "#444",
            fontSize: "0.8rem",
            textTransform: "uppercase",
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: false }}
        >
          <span>&copy; {new Date().getFullYear()} HardwareStore</span>
          <span>All rights reserved</span>
        </motion.div>
      </Reveal>
    </motion.footer>
  );
}
