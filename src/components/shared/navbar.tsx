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
import { Link } from "react-router-dom";

export default function NavbarDemo({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Nav */}
        <NavBody>
          <p className="text-xl font-bold">QCS</p>

          <NavItems items={navRoutes} />
          <div className="flex items-center gap-4">
            <Link to={RouteConstant.auth.signin.path}>
              <NavbarButton variant="secondary">Login</NavbarButton>
            </Link>
            {/* <NavbarButton href="/book" variant="primary">Book a call</NavbarButton> */}
          </div>
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader>
            <p className="text-xl font-bold">QOCENT</p>

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
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
              <NavbarButton
                href={RouteConstant.auth.signin.path}
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Login
              </NavbarButton>
              <NavbarButton
                href={RouteConstant.auth.signup.path}
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Sign Up
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Dummy content */}
      <div className=" p-4 text-center">{children}</div>
    </div>
  );
}
