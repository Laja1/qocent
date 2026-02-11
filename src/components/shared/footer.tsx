import { imgLinks, } from "@/assets/assetLink";
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  const socialLinks = [
    {
      icon: IconBrandTwitter,
      href: "https://x.com/InfoQocent",
      label: "Twitter",
    },
    {
      icon: IconBrandLinkedin,
      href: "https://www.linkedin.com/company/qocent/",
      label: "LinkedIn",
    },
    {
      icon: IconBrandFacebook,
      href: "https://facebook.com/InfoQocent",
      label: "Facebook",
    },
    {
      icon: IconBrandInstagram,
      href: "https://instagram.com/InfoQocent",
      label: "Instagram",
    },
  ];

  const legalLinks = [
    { name: "Product", href: "/privacy" },
    { name: "Integrations", href: "/terms" },
    { name: "Success Stories", href: "/cookies" },
    { name: "Contact Us", href: "/cookies" },
    { name: "Pricing", href: "/cookies" },
    { name: "Careers", href: "/cookies" },
  ];

  return (
    <footer className="w-full py-6 lg:py-8 mx-auto p-12 px-6 md:p-32 md:px-28">
      {/* Subtle background pattern */}

      <div className="mx-auto space-y-8 w-full">

        {/* Company info - takes more space */}
        <div className="flex flex-col md:flex-row w-full space-y-8 items-start justify-between">
          {/* Logo and brand */}
          <div className="flex items-center gap-3">
            <img
              src={imgLinks.footerlogo}
              className="h-12 w-auto"
              alt="Qocent Logo"
            />
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6 md:mt-2">
            {socialLinks.map(({ icon: Icon, href, label }, index) => (
              <a
                key={index}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-10 h-10 bg-muted/50 hover:bg-primary/10 rounded-xl flex items-center justify-center transition-all duration-200 hover:scale-105 group"
              >
                <Icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Navigation links */}
        <nav aria-label="Legal Links">
          <ul className="md:flex flex-wrap gap-6 grid gap-x-0 md:gap-x-4 gap-y-4 grid-cols-3">
            {legalLinks.map((link, index) => (
              <li className="cursor-pointer"
              >
                <Link
                  key={index}
                  to={link.href}
                  aria-label={link.name}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="mt-12 md:pt-8 border-t border-border/50">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {new Date().getFullYear()} QOCENT.</span>
            <span>All rights reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
