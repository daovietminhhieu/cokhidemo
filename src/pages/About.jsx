import React from "react";
import Reveal from "../components/Reveal";
import { useLanguage } from "../context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
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
            {t("about_title")}
          </h1>
          <p style={{ color: "#ccc", fontSize: "1.05rem", lineHeight: 1.6 }}>
            {t("about_intro_1")}
          </p>
          <p style={{ color: "#ccc", fontSize: "1.05rem", lineHeight: 1.6, marginTop: "1rem" }}>
            {t("about_intro_2")}
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
              <h3 style={{ marginBottom: "0.5rem" }}>{t("about_values_title")}</h3>
              <ul style={{ color: "#bbb" }}>
                <li>{t("about_values_precision")}</li>
                <li>{t("about_values_durability")}</li>
                <li>{t("about_values_service")}</li>
              </ul>
            </div>
            <div>
              <h3 style={{ marginBottom: "0.5rem" }}>{t("about_contact_title")}</h3>
              <p style={{ color: "#bbb" }}>{t("about_contact_text")}</p>
            </div>
          </div>
        </div>
      </Reveal>
    </div>
  );
}
