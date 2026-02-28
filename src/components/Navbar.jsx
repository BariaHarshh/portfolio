import { motion } from "framer-motion";
import { useState, useEffect } from "react";

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "About", href: "#about" },
    { label: "Skills", href: "#skills" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          zIndex: 50,
          background: scrolled
            ? "rgba(5, 13, 26, 0.75)"
            : "rgba(5, 13, 26, 0.3)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          borderBottom: scrolled
            ? "1px solid rgba(45, 212, 191, 0.1)"
            : "1px solid rgba(255, 255, 255, 0.05)",
          transition: "background 0.4s ease, border-color 0.4s ease",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
          }}
        >
          {/* Logo */}
          <a
            href="#"
            style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              fontWeight: 800,
              fontSize: "1.15rem",
              background: "linear-gradient(135deg, #2dd4bf, #0ea5e9)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            Baria Harsh Ashokbhai
          </a>

          {/* Desktop Nav Links */}
          <div
            style={{
              display: "flex",
              gap: 32,
              alignItems: "center",
            }}
            className="nav-links-desktop"
          >
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 14,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.6)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.3s ease",
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = "#2dd4bf";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = "rgba(255,255,255,0.6)";
                }}
              >
                {label}
              </a>
            ))}

            {/* Contact CTA */}
            <a
              href="#contact"
              style={{
                padding: "8px 20px",
                background: "linear-gradient(135deg, rgba(45, 212, 191, 0.15), rgba(249, 115, 22, 0.1))",
                border: "1px solid rgba(45, 212, 191, 0.25)",
                borderRadius: 10,
                color: "#2dd4bf",
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(45, 212, 191, 0.25), rgba(249, 115, 22, 0.15))";
                e.currentTarget.style.borderColor = "rgba(45, 212, 191, 0.45)";
                e.currentTarget.style.boxShadow = "0 0 20px rgba(45, 212, 191, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "linear-gradient(135deg, rgba(45, 212, 191, 0.15), rgba(249, 115, 22, 0.1))";
                e.currentTarget.style.borderColor = "rgba(45, 212, 191, 0.25)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              Let's Talk
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="nav-mobile-toggle"
            style={{
              display: "none",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 8,
            }}
            aria-label="Toggle navigation menu"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <span
                style={{
                  width: 22,
                  height: 2,
                  background: "#2dd4bf",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  transform: mobileOpen ? "rotate(45deg) translate(5px, 5px)" : "none",
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 2,
                  background: "#2dd4bf",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  opacity: mobileOpen ? 0 : 1,
                }}
              />
              <span
                style={{
                  width: 22,
                  height: 2,
                  background: "#2dd4bf",
                  borderRadius: 2,
                  transition: "all 0.3s",
                  transform: mobileOpen ? "rotate(-45deg) translate(5px, -5px)" : "none",
                }}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, x: "100%" }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: "100%" }}
          transition={{ duration: 0.3 }}
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "75vw",
            maxWidth: 320,
            height: "100vh",
            background: "rgba(5, 13, 26, 0.95)",
            backdropFilter: "blur(30px)",
            zIndex: 49,
            display: "flex",
            flexDirection: "column",
            padding: "100px 32px 32px",
            gap: 24,
            borderLeft: "1px solid rgba(45, 212, 191, 0.1)",
          }}
        >
          {navLinks.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 18,
                fontWeight: 500,
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
                padding: "8px 0",
                borderBottom: "1px solid rgba(255,255,255,0.05)",
                transition: "color 0.3s",
              }}
            >
              {label}
            </a>
          ))}
        </motion.div>
      )}

      {/* Backdrop overlay for mobile */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 48,
          }}
        />
      )}

      {/* Inline responsive CSS */}
      <style>{`
        @media (max-width: 767px) {
          .nav-links-desktop { display: none !important; }
          .nav-mobile-toggle { display: block !important; }
        }
      `}</style>
    </>
  );
}

export default Navbar;