import { imgLinks,  } from "@/assets/assetLink";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { MdEmail, MdPhone } from "react-icons/md";
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
  ];

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Multi-Cloud Management", href: "/#features" },
        { name: "FinOps & Cost Optimization", href: "/#pricing" },
        { name: "Security & Compliance", href: "/#integrations" },
        { name: "Account Integration", href: "/docs#api" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Getting Started Guide", href: "/docs#guides" },
        { name: "Contact Support", href: "/contact" },  
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about-us" },
        { name: "Partners", href: "/our-partners" },
        { name: "Careers", href: "/careers" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="relative w-full border-t border-border/80 bg-gradient-to-b backdrop-blur-sm">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-small-black/[0.02]" />

      <div className="relative container mx-auto px-4 py-12 lg:py-16">
        {/* Main footer content */}
        <div className="grid gap-8 lg:gap-12 md:grid-cols-2 lg:grid-cols-12">
          {/* Company info - takes more space */}
          <div className="space-y-6 lg:col-span-5">
            {/* Logo and brand */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={imgLinks.footerlogo}
                  className="h-12 w-auto"
                  alt="Qocent Logo"
                />
                <div className="h-8 w-px bg-border/50" />
              </div>

              <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              Simplify multi-cloud management with Qocent. Deploy, monitor, optimize, and secure your AWS, Azure, GCP, and Huawei infrastructure from one powerful console.
              </p>
            </div>

            {/* Contact information */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                  <MdEmail className="text-primary w-4 h-4" />
                </div>
                <a
                  href="mailto:info@qocent.com"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  info@qocent.com
                </a>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <MdPhone className="text-primary w-4 h-4" />
                  </div>
                  <a
                    href="tel:+18001234567"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +1 (800) 123-4567 (USA)
                  </a>
                </div>
                <div className="flex items-center gap-3 text-sm ml-11">
                  <a
                    href="tel:+2348105445678"
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    +234 810 544 5678 (Nigeria)
                  </a>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
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
          </div>

          {/* Navigation links */}
          <div className="lg:col-span-7">
            <div className="grid gap-8 sm:grid-cols-3">
              {footerSections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-4">
                  <h4 className="text-sm font-semibold text-foreground tracking-wide">
                    {section.title}
                  </h4>
                  <ul className="space-y-3" role="list">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <Link
                          to={link.href}
                          className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200 hover:translate-x-1 inline-block"
                          aria-label={`${link.name} - ${section.title}`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>© {new Date().getFullYear()} QOCENT.</span>
              <span>All rights reserved.</span>
            </div>

            <nav aria-label="Legal Links">
              <div className="flex flex-wrap gap-6">
                {legalLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.href}
                    className="text-xs text-muted-foreground hover:text-primary transition-colors"
                    aria-label={link.name}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};
