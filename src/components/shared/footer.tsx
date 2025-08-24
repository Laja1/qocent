import { imgLinks } from "@/assets/assetLink";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import { Sun, Moon } from "lucide-react";
import { useDarkMode } from "@/hooks/useDarkMode"; // adjust to your hook path

export const Footer = () => {
  const { isDark, toggle } = useDarkMode();

  const socialLinks = [
    { icon: IconBrandTwitter, href: "https://x.com/InfoQocent" },
    {
      icon: IconBrandLinkedin,
      href: "https://www.linkedin.com/company/qocent/",
    },
    { icon: IconBrandFacebook, href: "https://facebook.com/InfoQocent" },
  ];

  return (
    <footer className="w-full border-t bg-background/95 dark:bg-black backdrop-blur-sm">
      <div className="container flex flex-col gap-10 px-4 py-10 md:px-6 lg:py-16">
        {/* Top grid */}
        <div className="grid gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Logo + contact */}
          <div className="space-y-5">
            <div className="flex items-center gap-2 font-bold">
              <img src={imgLinks.footerlogo} className="h-14" alt="Qocent Logo" />
            </div>

            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <MdEmail className="text-lg" />
              info@qocent.com
            </p>

            <div className="text-sm flex flex-col lg:flex-row lg:gap-6 gap-2 text-muted-foreground">
              <p>📞 +1 (800) 123-4567 (USA)</p>
              <p>📞 +234 810 544 5678 (Nigeria)</p>
            </div>

            {/* Social + dark toggle */}
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map(({ icon: Icon, href }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                >
                  <Icon className="w-4 h-4 text-gray-600 dark:text-gray-300" />
                </a>
              ))}

              <button
                onClick={toggle}
                aria-label="Toggle Dark Mode"
                className="w-8 h-8 flex items-center justify-center bg-gray-200 dark:bg-gray-800 rounded-full hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              >
                {isDark ? <Sun size={16} /> : <Moon size={16} />}
              </button>
            </div>
          </div>

          {/* Links - Solutions */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">Solutions</h4>
            <ul className="space-y-2 text-sm">
              {["Features", "Pricing", "Integrations", "API"].map((item, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Use Case */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">Use Case</h4>
            <ul className="space-y-2 text-sm">
              {["Documentation", "Guides", "Blog", "Support"].map((item, i) => (
                <li key={i}>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links - Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wide">Company</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/our-partners"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Partners
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="#"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-border/40 pt-6 gap-4">
          <p className="text-xs lg:text-sm text-muted-foreground">
            © {new Date().getFullYear()} QOCENT. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
              (item, i) => (
                <Link
                  key={i}
                  to="#"
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
