import { motion } from "framer-motion";
import Navbar from "./components/Navbar";
import tdsImage from "./assets/images/TDS_project_photo.jpeg";

function App() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen pt-24 bg-gradient-to-br from-black via-slate-900 to-black text-white flex items-center justify-center px-6">
        
        <div className="text-center max-w-3xl">
          
          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Hi, I'm <span className="text-blue-500">Harsh</span> 👋
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-gray-400 text-lg md:text-xl mb-8"
          >
            React Developer • ML Enthusiast • IoT Builder
          </motion.p>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl font-semibold shadow-lg shadow-blue-500/30 transition"
          >
            View My Work
          </motion.button>
          
        </div>
      </div>

{/* #about */}

      <section id="about" className="py-40 bg-black text-white px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          
          <div>
            <h2 className="text-4xl font-bold mb-6 text-blue-500">
              About Me
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              I'm a passionate developer specializing in React, Machine Learning, and IoT systems.
              I enjoy building real-world solutions like TDS Monitoring Systems, Bluetooth-integrated
              applications, and intelligent ML-based models.
            </p>
          </div>

          <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 hover:shadow-xl hover:shadow-blue-500/10 transition duration-300">
            <h3 className="text-xl font-semibold mb-4">Quick Highlights</h3>
            <ul className="space-y-2 text-gray-400">
              <li>⚡ React & Frontend Development</li>
              <li>🤖 Machine Learning (LSTM, Pose Estimation)</li>
              <li>🔌 IoT & Arduino Integration</li>
              <li>📱 React Native App Development</li>
            </ul>
          </div>
        </div>
      </section>

{/* #skills */}

      <section id="skills" className="py-40 bg-gradient-to-b from-black to-slate-900 text-white px-6">
        <div className="max-w-6xl mx-auto text-center">
          
          <h2 className="text-4xl font-bold text-blue-500 mb-16">
            My Skills
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            
            <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Frontend</h3>
              <p className="text-gray-400">React, Tailwind, JavaScript, Vite</p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition duration-300">
              <h3 className="text-xl font-semibold mb-4">Machine Learning</h3>
              <p className="text-gray-400">LSTM, Pose Estimation, Python</p>
            </div>

            <div className="bg-slate-900 p-8 rounded-2xl border border-white/10 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20 transition duration-300">
              <h3 className="text-xl font-semibold mb-4">IoT & Hardware</h3>
              <p className="text-gray-400">Arduino, HC-05, Sensors Integration</p>
            </div>

          </div>

        </div>
      </section>

{/* #projects */}

      <section id="projects" className="py-40 bg-black text-white px-6">
        <div className="max-w-6xl mx-auto">
          
          <h2 className="text-4xl font-bold text-blue-500 mb-16 text-center">
            Featured Projects
          </h2>

          <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="grid md:grid-cols-2 gap-12 items-center"
    >

            {/* Project Info */}
            <div>
              <h3 className="text-3xl font-semibold mb-6">
                Smart TDS Monitoring System
              </h3>

              <p className="text-gray-400 mb-6 leading-relaxed">
                A real-time water quality monitoring system built using Arduino,
                HC-05 Bluetooth module, and a React Native mobile application.
                The system measures TDS levels and allows users to control and monitor
                data through a modern mobile interface.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <span className="bg-slate-800 px-4 py-2 rounded-lg text-sm">React Native</span>
                <span className="bg-slate-800 px-4 py-2 rounded-lg text-sm">Arduino</span>
                <span className="bg-slate-800 px-4 py-2 rounded-lg text-sm">HC-05</span>
                <span className="bg-slate-800 px-4 py-2 rounded-lg text-sm">Bluetooth</span>
              </div>

              <div className="flex gap-4">
                <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition">
                  Live Demo
                </button>
                <button className="px-6 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition">
                  GitHub
                </button>
              </div>
            </div>

            {/* Project Visual Placeholder */}
           <div className="h-80 rounded-2xl border border-white/10 overflow-hidden group">
            <img
              src={tdsImage}
              alt="TDS Project"
              className="w-full h-full object-cover bg-slate-900 transition duration-500 group-hover:scale-105"
            />
          </div>
          </motion.div>
          </div>
      </section>

{/* #Contact Section */}

            <section id="contact" className="py-40 bg-gradient-to-b from-black to-slate-900 text-white px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <h2 className="text-4xl font-bold text-blue-500 mb-6">
            Contact Me
          </h2>

          <p className="text-gray-400 mb-10">
            Interested in working together or have a project in mind?
            Feel free to reach out.
          </p>

          <div className="flex justify-center gap-6 flex-wrap">
            <a
              href="mailto:harshbaria9662@gmial.com"
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 rounded-xl transition"
            >
              Email Me
            </a>

            <a
              href="https://github.com/BariaHarshh"
              target="_blank"
              className="px-8 py-3 border border-white/20 rounded-xl hover:bg-white/10 transition"
            >
              GitHub
            </a>
          </div>

        </div>
      </section>
{/* #endregion */}
      <footer className="py-6 text-center text-gray-500 text-sm bg-black">
        © 2026 Baria Harsh.
      </footer>
    </>
  );
}

export default App;