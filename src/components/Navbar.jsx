import { motion } from "framer-motion";

function Navbar() {
  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 w-full bg-black/40 backdrop-blur-md border-b border-white/10 z-50"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 py-4 text-white">
        
        <h1 className="text-xl font-bold text-blue-500">
          Baria Harsh Ashokbhai
        </h1>

        <div className="space-x-6 hidden md:flex">
          <a href="#about" className="hover:text-blue-400 transition">About</a>
          <a href="#skills" className="hover:text-blue-400 transition">Skills</a>
          <a href="#projects" className="hover:text-blue-400 transition">Projects</a>
          <a href="#contact" className="hover:text-blue-400 transition">Contact</a>
        </div>

      </div>
    </motion.nav>
  );
}

export default Navbar;