import React, { useState } from "react";
import { Button } from "../ui/button";
import { X, Menu } from "lucide-react";
import { svgLinks } from "@/assets/assetLink";
import { Link, useNavigate } from "react-router-dom";
import { navRoutes } from "@/router/routes";
import { motion, AnimatePresence } from "framer-motion";
import { useDarkMode } from "@/hooks/useDarkMode";
import NiceModal from "@ebay/nice-modal-react";
import { ModalConstant } from "./modal/register";

const Logo = () => {
  const { isDark } = useDarkMode();
  return (
    <div className="flex items-center">
      {isDark ? (
        <img
          src={svgLinks.qocentLight}
          className="lg:h-10 md-6 h-5"
          alt="Logo"
        />
      ) : (
        <img src={svgLinks.logo} className="lg:h-10 md-6 h-5" alt="Logo" />
      )}
    </div>
  );
};

const DesktopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<number | null>(null);

  const onItemClick = () => {
    setHovered(null);
  };

  return (
    <nav className="hidden lg:flex items-center justify-center pt-5 fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center justify-between bg-black/10 backdrop-blur-lg border border-gray-200 dark:border-gray-900 rounded-sm px-6 py-1 w-full max-w-4xl mx-4 shadow-xl">
        <div onClick={() => navigate("/")} className="cursor-pointer">
          <Logo />
        </div>
        <div className="flex items-center gap-3 relative">
          {navRoutes.map((item, idx) => (
            <Link
              key={`link-${idx}`}
              to={item.link}
              onMouseEnter={() => setHovered(idx)}
              onMouseLeave={() => setHovered(null)}
              onClick={onItemClick}
              className="relative text-xs hover:px-2 py-2 text-white hover:text-gray-300 transition-colors"
            >
              {hovered === idx && (
                <motion.div
                  layoutId="hovered"
                  className="absolute inset-0 h-full w-full rounded-md bg-white/10"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </Link>
          ))}
          <Button
            size="sm"
            onClick={() => NiceModal.show(ModalConstant.BookDemoModal)}
            className="hover:text-black hover:bg-gray-100 text-xs"
          >
            Book a demo
          </Button>
        </div>
      </div>
    </nav>
  );
};

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Background Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 lg:hidden bg-black/50"
            onClick={onClose}
          />

          {/* Dropdown Menu */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-14 left-2 right-2 z-40 lg:hidden"
          >
            <div className="bg-white rounded-xs mt-2 shadow-2xl border dark:border-0 border-gray-200 overflow-hidden">
              {/* Navigation Links */}
              <nav className="py-2">
                {navRoutes.map((item, idx) => (
                  <Link
                    key={`mobile-link-${idx}`}
                    to={item.link}
                    onClick={onClose}
                    className="block text-xs px-6 py-2 text-gray-700 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>

              {/* CTA Button */}
              <div className="p-4 bg-gray-50 border-t border-gray-200">
                <Button
                  variant="outline"
                  className="w-full  text-black rounded-xs border py-2"
                  onClick={() => NiceModal.show(ModalConstant.BookDemoModal)}
                >
                  Book A demo
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

interface MobileNavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  onMenuToggle,
  isMenuOpen,
}) => (
  <nav className="lg:hidden fixed top-0 left-0 right-0 z-40 p-2">
    <div className="flex items-center justify-between bg-black/20 backdrop-blur-lg border border-gray-700/30 rounded-xs px-4 py-1">
      <Link to="/" className="cursor-pointer">
        <Logo />
      </Link>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onMenuToggle}
        className="p-2 text-white hover:text-gray-300 transition-colors rounded-xs hover:bg-white/10"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
      >
        <motion.div
          animate={{ rotate: isMenuOpen ? 90 : 0 }}
          transition={{ duration: 0.2 }}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </motion.div>
      </motion.button>
    </div>
  </nav>
);

export default function Navbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const toggleMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  const closeMobileMenu = () => setShowMobileMenu(false);

  return (
    <>
      <DesktopNavigation />
      <MobileNavbar
        onMenuToggle={toggleMobileMenu}
        isMenuOpen={showMobileMenu}
      />
      <MobileMenu isOpen={showMobileMenu} onClose={closeMobileMenu} />
    </>
  );
}
