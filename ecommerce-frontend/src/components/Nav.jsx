import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import SearchBar from "./Searchbar";

const Nav = ({ onSearch }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const topBarVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: 45, translateY: 6.5 },
  };

  const middleBarVariants = {
    closed: { opacity: 1 },
    open: { opacity: 0 },
  };

  const bottomBarVariants = {
    closed: { rotate: 0, translateY: 0 },
    open: { rotate: -45, translateY: -10 },
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, staggerChildren: 0.1 },
    },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-indigo-600 text-white z-50 flex flex-col lg:flex-row items-center justify-between px-6 py-3">
      {/* Logo */}
      <div className="flex justify-between items-center w-full lg:w-auto">
        <NavLink to="/">
          <h1 className="text-xl font-bold">My Store</h1>
        </NavLink>

        {/* Hamburger */}
        <div
          className="lg:hidden cursor-pointer"
          aria-label="Toggle navigation"
          aria-expanded={isMobileOpen}
          onClick={() => setIsMobileOpen(!isMobileOpen)}
        >
          <motion.div
            className="w-6 h-1 bg-white mb-1"
            variants={topBarVariants}
            animate={isMobileOpen ? "open" : "closed"}
          ></motion.div>
          <motion.div
            className="w-6 h-1 bg-white mb-1"
            variants={middleBarVariants}
            animate={isMobileOpen ? "open" : "closed"}
          ></motion.div>
          <motion.div
            className="w-6 h-1 bg-white"
            variants={bottomBarVariants}
            animate={isMobileOpen ? "open" : "closed"}
          ></motion.div>
        </div>
      </div>

      {/* Desktop Nav Links + SearchBar */}
      <div className="hidden lg:flex items-center space-x-8">
        <ul className="flex space-x-8">
          {["Products", "Cart"].map((link, index) => (
            <motion.li
              key={index}
              whileHover={{ scale: 1.1, filter: "drop-shadow(0 0 8px #32CD32)" }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink
                to={`/${link.toLowerCase()}`}
                className={({ isActive }) =>
                  `font-semibold transition-all duration-300 ${
                    isActive
                      ? "border-b-2 border-indigo-300"
                      : "hover:border-b-2 hover:border-indigo-300"
                  }`
                }
              >
                {link}
              </NavLink>
            </motion.li>
          ))}
        </ul>
        {/* SearchBar for Desktop */}
        <div className="ml-4">
          <SearchBar onSearch={onSearch} />
        </div>
      </div>

      {/* Mobile Nav Links + SearchBar */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.ul
            className="lg:hidden flex flex-col w-full mt-4 space-y-4"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.li className="px-4">
              {/* SearchBar for Mobile */}
              <SearchBar onSearch={onSearch} />
            </motion.li>
            {["Products", "Cart"].map((link, index) => (
              <motion.li
                key={index}
                variants={linkVariants}
                whileHover={{ scale: 1.05, color: "#a282fa" }}
                whileTap={{ scale: 0.95 }}
                className="text-center"
              >
                <NavLink to={`/${link.toLowerCase()}`}>{link}</NavLink>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Nav;
