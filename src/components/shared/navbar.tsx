"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { navRoutes, RouteConstant } from "@/router/routes";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function NavbarDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleHomeClick = () => {
    setIsMobileMenuOpen(false);
    navigate("/");
  };

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Nav */}
        <NavBody>
          <Link to="/" className="text-xl font-bold hover:opacity-80 transition-opacity">
            QOCENT
          </Link>

          <NavItems items={navRoutes} />
          
          <div className="flex items-center gap-4">
            <Link to={RouteConstant.auth.signin.path}>
              <NavbarButton variant="secondary" className="text-red-600">
                Login
              </NavbarButton>
            </Link>
          </div>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader>
            <button
              onClick={handleHomeClick}
              className="text-xl font-bold hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Go to homepage"
            >
              QOCENT
            </button>

            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navRoutes.map((item, idx) => (
              <Link
                key={`mobile-link-${idx}`}
                to={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300 hover:text-neutral-800 dark:hover:text-neutral-100 transition-colors"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <Link to={RouteConstant.auth.signin.path}>
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full text-red-800"
                >
                  Login
                </NavbarButton>
              </Link>
              <Link to={RouteConstant.auth.signup.path}>
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Sign Up
                </NavbarButton>
              </Link>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Content */}
      <div className="p-4 text-center">{children}</div>
    </div>
  );
}