"use client";
import { svgLinks } from "@/assets/assetLink";
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
import { navRoutes } from "@/router/routes";
import NiceModal from "@ebay/nice-modal-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ModalConstant } from "./modal/register";

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
          <div
            onClick={() => handleHomeClick()}
            className="text-xl  cursor-pointer font-bold hover:opacity-80 transition-opacity"
          >
            <img src={svgLinks.logo} className="h-10" />
          </div>

          <NavItems items={navRoutes} />

          {/* <a href="#join-waitlist"> */}
          <NavbarButton
            // onClick={() => navigate("signin")}
            onClick={() => NiceModal.show(ModalConstant.BookDemoModal)}
            variant="secondary"
            className="text-red-600"
          >
            {/* Join Waitlist */}Book a demo
          </NavbarButton>
          {/* </a> */}
        </NavBody>

        {/* Mobile Nav */}
        <MobileNav>
          <MobileNavHeader>
            <button
              onClick={handleHomeClick}
              className="text-xl font-bold hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-blue-500 rounded"
              aria-label="Go to homepage"
            >
              <img src={svgLinks.logo} className="h-10" />
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
                className="relative text-neutral-600 hover:text-neutral-800 transition-colors"
              >
                <span className="block">{item.name}</span>
              </Link>
            ))}
            <div className="flex w-full flex-col gap-4">
              <div
                // href="#join-waitlist"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <NavbarButton
                  // onClick={() => navigate("signin")}
                  onClick={() => NiceModal.show(ModalConstant.BookDemoModal)}
                  variant="primary"
                 className="text-red-600 w-full"
                >
                  {/* Join Waitlist */}Book a demo
                </NavbarButton>
              </div>

              {/* <Link to={RouteConstant.auth.signup.path}>
                <NavbarButton
                  onClick={() => setIsMobileMenuOpen(false)}
                  variant="primary"
                  className="w-full"
                >
                  Sign Up
                </NavbarButton>
              </Link> */}
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>

      {/* Content */}
      <div className="p-4 text-center">{children}</div>
    </div>
  );
}
