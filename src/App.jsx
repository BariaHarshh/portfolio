import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import tdsImage from "./assets/images/TDS_project_photo.jpeg";
import character from "./assets/images/character.png";
import demoVideo from "./assets/videos/project_demo.mp4";

/* ═══════════════════════════════════════════════════════════════
   Design Tokens
═══════════════════════════════════════════════════════════════ */
const TEAL = "#2dd4bf";
const ORANGE = "#f97316";
const NAVY = "#050d1a";

/* ═══════════════════════════════════════════════════════════════
   Global Styles Injection
═══════════════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    html { scroll-behavior: smooth; }

    body {
      font-family: 'DM Sans', sans-serif;
      background: ${NAVY};
      color: #fff;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
    }

    ::-webkit-scrollbar { width: 5px; }
    ::-webkit-scrollbar-track { background: ${NAVY}; }
    ::-webkit-scrollbar-thumb { background: rgba(45,212,191,0.25); border-radius: 3px; }

    @keyframes twinkle {
      0%, 100% { opacity: 0.15; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.4); }
    }

    @keyframes orbit-spin {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(360deg); }
    }

    @keyframes orbit-spin-rev {
      from { transform: translate(-50%, -50%) rotate(0deg); }
      to { transform: translate(-50%, -50%) rotate(-360deg); }
    }

    @keyframes float-badge {
      0%, 100% { transform: translate(-50%, -50%) translateY(0px);   }
      50%       { transform: translate(-50%, -50%) translateY(-10px); }
    }

    @keyframes pulse-dot {
      0%, 100% { box-shadow: 0 0 0 0 rgba(45,212,191,0.4); }
      50% { box-shadow: 0 0 0 6px rgba(45,212,191,0); }
    }

    @keyframes scan-line {
      0% { transform: translateY(-100%); opacity: 0; }
      10%, 90% { opacity: 1; }
      100% { transform: translateY(100vh); opacity: 0; }
    }

    @keyframes gradient-anim {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    @keyframes counter-spin {
      from { transform: rotate(0deg); }
      to { transform: rotate(-360deg); }
    }

    @keyframes glow-pulse {
      0%, 100% { opacity: 0.5; }
      50% { opacity: 1; }
    }

    @keyframes fade-up {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }

    .nav-link {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.875rem;
      font-weight: 500;
      color: rgba(255,255,255,0.55);
      text-decoration: none;
      position: relative;
      transition: color 0.3s ease;
      letter-spacing: 0.01em;
    }
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 0;
      height: 1px;
      background: ${TEAL};
      transition: width 0.3s ease;
    }
    .nav-link:hover { color: rgba(255,255,255,0.9); }
    .nav-link:hover::after { width: 100%; }

    .skill-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 20px;
      padding: 28px 24px;
      text-align: center;
      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
      cursor: default;
      position: relative;
      overflow: hidden;
    }
    .skill-card::before {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(circle at 50% 0%, rgba(45,212,191,0.06) 0%, transparent 70%);
      opacity: 0;
      transition: opacity 0.4s ease;
    }
    .skill-card:hover {
      background: rgba(255,255,255,0.055);
      border-color: rgba(45,212,191,0.22);
      transform: translateY(-6px);
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 30px rgba(45,212,191,0.08);
    }
    .skill-card:hover::before { opacity: 1; }

    .project-card {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 24px;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.4,0,0.2,1);
    }
    .project-card:hover {
      border-color: rgba(45,212,191,0.2);
      box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 40px rgba(45,212,191,0.06);
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 14px 30px;
      background: linear-gradient(135deg, ${TEAL} 0%, #0ea5e9 50%, ${ORANGE} 100%);
      background-size: 200% 200%;
      animation: gradient-anim 4s ease infinite;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-weight: 600;
      font-size: 0.9rem;
      border-radius: 14px;
      border: none;
      cursor: pointer;
      text-decoration: none;
      letter-spacing: 0.02em;
      box-shadow: 0 0 40px rgba(45,212,191,0.3), inset 0 1px 0 rgba(255,255,255,0.15);
      transition: transform 0.25s ease, box-shadow 0.25s ease;
      position: relative;
      overflow: hidden;
    }
    .btn-primary::before {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 50%);
      opacity: 0;
      transition: opacity 0.3s;
    }
    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 0 60px rgba(45,212,191,0.45), 0 0 30px rgba(249,115,22,0.2), inset 0 1px 0 rgba(255,255,255,0.15);
    }
    .btn-primary:hover::before { opacity: 1; }

    .btn-secondary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 14px 30px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.1);
      color: rgba(255,255,255,0.8);
      font-family: 'DM Sans', sans-serif;
      font-weight: 500;
      font-size: 0.9rem;
      border-radius: 14px;
      cursor: pointer;
      text-decoration: none;
      backdrop-filter: blur(10px);
      transition: all 0.25s ease;
    }
    .btn-secondary:hover {
      background: rgba(45,212,191,0.1);
      border-color: rgba(45,212,191,0.3);
      color: #fff;
      box-shadow: 0 0 20px rgba(45,212,191,0.1);
    }

    .icon-btn {
      width: 48px; height: 48px;
      border-radius: 50%;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      display: flex; align-items: center; justify-content: center;
      color: rgba(255,255,255,0.6);
      text-decoration: none;
      transition: all 0.3s ease;
      backdrop-filter: blur(8px);
      flex-shrink: 0;
    }
    .icon-btn:hover {
      background: rgba(45,212,191,0.12);
      border-color: rgba(45,212,191,0.35);
      color: ${TEAL};
      box-shadow: 0 0 20px rgba(45,212,191,0.2);
    }

    .glow-input {
      width: 100%;
      padding: 14px 18px;
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      color: #fff;
      font-family: 'DM Sans', sans-serif;
      font-size: 0.95rem;
      outline: none;
      transition: all 0.3s ease;
    }
    .glow-input::placeholder { color: rgba(255,255,255,0.25); }
    .glow-input:focus {
      border-color: rgba(45,212,191,0.45);
      box-shadow: 0 0 24px rgba(45,212,191,0.12), 0 0 6px rgba(45,212,191,0.2);
      background: rgba(255,255,255,0.06);
    }

    .section-label {
      font-family: 'DM Sans', sans-serif;
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.18em;
      color: ${TEAL};
      text-transform: uppercase;
      margin-bottom: 14px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .section-title {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(2rem, 3.5vw, 2.8rem);
      background: linear-gradient(135deg, #fff 0%, rgba(255,255,255,0.7) 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      line-height: 1.15;
      margin-bottom: 1rem;
    }

    /* Responsive helpers */
    @media (max-width: 767px) {
      .hero-layout { flex-direction: column-reverse !important; padding-top: 90px !important; }
      .hero-right-col { width: 85vw !important; height: 60vw !important; margin: 0 auto; min-height: 280px !important; }
      .hero-left-col { max-width: 100% !important; text-align: center; }
      .hero-left-col .cta-row { justify-content: center; }
      .about-grid { grid-template-columns: 1fr !important; }
      .project-inner { grid-template-columns: 1fr !important; }
      .contact-grid { grid-template-columns: 1fr !important; }
      .nav-links { display: none !important; }
    }
    @media (max-width: 480px) {
      .skills-grid { grid-template-columns: repeat(2, 1fr) !important; }
      .contact-form-row { grid-template-columns: 1fr !important; }
    }
  `}</style>
);

/* ═══════════════════════════════════════════════════════════════
   Star Field
═══════════════════════════════════════════════════════════════ */
function StarField() {
  const stars = useMemo(() => Array.from({ length: 100 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 2.5 + 0.5,
    delay: Math.random() * 6,
    duration: Math.random() * 4 + 3,
  })), []);

  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {stars.map(s => (
        <div key={s.id} style={{
          position: "absolute",
          left: `${s.left}%`,
          top: `${s.top}%`,
          width: s.size,
          height: s.size,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.6)",
          animationName: "twinkle",
          animationDuration: `${s.duration}s`,
          animationDelay: `${s.delay}s`,
          animationIterationCount: "infinite",
          animationTimingFunction: "ease-in-out",
        }} />
      ))}
      {/* Subtle scan line */}
      <div style={{
        position: "absolute",
        left: 0,
        right: 0,
        height: 2,
        background: "linear-gradient(to right, transparent, rgba(45,212,191,0.04), transparent)",
        animation: "scan-line 12s linear infinite",
        pointerEvents: "none",
      }} />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Navbar
═══════════════════════════════════════════════════════════════ */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Skills", "Projects", "Contact"];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        zIndex: 100,
        padding: scrolled ? "12px 32px" : "20px 32px",
        background: scrolled ? "rgba(5,13,26,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "none",
        transition: "all 0.4s ease",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 36, height: 36,
          borderRadius: 10,
          background: `linear-gradient(135deg, ${TEAL}, #0ea5e9)`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "0.9rem", fontWeight: 800,
          fontFamily: "'Syne', sans-serif",
          boxShadow: `0 0 20px rgba(45,212,191,0.4)`,
          color: NAVY,
        }}>BH</div>
        <span style={{
          fontFamily: "'Syne', sans-serif",
          fontWeight: 700,
          fontSize: "0.95rem",
          color: "rgba(255,255,255,0.85)",
          letterSpacing: "0.01em",
        }}>Baria Harsh Ashokbhai</span>
      </div>

      {/* Nav links */}
      <div className="nav-links" style={{ display: "flex", gap: 36 }}>
        {links.map(l => (
          <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
        ))}
      </div>

      {/* CTA */}
      <div className="nav-links" style={{ display: "flex" }}>
        <a href="#contact" className="btn-primary" style={{ padding: "10px 22px", fontSize: "0.82rem" }}>
          Hire Me
          <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>

      {/* Mobile menu button */}
      <button
        style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer", padding: 4 }}
        className="mobile-menu-btn"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          {menuOpen ? <><path d="M18 6L6 18"/><path d="M6 6l12 12"/></> : <><path d="M3 12h18"/><path d="M3 6h18"/><path d="M3 18h18"/></>}
        </svg>
      </button>
    </motion.nav>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Orbital Badge  — uses direct top/left so framer transform
   on the parent doesn't collapse badge positions
═══════════════════════════════════════════════════════════════ */
function OrbitalBadge({ icon, label, angleDeg, containerW = 500, containerH = 500, delay = 0 }) {
  const rad  = (angleDeg * Math.PI) / 180;
  const rx   = containerW * 0.44;   // 44% of container width
  const ry   = containerH * 0.38;   // 38% of container height
  const cx   = containerW / 2;
  const cy   = containerH / 2;

  // raw pixel centre of badge
  const bx = cx + Math.sin(rad) * rx;
  const by = cy - Math.cos(rad) * ry;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.4 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      style={{
        position: "absolute",
        left: bx,
        top:  by,
        transform: "translate(-50%, -50%)",
        zIndex: 10,
      }}
    >
      {/* inner div carries the float CSS animation so framer doesn't override it */}
      <div style={{
        animation: `float-badge ${3.2 + delay * 0.4}s ${delay}s ease-in-out infinite`,
        background: "rgba(5,13,26,0.85)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(45,212,191,0.25)",
        borderRadius: 12,
        padding: "9px 14px",
        display: "flex",
        alignItems: "center",
        gap: 7,
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 14px rgba(45,212,191,0.12)",
        userSelect: "none",
        whiteSpace: "nowrap",
      }}>
        <span style={{ fontSize: "1.15rem", lineHeight: 1 }}>{icon}</span>
        <span style={{
          fontSize: 11,
          fontWeight: 600,
          color: "rgba(255,255,255,0.85)",
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "0.06em",
        }}>{label}</span>
      </div>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Hero Section
═══════════════════════════════════════════════════════════════ */
const SKILL_BADGES = [
  { icon: "⚛️", label: "React",  angleDeg:  -72, delay: 0.5 },
  { icon: "🐍", label: "Python", angleDeg:    0, delay: 0.7 },
  { icon: "📡", label: "IoT",    angleDeg:   72, delay: 0.9 },
  { icon: "🤖", label: "ML",     angleDeg:  144, delay: 0.6 },
  { icon: "💻", label: "JS",     angleDeg: -144, delay: 1.0 },
];

function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });
  const charX = useTransform(springX, v => v * 0.3);
  const charY = useTransform(springY, v => v * 0.3);

  const rightRef = useRef(null);
  const [colSize, setColSize] = useState({ w: 520, h: 560 });

  useEffect(() => {
    const el = rightRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setColSize({ w: width, h: height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const fn = e => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 14);
    };
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      overflow: "hidden",
      paddingBottom: 60,
    }}>
      {/* Background glows */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: `
          radial-gradient(ellipse 75% 60% at 62% 45%, rgba(10,28,55,0.9) 0%, rgba(5,13,26,0.96) 40%, ${NAVY} 90%),
          radial-gradient(circle at 15% 25%, rgba(45,212,191,0.12) 0%, transparent 45%),
          radial-gradient(circle at 85% 15%, rgba(249,115,22,0.08) 0%, transparent 40%),
          radial-gradient(circle at 65% 55%, rgba(14,165,233,0.15) 0%, transparent 50%)
        `,
      }}/>

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(rgba(45,212,191,0.14) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
        opacity: 0.65,
        maskImage: "radial-gradient(ellipse 70% 60% at center, black 0%, transparent 80%)",
        WebkitMaskImage: "radial-gradient(ellipse 70% 60% at center, black 0%, transparent 80%)",
      }}/>

      {/* Abstract corner shapes */}
      <div style={{
        position: "absolute",
        top: -120, right: -80,
        width: 500, height: 500,
        background: `conic-gradient(from 180deg at 50% 50%, ${TEAL}22 0deg, transparent 60deg, ${ORANGE}18 120deg, transparent 180deg)`,
        borderRadius: "60% 40% 55% 45%",
        filter: "blur(40px)",
        pointerEvents: "none",
        opacity: 0.7,
      }}/>
      <div style={{
        position: "absolute",
        bottom: -80, left: -100,
        width: 420, height: 420,
        background: `conic-gradient(from 0deg at 50% 50%, ${ORANGE}1a 0deg, transparent 80deg, ${TEAL}22 160deg, transparent 240deg)`,
        borderRadius: "45% 55% 40% 60%",
        filter: "blur(50px)",
        pointerEvents: "none",
        opacity: 0.6,
      }}/>

      {/* Main layout */}
      <div className="hero-layout" style={{
        display: "flex",
        flexWrap: "nowrap",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1380,
        margin: "0 auto",
        width: "100%",
        padding: "100px 5vw 0",
        position: "relative",
        zIndex: 5,
        gap: "2rem",
        minHeight: "calc(100vh - 100px)",
      }}>
        {/* LEFT */}
        <div className="hero-left-col" style={{ flex: "0 0 auto", maxWidth: 540, zIndex: 2 }}>
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.8rem, 5vw, 4.2rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.025em",
              margin: "0 0 8px",
            }}
          >
            Hi, I'm{" "}
            <span style={{
              background: `linear-gradient(135deg, ${TEAL} 0%, #0ea5e9 45%, ${ORANGE} 100%)`,
              backgroundSize: "200% 200%",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              animationName: "gradient-anim",
              animationDuration: "4s",
              animationIterationCount: "infinite",
              display: "inline-block",
            }}>Harsh</span>{" "}
            <span style={{ WebkitTextFillColor: "initial" }}>👋</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.18 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "clamp(1.5rem, 3vw, 2.4rem)",
              lineHeight: 1.25,
              color: "rgba(255,255,255,0.88)",
              marginBottom: 22,
              letterSpacing: "-0.015em",
            }}
          >
            I build modern web apps
            <br/>
            <span style={{ color: "rgba(255,255,255,0.5)" }}>and smart solutions.</span>
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.26 }}
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "rgba(255,255,255,0.4)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: 44,
              maxWidth: 420,
            }}
          >
            From pixel-perfect React interfaces to ML models and IoT systems —
            I turn ideas into things that actually work.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="cta-row"
            style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}
          >
            <a href="#projects" className="btn-primary">
              Explore My Work
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
            <a href="https://github.com/BariaHarshh" target="_blank" rel="noreferrer" className="icon-btn" title="GitHub">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>
            <a href="mailto:harshbaria9662@gmail.com" className="icon-btn" title="Email">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
            </a>
          </motion.div>

        </div>
        {/* END LEFT */}

        {/* RIGHT — Character + Orbital */}
        <motion.div
          ref={rightRef}
          className="hero-right-col"
          style={{
            x: charX, y: charY,
            position: "relative",
            flex: "1 1 50%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            minWidth: 320,
            minHeight: 500,
            height: "70vh",
            maxHeight: 800,
          }}
        >
          {/* Large glow behind character */}
          <div style={{
            position: "absolute",
            top: "50%", left: "50%",
            transform: "translate(-50%, -50%)",
            width: "90%", height: "90%",
            background: "radial-gradient(circle, rgba(14,165,233,0.2) 0%, rgba(45,212,191,0.12) 30%, rgba(249,115,22,0.04) 55%, transparent 70%)",
            filter: "blur(50px)",
            pointerEvents: "none",
            animationName: "glow-pulse",
            animationDuration: "3s",
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}/>

          {/* Orbit rings */}
          {[
            { size: 370, opacity: 0.12, speed: "45s", color: TEAL },
            { size: 490, opacity: 0.08, speed: "65s", color: "#0ea5e9" },
            { size: 600, opacity: 0.06, speed: "80s", color: TEAL },
          ].map(({ size, opacity, speed, color }, i) => (
            <div key={i} style={{
              position: "absolute",
              width: size, height: size,
              borderRadius: "50%",
              border: `1px solid rgba(45,212,191,${opacity})`,
              top: "50%", left: "50%",
              transform: `translate(-50%, -50%) rotate(${-15 + i * 10}deg)`,
              pointerEvents: "none",
              animationName: i % 2 === 0 ? "orbit-spin" : "orbit-spin-rev",
              animationDuration: speed,
              animationIterationCount: "infinite",
              animationTimingFunction: "linear",
            }}>
              {/* Orbit dot */}
              <div style={{
                position: "absolute",
                top: "50%",
                left: 0,
                transform: "translate(-50%, -50%)",
                width: i === 0 ? 6 : 4,
                height: i === 0 ? 6 : 4,
                borderRadius: "50%",
                background: color,
                boxShadow: `0 0 8px ${color}`,
              }}/>
            </div>
          ))}

          {/* Ground glow */}
          <div style={{
            position: "absolute",
            bottom: 0, left: "50%",
            transform: "translateX(-50%)",
            width: "75%", height: 100,
            background: `radial-gradient(ellipse, rgba(45,212,191,0.4) 0%, rgba(14,165,233,0.1) 40%, transparent 70%)`,
            filter: "blur(30px)",
            borderRadius: "50%",
            pointerEvents: "none",
          }}/>

          {/* Character */}
          <motion.img
            src={character}
            alt="Harsh — Developer"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              maxWidth: "78%",
              maxHeight: "82%",
              objectFit: "contain",
              objectPosition: "center bottom",
              filter: `drop-shadow(0 0 50px rgba(45,212,191,0.5)) drop-shadow(0 0 100px rgba(14,165,233,0.2))`,
              position: "relative",
              zIndex: 5,
            }}
          />

          {/* Floating badges */}
          {SKILL_BADGES.map(b => (
            <OrbitalBadge key={b.label} {...b} containerW={colSize.w} containerH={colSize.h} />
          ))}

          {/* "Open to Work" chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5, ease: "easeOut" }}
            // style={{
            //   position: "absolute",
            //   top: "4%",
            //   left: "50%",
            //   transform: "translateX(-50%)",
            //   background: "rgba(5,13,26,0.82)",
            //   backdropFilter: "blur(16px)",
            //   border: `1px solid rgba(45,212,191,0.25)`,
            //   borderRadius: 12,
            //   padding: "9px 16px",
            //   zIndex: 12,
            //   boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 16px rgba(45,212,191,0.1)",
            //   display: "flex",
            //   alignItems: "center",
            //   gap: 7,
            //   whiteSpace: "nowrap",
            // }}
          >
            <span style={{
              width: 7, height: 7,
              borderRadius: "50%",
              background: TEAL,
              boxShadow: `0 0 8px ${TEAL}`,
              animationName: "pulse-dot",
              animationDuration: "2s",
              animationIterationCount: "infinite",
              flexShrink: 0,
            }}/>
            {/* <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, color: TEAL, fontWeight: 600, letterSpacing: "0.05em" }}>
              Open to Work
            </span> */}
          </motion.div>

          {/* Sparkle corner */}
          <motion.div
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, scale: { duration: 3, repeat: Infinity } }}
            style={{
              position: "absolute",
              bottom: "10%", right: "6%",
              fontSize: "1.5rem",
              filter: "drop-shadow(0 0 8px rgba(249,115,22,0.6))",
              zIndex: 8,
            }}
          >✦</motion.div>
        </motion.div>
        {/* END RIGHT */}
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        style={{
          position: "absolute",
          bottom: 28, left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 6,
          zIndex: 10,
        }}
      >
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.6rem", color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em" }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${TEAL}88, transparent)` }}
        />
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Section Wrapper
═══════════════════════════════════════════════════════════════ */
function Section({ id, children, accent = false }) {
  return (
    <section id={id} style={{
      position: "relative",
      padding: "120px 5vw",
      background: accent
        ? "linear-gradient(to bottom, transparent, rgba(10,22,40,0.35) 30%, rgba(10,22,40,0.35) 70%, transparent)"
        : "transparent",
      zIndex: 1,
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {children}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   About Section
═══════════════════════════════════════════════════════════════ */
function AboutSection() {
  return (
    <Section id="about">
      <div className="about-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.5fr",
        gap: 56,
        alignItems: "center",
      }}>
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="section-label">
            <span style={{ width: 28, height: 1, background: TEAL, display: "inline-block" }}/>
            About Me
          </div>
          <h2 className="section-title">Passionate developer<br/>building smart things</h2>
          <p style={{
            color: "rgba(255,255,255,0.45)",
            fontSize: "1rem",
            lineHeight: 1.85,
            fontFamily: "'DM Sans', sans-serif",
            marginBottom: 28,
          }}>
            I'm a passionate developer specializing in React, Machine Learning,
            and IoT systems. Currently pursuing B.Tech at JG University, and
            building real-world solutions like TDS Monitoring Systems,
            Bluetooth-integrated apps, and intelligent ML-based models.
          </p>
          <p style={{
            color: "rgba(255,255,255,0.35)",
            fontSize: "0.95rem",
            lineHeight: 1.85,
            fontFamily: "'DM Sans', sans-serif",
          }}>
            When I'm not coding, I'm exploring new technologies, contributing to
            open-source projects, and experimenting with hardware prototypes.
          </p>

          {/* Mini stats */}
          <div style={{ display: "flex", gap: 16, marginTop: 36, flexWrap: "wrap" }}>
            {[
              { n: "B.Tech", sub: "JG University", note: "Current" },
              { n: "Diploma", sub: "Parul University", note: "2025" },
            ].map(({ n, sub, note }) => (
              <div key={n} style={{
                padding: "14px 20px",
                background: "rgba(45,212,191,0.05)",
                border: "1px solid rgba(45,212,191,0.12)",
                borderRadius: 14,
                textAlign: "center",
                flex: "1 1 auto",
              }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.05rem", color: TEAL }}>{n}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.55)", marginTop: 3 }}>{sub}</div>
                <div style={{
                  display: "inline-block",
                  marginTop: 6,
                  padding: "2px 8px",
                  background: note === "Current" ? `${TEAL}18` : "rgba(255,255,255,0.06)",
                  border: `1px solid ${note === "Current" ? TEAL + "30" : "rgba(255,255,255,0.1)"}`,
                  borderRadius: 6,
                  fontSize: "0.65rem",
                  color: note === "Current" ? TEAL : "rgba(255,255,255,0.35)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}>{note}</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right: highlights card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 24,
            padding: 36,
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Top gradient accent */}
          <div style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            height: 2,
            background: `linear-gradient(to right, ${TEAL}, #0ea5e9, ${ORANGE})`,
          }}/>
          <div style={{
            position: "absolute",
            top: -80, right: -80,
            width: 200, height: 200,
            background: `radial-gradient(circle, rgba(45,212,191,0.06) 0%, transparent 70%)`,
            borderRadius: "50%",
            pointerEvents: "none",
          }}/>

          <h3 style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "1.15rem",
            fontWeight: 700,
            color: "#fff",
            marginBottom: 24,
          }}>Quick Highlights</h3>

          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[
              { icon: "⚡", text: "React & Frontend Development", color: TEAL },
              { icon: "🤖", text: "Machine Learning (LSTM, Pose Estimation)", color: "#0ea5e9" },
              { icon: "🔌", text: "IoT & Arduino Integration", color: ORANGE },
              { icon: "📱", text: "React Native App Development", color: TEAL },
            ].map(({ icon, text, color }) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 40, height: 40,
                  borderRadius: 12,
                  background: `${color}12`,
                  border: `1px solid ${color}20`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.1rem",
                  flexShrink: 0,
                }}>{icon}</div>
                <span style={{
                  color: "rgba(255,255,255,0.65)",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "0.93rem",
                }}>{text}</span>
              </div>
            ))}
          </div>

          {/* Download CV button */}
          <a
            href="#"
            className="btn-secondary"
            style={{ marginTop: 28, width: "100%", justifyContent: "center" }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download CV
          </a>
        </motion.div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Skills Section
═══════════════════════════════════════════════════════════════ */
function SkillsSection() {
  const skills = [
    { icon: "⚛️", title: "React", desc: "Component-based UIs, hooks, state management", color: TEAL },
    { icon: "🐍", title: "Python", desc: "Data science, ML models, automation scripts", color: "#0ea5e9" },
    { icon: "🤖", title: "Machine Learning", desc: "LSTM, pose estimation, neural networks", color: ORANGE },
    { icon: "📡", title: "IoT", desc: "Arduino, HC-05, sensor integration systems", color: TEAL },
    { icon: "📱", title: "React Native", desc: "Cross-platform mobile app development", color: "#0ea5e9" },
    { icon: "💻", title: "JavaScript", desc: "ES6+, async patterns, DOM manipulation", color: "#f59e0b" },
  ];

  return (
    <Section id="skills" accent>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="section-label" style={{ justifyContent: "center" }}>
          <span style={{ width: 28, height: 1, background: TEAL, display: "inline-block" }}/>
          Technical Skills
          <span style={{ width: 28, height: 1, background: TEAL, display: "inline-block" }}/>
        </div>
        <motion.h2
          className="section-title"
          style={{ textAlign: "center", background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.65))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >My Skills</motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", maxWidth: 450, margin: "0 auto", lineHeight: 1.7 }}
        >
          Technologies and tools I use to bring ideas to life.
        </motion.p>
      </div>

      <div className="skills-grid" style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
        gap: 18,
      }}>
        {skills.map(({ icon, title, desc, color }, i) => (
          <motion.div
            key={title}
            className="skill-card"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.06 }}
            viewport={{ once: true }}
          >
            <div style={{
              width: 58, height: 58,
              borderRadius: 18,
              background: `${color}10`,
              border: `1px solid ${color}20`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "1.7rem",
              margin: "0 auto 18px",
              transition: "all 0.3s ease",
            }}>{icon}</div>
            <h3 style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 700,
              fontSize: "1rem",
              color: "#fff",
              marginBottom: 8,
            }}>{title}</h3>
            <p style={{
              color: "rgba(255,255,255,0.38)",
              fontSize: "0.83rem",
              lineHeight: 1.65,
              fontFamily: "'DM Sans', sans-serif",
            }}>{desc}</p>

            {/* Bottom accent */}
            <div style={{
              width: 32, height: 2,
              background: `linear-gradient(to right, ${color}, transparent)`,
              borderRadius: 2,
              margin: "16px auto 0",
              opacity: 0.6,
            }}/>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Projects Section
═══════════════════════════════════════════════════════════════ */
function ProjectsSection() {
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0); // 0 = image, 1 = video
  const videoRef = useRef(null);
  const scrollRef = useRef(null);

  const scrollToSlide = (idx) => {
    if (!scrollRef.current) return;
    const w = scrollRef.current.offsetWidth;
    scrollRef.current.scrollTo({ left: idx * w, behavior: "smooth" });
    // pause video when scrolling away
    if (idx === 0 && videoRef.current) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
    setActiveSlide(idx);
  };

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, offsetWidth } = scrollRef.current;
    const idx = Math.round(scrollLeft / offsetWidth);
    setActiveSlide(idx);
    if (idx === 0 && videoRef.current) {
      videoRef.current.pause();
      setVideoPlaying(false);
    }
  };

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoPlaying) { videoRef.current.pause(); }
    else { videoRef.current.play(); }
    setVideoPlaying(!videoPlaying);
  };

  return (
    <Section id="projects">
      {/* CSS for scrollbar hiding + smooth snap */}
      <style>{`
        .media-scroll::-webkit-scrollbar { display: none; }
        .media-scroll { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="section-label" style={{ justifyContent: "center" }}>
          <span style={{ width: 28, height: 1, background: TEAL }}/>
          Featured Work
          <span style={{ width: 28, height: 1, background: TEAL }}/>
        </div>
        <motion.h2
          className="section-title"
          style={{ textAlign: "center", background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.65))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >Featured Projects</motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", maxWidth: 460, margin: "0 auto", lineHeight: 1.7 }}
        >Real-world solutions built with modern technologies.</motion.p>
      </div>

      {/* ── Single project card ── */}
      <motion.div
        className="project-card"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75 }}
        viewport={{ once: true }}
        style={{ position: "relative", overflow: "hidden" }}
      >
        {/* Top gradient line */}
        <div style={{
          position: "absolute", top: 0, left: "10%", right: "10%", height: 1, zIndex: 2,
          background: `linear-gradient(to right, transparent, ${TEAL}66, ${ORANGE}44, transparent)`,
        }}/>

        <div className="project-inner" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>

          {/* ── LEFT: text ── */}
          <div style={{ padding: "44px 40px" }}>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              padding: "5px 12px", background: `${TEAL}10`, border: `1px solid ${TEAL}25`,
              borderRadius: 8, marginBottom: 20,
            }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "0.7rem", color: TEAL, fontWeight: 700, letterSpacing: "0.1em" }}>PROJECT #01</span>
            </div>
            <h3 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.65rem", color: "#fff", marginBottom: 16, lineHeight: 1.25 }}>
              Smart TDS Monitoring System
            </h3>
            <p style={{ color: "rgba(255,255,255,0.42)", fontSize: "0.93rem", lineHeight: 1.8, marginBottom: 26, fontFamily: "'DM Sans', sans-serif" }}>
              A real-time water quality monitoring system built using Arduino,
              HC-05 Bluetooth module, and a React Native mobile application. The
              system measures TDS levels and allows users to control and monitor
              data through a modern mobile interface.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
              {["React Native", "Arduino", "HC-05", "Bluetooth"].map(t => (
                <span key={t} style={{
                  padding: "6px 14px", background: `${TEAL}08`, border: `1px solid ${TEAL}18`,
                  borderRadius: 8, color: "rgba(255,255,255,0.55)", fontSize: "0.78rem",
                  fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
                }}>{t}</span>
              ))}
            </div>
            <div style={{ display: "flex", gap: 12 }}>
              <a href="#" className="btn-primary" style={{ padding: "11px 24px", fontSize: "0.85rem" }}>
                Live Demo
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
              <a href="https://github.com/BariaHarshh" target="_blank" rel="noreferrer" className="btn-secondary" style={{ padding: "11px 24px", fontSize: "0.85rem" }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
                GitHub
              </a>
            </div>
          </div>

          {/* ── RIGHT: scrollable media strip ── */}
          <div style={{ position: "relative", minHeight: 360, display: "flex", flexDirection: "column" }}>

            {/* Scroll hint label + dot indicators */}
            <div style={{
              position: "absolute", top: 14, right: 14, zIndex: 5,
              display: "flex", alignItems: "center", gap: 8,
            }}>
              {/* Dot indicators */}
              {[0, 1].map(i => (
                <button key={i} onClick={() => scrollToSlide(i)} style={{
                  width: activeSlide === i ? 20 : 7,
                  height: 7,
                  borderRadius: 4,
                  background: activeSlide === i ? TEAL : "rgba(255,255,255,0.25)",
                  border: "none", cursor: "pointer", padding: 0,
                  transition: "all 0.35s ease",
                  boxShadow: activeSlide === i ? `0 0 8px ${TEAL}88` : "none",
                }}/>
              ))}
            </div>

            {/* Scroll-right nudge arrow (visible only on slide 0) */}
            {activeSlide === 0 && (
              <button
                onClick={() => scrollToSlide(1)}
                style={{
                  position: "absolute", right: 14, top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 5,
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(5,13,26,0.78)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid ${TEAL}40`,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  boxShadow: `0 0 18px ${TEAL}30`,
                  animation: "float-badge 2.4s ease-in-out infinite",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            )}

            {/* Scroll-left arrow (visible only on slide 1) */}
            {activeSlide === 1 && (
              <button
                onClick={() => scrollToSlide(0)}
                style={{
                  position: "absolute", left: 14, top: "50%",
                  transform: "translateY(-50%)",
                  zIndex: 5,
                  width: 40, height: 40, borderRadius: "50%",
                  background: "rgba(5,13,26,0.78)",
                  backdropFilter: "blur(12px)",
                  border: `1px solid rgba(255,255,255,0.15)`,
                  cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}

            {/* The horizontal scroll container */}
            <div
              ref={scrollRef}
              className="media-scroll"
              onScroll={handleScroll}
              style={{
                display: "flex",
                overflowX: "scroll",
                scrollSnapType: "x mandatory",
                flex: 1,
              }}
            >
              {/* Slide 1 — Photo */}
              <div style={{
                flex: "0 0 100%",
                scrollSnapAlign: "start",
                position: "relative",
                overflow: "hidden",
                minHeight: 360,
              }}>
                <img src={tdsImage} alt="TDS Project" style={{
                  width: "100%", height: "100%", objectFit: "cover", display: "block",
                }}/>
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(45,212,191,0.06) 0%, transparent 60%)`, pointerEvents: "none" }}/>
                {/* "Swipe for video" hint at bottom */}
                <div style={{
                  position: "absolute", bottom: 14, left: "50%", transform: "translateX(-50%)",
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "6px 14px",
                  background: "rgba(5,13,26,0.78)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 20,
                  whiteSpace: "nowrap",
                }}>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.5)", fontWeight: 500 }}>
                    Scroll for demo video
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6"/>
                  </svg>
                </div>
              </div>

              {/* Slide 2 — Video */}
              <div style={{
                flex: "0 0 100%",
                scrollSnapAlign: "start",
                position: "relative",
                overflow: "hidden",
                minHeight: 360,
                background: "#000",
              }}>
                {/* Replace src with your actual video import */}
                <video
                  ref={videoRef}
                  src={demoVideo}
                  poster={tdsImage}
                  loop
                  playsInline
                  onPlay={() => setVideoPlaying(true)}
                  onPause={() => setVideoPlaying(false)}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, rgba(249,115,22,0.05) 0%, transparent 60%)`, pointerEvents: "none" }}/>

                {/* Play / Pause overlay */}
                <button
                  onClick={toggleVideo}
                  style={{
                    position: "absolute", inset: 0, width: "100%", height: "100%",
                    background: "transparent", border: "none", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}
                >
                  <motion.div
                    animate={{ scale: videoPlaying ? 0.85 : 1, opacity: videoPlaying ? 0 : 1 }}
                    transition={{ duration: 0.25 }}
                    style={{
                      width: 64, height: 64, borderRadius: "50%",
                      background: "rgba(5,13,26,0.78)",
                      backdropFilter: "blur(14px)",
                      border: `2px solid ${TEAL}`,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      boxShadow: `0 0 28px ${TEAL}55`,
                    }}
                  >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill={TEAL}>
                      <polygon points="5,3 19,12 5,21"/>
                    </svg>
                  </motion.div>
                </button>

                {/* Pause tap area while playing */}
                {videoPlaying && (
                  <button onClick={toggleVideo} style={{ position: "absolute", inset: 0, background: "transparent", border: "none", cursor: "pointer" }}/>
                )}

                {/* Video badge */}
                <div style={{
                  position: "absolute", bottom: 14, left: 14,
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "5px 12px",
                  background: "rgba(5,13,26,0.82)",
                  backdropFilter: "blur(10px)",
                  border: `1px solid ${TEAL}25`,
                  borderRadius: 8,
                }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={TEAL} strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/>
                  </svg>
                  <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.6)", fontWeight: 500 }}>
                    Demo Video
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* END right media strip */}

        </div>
      </motion.div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Contact Section
═══════════════════════════════════════════════════════════════ */
function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <Section id="contact" accent>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <div className="section-label" style={{ justifyContent: "center" }}>
          <span style={{ width: 28, height: 1, background: TEAL }}/>
          Contact
          <span style={{ width: 28, height: 1, background: TEAL }}/>
        </div>
        <motion.h2
          className="section-title"
          style={{ textAlign: "center", background: "linear-gradient(135deg, #fff, rgba(255,255,255,0.65))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >Get In Touch</motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          style={{ color: "rgba(255,255,255,0.35)", fontFamily: "'DM Sans', sans-serif", maxWidth: 420, margin: "0 auto", lineHeight: 1.7 }}
        >Interested in working together or have a project in mind? Feel free to reach out.</motion.p>
      </div>

      <div className="contact-grid" style={{
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        gap: 32,
        maxWidth: 900,
        margin: "0 auto",
      }}>
        {/* Left: contact info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          style={{ display: "flex", flexDirection: "column", gap: 16 }}
        >
          {[
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
              label: "Email",
              value: "harshbaria9662@gmail.com",
              href: "mailto:harshbaria9662@gmail.com",
            },
            {
              icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
              label: "GitHub",
              value: "@BariaHarshh",
              href: "https://github.com/BariaHarshh",
            },
          ].map(({ icon, label, value, href }) => (
            <a key={label} href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
              style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 14,
                padding: "18px 20px",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 16,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(45,212,191,0.06)";
                e.currentTarget.style.borderColor = "rgba(45,212,191,0.18)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, background: `${TEAL}10`, border: `1px solid ${TEAL}20`, display: "flex", alignItems: "center", justifyContent: "center", color: TEAL, flexShrink: 0 }}>
                {icon}
              </div>
              <div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.72rem", color: "rgba(255,255,255,0.35)", marginBottom: 3 }}>{label}</div>
                <div style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.75)", fontWeight: 500 }}>{value}</div>
              </div>
            </a>
          ))}

          {/* Availability block */}
          <div style={{
            padding: "20px",
            background: `${TEAL}06`,
            border: `1px solid ${TEAL}18`,
            borderRadius: 16,
            marginTop: 4,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: TEAL, boxShadow: `0 0 8px ${TEAL}`, animationName: "pulse-dot", animationDuration: "2s", animationIterationCount: "infinite" }}/>
              <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.85rem", color: TEAL }}>Available for Freelance</span>
            </div>
            <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.8rem", color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>
              Currently open to new projects and exciting opportunities.
            </p>
          </div>
        </motion.div>

        {/* Right: form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          viewport={{ once: true }}
          style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: 24,
            padding: 36,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{
            position: "absolute",
            top: 0, left: "20%", right: "20%",
            height: 1,
            background: `linear-gradient(to right, transparent, ${TEAL}66, transparent)`,
          }}/>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div className="contact-form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              <input type="text" placeholder="Your Name" className="glow-input"
                value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
              <input type="email" placeholder="Your Email" className="glow-input"
                value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <textarea placeholder="Your Message" rows={5} className="glow-input" style={{ resize: "vertical" }}
              value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} />
            <button type="submit" className="btn-primary" style={{ justifyContent: "center", width: "100%", opacity: sent ? 0.7 : 1 }}>
              {sent ? "Message Sent! ✓" : "Send Message"}
              {!sent && (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 2L11 13"/><path d="M22 2L15 22L11 13L2 9L22 2Z"/>
                </svg>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </Section>
  );
}

/* ═══════════════════════════════════════════════════════════════
   Footer
═══════════════════════════════════════════════════════════════ */
function Footer() {
  return (
    <footer style={{
      position: "relative",
      zIndex: 1,
      padding: "40px 5vw 32px",
      textAlign: "center",
    }}>
      <div style={{
        width: 240, height: 1,
        margin: "0 auto 28px",
        background: `linear-gradient(to right, transparent, ${TEAL}55, ${ORANGE}33, transparent)`,
      }}/>

      <div style={{ display: "flex", justifyContent: "center", gap: 14, marginBottom: 20 }}>
        {[
          {
            href: "https://github.com/BariaHarshh",
            title: "GitHub",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>,
          },
          {
            href: "mailto:harshbaria9662@gmail.com",
            title: "Email",
            icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 7l10 7 10-7"/></svg>,
          },
        ].map(({ href, title, icon }) => (
          <a key={title} href={href} title={title} className="icon-btn" style={{ width: 38, height: 38, borderRadius: 10 }}
            target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}
          >{icon}</a>
        ))}
      </div>

      <p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.75rem", color: "rgba(255,255,255,0.18)" }}>
        © 2026 Baria Harsh. Crafted with React & Tailwind.
      </p>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════════════════
   App
═══════════════════════════════════════════════════════════════ */
export default function App() {
  return (
    <div style={{ background: NAVY, minHeight: "100vh", position: "relative" }}>
      <GlobalStyles />
      <StarField />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}