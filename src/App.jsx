import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import tdsImage from "./assets/images/TDS_project_photo.jpeg";
import character from "./assets/images/character.png";

/* ─────────────────────────────────────────────────────────────────
   Single shared background colour used by EVERY section.
   This eliminates the hard colour break when scrolling.
───────────────────────────────────────────────────────────────── */
const PAGE_BG = "#05091a";

/* ─── Floating Tech Badge ────────────────────────────────────── */
function FloatingIcon({ icon, label, style, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1, y: [0, -10, 0] }}
      transition={{
        opacity: { duration: 0.6, delay },
        scale:   { duration: 0.6, delay },
        y:       { duration: 3.2 + delay, repeat: Infinity, ease: "easeInOut", delay },
      }}
      style={{
        position: "absolute",
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(14px)",
        border: "1px solid rgba(255,255,255,0.13)",
        borderRadius: 14,
        padding: "9px 14px",
        display: "flex",
        alignItems: "center",
        gap: 7,
        boxShadow: "0 8px 28px rgba(0,0,0,0.35)",
        zIndex: 10,
        userSelect: "none",
        ...style,
      }}
    >
      <span style={{ fontSize: "1.25rem", lineHeight: 1 }}>{icon}</span>
      {label && (
        <span
          style={{
            fontSize: 11,
            fontWeight: 600,
            color: "rgba(255,255,255,0.78)",
            fontFamily: "'Space Grotesk', sans-serif",
            letterSpacing: "0.05em",
          }}
        >
          {label}
        </span>
      )}
    </motion.div>
  );
}

/* ─── Hero Section ───────────────────────────────────────────── */
function HeroSection() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fn = (e) =>
      setMouse({
        x: (e.clientX / window.innerWidth  - 0.5) * 14,
        y: (e.clientY / window.innerHeight - 0.5) * 9,
      });
    window.addEventListener("mousemove", fn);
    return () => window.removeEventListener("mousemove", fn);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        minHeight: "100vh",
        /*
          The hero gradient starts from a bright navy at 60% and
          blends cleanly into PAGE_BG at 100% — matching every
          other section so there is no visible colour seam.
        */
        background: `radial-gradient(ellipse 78% 68% at 62% 44%,
          #0c1d50 0%,
          #080f2e 42%,
          ${PAGE_BG} 100%)`,
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
      }}
    >
      {/* ── Fonts + keyframes ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

        @keyframes ping-slow {
          0%,100% { opacity:.5;  transform:scale(1);    }
          50%      { opacity:1;   transform:scale(1.18); }
        }
        @keyframes dot-in {
          from { opacity:0; }
          to   { opacity:1; }
        }
      `}</style>

      {/* Dot grid */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "radial-gradient(rgba(99,179,237,0.26) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
        opacity: 0,
        animation: "dot-in 1.2s ease forwards 0.3s",
        pointerEvents: "none",
      }} />

      {/* Right glow blob (behind character) */}
      <div style={{
        position: "absolute", right: "7%", top: "50%",
        transform: "translateY(-50%)",
        width: 660, height: 660, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(37,99,235,0.24) 0%, rgba(14,165,233,0.09) 38%, transparent 68%)",
        filter: "blur(58px)", pointerEvents: "none",
      }} />

      {/* Left accent glow */}
      <div style={{
        position: "absolute", left: "-8%", top: "22%",
        width: 360, height: 360, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 70%)",
        filter: "blur(55px)", pointerEvents: "none",
      }} />

      {/* ── Main two-column layout ── */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        maxWidth: 1300,
        margin: "0 auto",
        width: "100%",
        padding: "0 5vw",
        paddingTop: 90,
        position: "relative",
        zIndex: 5,
        gap: "2rem",
      }}>

        {/* ════ LEFT — text ════ */}
        <div style={{ flex: "0 0 auto", maxWidth: 530 }}>

          {/* Available pill */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.65 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(37,99,235,0.13)",
              border: "1px solid rgba(59,130,246,0.3)",
              borderRadius: 999, padding: "6px 16px 6px 9px",
              marginBottom: 30,
            }}
          >
            <span style={{
              width: 8, height: 8, borderRadius: "50%",
              background: "#38bdf8", boxShadow: "0 0 8px #38bdf8",
              display: "inline-block", animation: "ping-slow 2s infinite",
            }} />
            <span style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 12, color: "#93c5fd",
              letterSpacing: "0.08em", fontWeight: 500,
            }}>
              Available for new projects
            </span>
          </motion.div>

          {/* ── Headline: simple, friendly, personal ── */}
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.6rem, 4.8vw, 4.2rem)",
              fontWeight: 800,
              lineHeight: 1.13,
              color: "#fff",
              letterSpacing: "-0.025em",
              margin: "0 0 20px",
            }}
          >
            {/* Line 1 — greeting */}
            Hi, I'm{" "}
            <span style={{
              background: "linear-gradient(135deg, #60a5fa 0%, #38bdf8 50%, #818cf8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Harsh
            </span>{" "}
            <span style={{ WebkitTextFillColor: "initial", color: "#fff" }}>👋</span>

            <br />

            {/* Line 2 — what I do (normal weight emphasis) */}
            <span style={{ color: "rgba(255,255,255,0.90)" }}>
              I build modern web apps
            </span>

            <br />

            {/* Line 3 — quieter second half */}
            <span style={{
              color: "rgba(255,255,255,0.45)",
              fontWeight: 700,
              fontSize: "clamp(1.7rem, 3.2vw, 2.8rem)",
            }}>
              and smart solutions.
            </span>
          </motion.h1>

          {/* Sub-description */}
          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.22 }}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              color: "rgba(255,255,255,0.4)",
              fontSize: "1rem",
              lineHeight: 1.8,
              marginBottom: 42,
              maxWidth: 410,
            }}
          >
            From pixel-perfect React interfaces to ML models and IoT systems —
            I turn ideas into things that actually work.
          </motion.p>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.32 }}
            style={{ display: "flex", alignItems: "center", gap: 14 }}
          >
            {/* Primary */}
            <a
              href="#projects"
              style={{
                display: "inline-flex", alignItems: "center", gap: 10,
                padding: "13px 30px",
                background: "linear-gradient(135deg, #2563eb, #0ea5e9)",
                color: "#fff",
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600, fontSize: 14, borderRadius: 14,
                textDecoration: "none", letterSpacing: "0.02em",
                boxShadow: "0 0 36px rgba(37,99,235,0.42), inset 0 1px 0 rgba(255,255,255,0.14)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 0 56px rgba(37,99,235,0.6), inset 0 1px 0 rgba(255,255,255,0.14)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "0 0 36px rgba(37,99,235,0.42), inset 0 1px 0 rgba(255,255,255,0.14)";
              }}
            >
              Explore My Work
              <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.8"
                  strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>

            {/* GitHub circle */}
            <a
              href="https://github.com/BariaHarshh"
              target="_blank" rel="noreferrer" title="GitHub"
              style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.13)",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(8px)", textDecoration: "none",
                flexShrink: 0, transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(37,99,235,0.22)";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.055)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
              }}
            >
              <svg width="19" height="19" viewBox="0 0 24 24" fill="rgba(255,255,255,0.72)">
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483
                  0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466
                  -.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832
                  .092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688
                  -.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844
                  c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651
                  .64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855
                  0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
              </svg>
            </a>

            {/* Email circle */}
            <a
              href="mailto:harshbaria9662@gmail.com" title="Email"
              style={{
                width: 48, height: 48, borderRadius: "50%",
                background: "rgba(255,255,255,0.055)",
                border: "1px solid rgba(255,255,255,0.13)",
                display: "flex", alignItems: "center", justifyContent: "center",
                backdropFilter: "blur(8px)", textDecoration: "none",
                flexShrink: 0, transition: "background 0.2s, border-color 0.2s",
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = "rgba(37,99,235,0.22)";
                e.currentTarget.style.borderColor = "rgba(59,130,246,0.5)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = "rgba(255,255,255,0.055)";
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.13)";
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none"
                stroke="rgba(255,255,255,0.72)" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2"/>
                <path d="M2 7l10 7 10-7"/>
              </svg>
            </a>
          </motion.div>

        </div>
        {/* ════ END LEFT ════ */}

        {/* ════ RIGHT — character + orbits + badges ════ */}
        <motion.div
          animate={{ x: mouse.x * 0.35, y: mouse.y * 0.35 }}
          transition={{ type: "spring", stiffness: 55, damping: 18 }}
          style={{
            position: "relative",
            flex: "0 0 auto",
            width: "clamp(330px, 43vw, 640px)",
            height: "clamp(450px, 57vw, 790px)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          {/* Orbit rings */}
          {[308, 400, 485].map((s, i) => (
            <div key={s} style={{
              position: "absolute",
              width: s, height: s,
              borderRadius: "50%",
              border: `1px solid rgba(99,179,237,${0.07 - i * 0.015})`,
              top: "44%", left: "50%",
              transform: `translate(-50%,-50%) rotate(${-12 + i * 9}deg)`,
              pointerEvents: "none",
            }} />
          ))}

          {/* Ground glow */}
          <div style={{
            position: "absolute", bottom: -10, left: "50%",
            transform: "translateX(-50%)",
            width: "70%", height: 88,
            background: "radial-gradient(ellipse, rgba(37,99,235,0.5) 0%, transparent 70%)",
            filter: "blur(28px)", borderRadius: "50%",
          }} />

          {/* Character */}
          <motion.img
            src={character}
            alt="Harsh — Developer"
            initial={{ opacity: 0, y: 55 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            style={{
              width: "100%",
              objectFit: "contain",
              objectPosition: "bottom",
              filter: "drop-shadow(0 0 48px rgba(37,99,235,0.6)) drop-shadow(0 0 90px rgba(14,165,233,0.3))",
              position: "relative",
              zIndex: 5,
            }}
          />

          {/* Floating skill badges */}
          <FloatingIcon icon="⚛️" label="React"  style={{ top: "8%",    right: "1%"  }} delay={0.5}  />
          <FloatingIcon icon="🐍" label="Python" style={{ top: "24%",   left: "-4%"  }} delay={0.75} />
          <FloatingIcon icon="📡" label="IoT"    style={{ top: "52%",   right: "-7%" }} delay={0.9}  />
          <FloatingIcon icon="🤖" label="ML"     style={{ bottom: "26%",left: "-7%"  }} delay={0.62} />
          <FloatingIcon icon="⚡" label="Vite"   style={{ top: "38%",   right: "2%"  }} delay={1.1}  />

          {/* "Open to Work" chip */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
            transition={{
              opacity: { delay: 1,   duration: 0.5 },
              scale:   { delay: 1,   duration: 0.5 },
              y:       { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 },
            }}
            style={{
              position: "absolute", top: "3%", left: "3%",
              background: "rgba(5,22,58,0.78)",
              backdropFilter: "blur(14px)",
              border: "1px solid rgba(56,189,248,0.28)",
              borderRadius: 12, padding: "9px 15px",
              zIndex: 12, boxShadow: "0 4px 22px rgba(0,0,0,0.42)",
            }}
          >
            <div style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: 11, color: "#38bdf8",
              display: "flex", alignItems: "center", gap: 7, fontWeight: 600,
            }}>
              <span style={{
                width: 7, height: 7, borderRadius: "50%",
                background: "#38bdf8", boxShadow: "0 0 7px #38bdf8",
                display: "inline-block", animation: "ping-slow 2s infinite",
              }} />
              Open to Work
            </div>
          </motion.div>

        </motion.div>
        {/* ════ END RIGHT ════ */}

      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: "absolute", bottom: 28, left: "50%",
          transform: "translateX(-50%)",
          display: "flex", flexDirection: "column",
          alignItems: "center", gap: 7, zIndex: 10,
        }}
      >
        <span style={{
          fontFamily: "'Space Grotesk', sans-serif",
          fontSize: 9, color: "rgba(255,255,255,0.2)", letterSpacing: "0.2em",
        }}>SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: 1, height: 40,
            background: "linear-gradient(to bottom, rgba(56,189,248,0.65), transparent)",
          }}
        />
      </motion.div>

    </section>
  );
}

/* ─── App ────────────────────────────────────────────────────── */
function App() {
  return (
    /*
      Wrap everything in a single div with PAGE_BG.
      All sections use transparent or subtle overlay backgrounds,
      so the page colour is always consistent — no hard seams.
    */
    <div style={{ background: PAGE_BG, minHeight: "100vh" }}>
      <Navbar />

      {/* ══ HERO ══ */}
      <HeroSection />

      {/* ══ ABOUT ══ */}
      <section id="about" className="py-40 px-6 text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-[1fr_1.6fr] gap-12 items-center">
          <div>
            <h2 className="text-4xl font-bold mb-6 text-blue-400">About Me</h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              I'm a passionate developer specializing in React, Machine Learning,
              and IoT systems. I enjoy building real-world solutions like TDS
              Monitoring Systems, Bluetooth-integrated applications, and
              intelligent ML-based models.
            </p>
          </div>
          <div
            className="p-8 rounded-2xl border border-white/10 hover:shadow-xl hover:shadow-blue-500/10 transition duration-300"
            style={{ background: "rgba(255,255,255,0.04)" }}
          >
            <h3 className="text-xl font-semibold mb-4 text-white">Quick Highlights</h3>
            <ul className="space-y-2 text-gray-400">
              <li>⚡ React &amp; Frontend Development</li>
              <li>🤖 Machine Learning (LSTM, Pose Estimation)</li>
              <li>🔌 IoT &amp; Arduino Integration</li>
              <li>📱 React Native App Development</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ══ SKILLS ══ */}
      <section
        id="skills"
        className="py-40 px-6 text-white"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(12,29,80,0.3) 40%, transparent)",
        }}
      >
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-16">My Skills</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Frontend",         desc: "React, Tailwind, JavaScript, Vite" },
              { title: "Machine Learning", desc: "LSTM, Pose Estimation, Python"     },
              { title: "IoT & Hardware",   desc: "Arduino, HC-05, Sensors Integration" },
            ].map(({ title, desc }) => (
              <div
                key={title}
                className="p-8 rounded-2xl border border-white/10 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition duration-300"
                style={{ background: "rgba(255,255,255,0.04)" }}
              >
                <h3 className="text-xl font-semibold mb-4 text-white">{title}</h3>
                <p className="text-gray-400">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PROJECTS ══ */}
      <section id="projects" className="py-40 px-6 text-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-blue-400 mb-16 text-center">
            Featured Projects
          </h2>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h3 className="text-3xl font-semibold mb-6 text-white">
                Smart TDS Monitoring System
              </h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                A real-time water quality monitoring system built using Arduino,
                HC-05 Bluetooth module, and a React Native mobile application.
                The system measures TDS levels and allows users to control and
                monitor data through a modern mobile interface.
              </p>
              <div className="flex flex-wrap gap-3 mb-6">
                {["React Native", "Arduino", "HC-05", "Bluetooth"].map((t) => (
                  <span
                    key={t}
                    className="px-4 py-2 rounded-lg text-sm text-gray-300 border border-white/10"
                    style={{ background: "rgba(255,255,255,0.06)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition text-white font-medium">
                  Live Demo
                </button>
                <button className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition text-white font-medium">
                  GitHub
                </button>
              </div>
            </div>
            <div className="h-80 rounded-2xl border border-white/10 overflow-hidden group">
              <img
                src={tdsImage}
                alt="TDS Project"
                className="w-full h-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══ CONTACT ══ */}
      <section
        id="contact"
        className="py-40 px-6 text-white"
        style={{
          background:
            "linear-gradient(to bottom, transparent, rgba(12,29,80,0.35) 50%, transparent)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-blue-400 mb-6">Contact Me</h2>
          <p className="text-gray-400 mb-10">
            Interested in working together or have a project in mind? Feel free
            to reach out.
          </p>
          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="mailto:harshbaria9662@gmail.com"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition font-medium text-white"
            >
              Email Me
            </a>
            <a
              href="https://github.com/BariaHarshh"
              target="_blank"
              rel="noreferrer"
              className="px-8 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition font-medium text-white"
            >
              GitHub
            </a>
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <footer
        className="py-6 text-center text-sm"
        style={{
          color: "rgba(255,255,255,0.18)",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        © 2026 Baria Harsh. Built with React &amp; Tailwind.
      </footer>
    </div>
  );
}

export default App;