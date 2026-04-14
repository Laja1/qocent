import { svgLinks } from "@/assets/assetLink";
import { navRoutes, RouteConstant } from "@/router/routes";
import clsx from "clsx";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MobileNavbarProps {
  onMenuToggle: () => void;
  isMenuOpen: boolean;
}

// Container animation variants - expands from top-right to bottom-left
const menuVariants = {
  closed: {
    clipPath: 'circle(0% at 100% 0%)',
    opacity: 0,
    transition: {
      delay: 0.2,
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const
    }
  },
  open: {
    clipPath: 'circle(150% at 100% 0%)',
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.4, 0, 0.2, 1] as const
    }
  }
};

// Menu items animation variants
const itemVariants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: {
      duration: 0.2
    }
  },
  open: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.2 + (i * 0.1),
      duration: 0.4,
      ease: [0.4, 0, 0.2, 1] as const
    }
  })
};

// Button animation
const buttonVariants = {
  closed: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.2
    }
  },
  open: {
    opacity: 1,
    scale: 1,
    transition: {
      delay: 0.2 + (navRoutes.length * 0.1),
      duration: 0.4
    }
  }
};

export const Logo = () => {
  return (
    <div className="flex items-center relative">
      <img
        src={svgLinks.logo}
        className="h-10 transition-opacity duration-300 ease-in-out"
        alt="Logo"
      />
    </div>
  );
};

const DesktopNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [active, setActive] = useState<number | null>(null);

  // Update active state based on current route
  useEffect(() => {
    const currentIndex = navRoutes.findIndex(
      route => route.link === location.pathname
    );
    setActive(currentIndex !== -1 ? currentIndex : null);
  }, [location.pathname]);


  const onItemClick = (idx: number) => {
    setActive(idx);
  };

  return (
    <nav
      className="hidden md:flex items-center justify-center pt-5 fixed top-0 left-0 right-0 z-50"
      aria-label="Main Navigation"
    >
      <div className="flex items-center justify-between bg-black/10 backdrop-blur-lg border border-gray-200 rounded-3xl px-6 pr-2 py-1 w-full h-full max-w-4xl mx-4 shadow-xl">
        <div
          onClick={() => { navigate("/"); setActive(null); }}
          className="flex items-center justify-between gap-4 h-full"
          aria-label="Qocent Home"
        >
          <Logo />
          <div className="w-[2px] h-10 rounded-3xl bg-gray-500" />
        </div>

        <div className="flex items-center justify-center gap-8 relative" role="list">
          {navRoutes.map((item, idx) => (
            <Link
              key={`link-${idx}`}
              to={item.link}
              onClick={() => onItemClick(idx)}
              className="relative text-xs group cursor-pointer transition-transform ease-in-out hover:font-bold py-2 hover:scale-125 text-black hover:text-gray-700 duration-400 self-center text-center"
              aria-label={`Navigate to ${item.name}`}
            >
              <span className="relative z-10">{item.name}</span>
              <span
                className={clsx(
                  "absolute z-10 bottom-1 left-1/2 h-[2px] -translate-x-1/2 transform rounded-full bg-red-500 font-extrabold duration-300 ease-in-out",
                  idx === active ? "w-full" : "w-0 group-hover:w-full"
                )}
              />
            </Link>
          ))}
        </div>

        <button
          onClick={() => navigate(RouteConstant.auth.signin.path)}
          className="hover:text-black cursor-pointer rounded-3xl h-10 px-6 text-white bg-black grid place-content-center hover:bg-gray-100 text-xs"
          aria-label="Sign in to Qocent"
        >
          Get Started
        </button>
      </div>
    </nav>
  );
};

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  const navigate = useNavigate();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-40 md:hidden bg-gradient-to-b from-stone-500 via-stone-800 to-black"
          style={{ originX: 1, originY: 0 }}
        >
          {/* Menu Content - Centered */}
          <div className="flex flex-col items-center justify-center min-h-screen px-8 py-20">
            {/* Navigation Links */}
            <nav className="flex flex-col items-center gap-8 mb-12">
              {navRoutes.map((item, idx) => (
                <motion.div
                  key={`mobile-link-${idx}`}
                  custom={idx}
                  variants={itemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <Link
                    to={item.link}
                    onClick={onClose}
                    className="text-white relative group text-4xl md:text-3xl font-medium hover:font-black hover:text-red-300 transition-colors py-2 px-4"
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <span>{item.name}</span>
                    <span className={clsx("absolute z-10 bottom-0 left-1/2 size-0 h-[2px] -translate-x-1/2 transform rounded-full bg-red-100 font-extrabold duration-300 ease-in-out group-hover:w-full")}></span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            {/* CTA Button */}
            <motion.div
              variants={buttonVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <Button
                variant="outline"
                className="bg-white text-black hover:bg-red-500 hover:text-white border-white px-8 py-6 text-2xl rounded-full transition-all"
                onClick={() => {
                  navigate(RouteConstant.auth.signin.path);
                  onClose();
                }}
              >
                Get Started
              </Button>
            </motion.div>
          </div>

          {/* Close Button - Top Right */}
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={onClose}
            className="absolute top-6 right-6 p-3 text-white hover:text-red-500 transition-colors rounded-full hover:bg-white/10"
            aria-label="Close menu"
          >
            <X size={28} />
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const MobileNavbar: React.FC<MobileNavbarProps> = ({
  onMenuToggle,
  isMenuOpen,
}) => (
  <nav className="md:hidden fixed top-0 left-0 right-0 z-50 p-2">
    <div className="flex items-center justify-between bg-black/20 backdrop-blur-lg border border-gray-700/30 rounded-lg px-4 py-3">
      <Link to="/" className="cursor-pointer">
        <Logo />
      </Link>
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={onMenuToggle}
        className="p-2 text-white hover:text-gray-300 transition-colors rounded-lg hover:bg-white/10"
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
