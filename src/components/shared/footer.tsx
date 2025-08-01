import { imgLinks } from "@/assets/assetLink";
import {
  IconBrandFacebook,
  IconBrandLinkedin,
  IconBrandTwitter,
} from "@tabler/icons-react";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <div className="mt-10">
      <footer className="w-full border-t bg-background/95 backdrop-blur-sm">
        <div className="container flex flex-col gap-8 px-4 py-10 md:px-6 lg:py-16">
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 font-bold">
                <img src={imgLinks.footerlogo} className="h-14" />
              </div>

              <p className="flex items-center gap-2 text-xs">
                <MdEmail className="text-lg" />
                info@qocent.com
              </p>
              <div className="text-xs flex flex-col lg:flex-row gap-4 lg:space-y-1 text-left lg:text-right">
                <p>📞 +1 (800) 123-4567 (USA)</p>
                <p>📞 +234 8105445678 (Nigeria)</p>
              </div>
              <div className="flex space-x-3 mt-4">
                {[
                  { icon: IconBrandTwitter, href: "https://x.com/InfoQocent" },
                  { icon: IconBrandLinkedin, href: "https://www.linkedin.com/company/qocent/?lipi=urn%3Ali%3Apage%3Ad_flagship3_search_srp_all%3Bw42MWFLBTgih9hRTA4kmmg%3D%3D" },
                  { icon: IconBrandFacebook, href: "https://x.com/InfoQocent" },
                ].map((Icon, index) => (
                  <a
                    key={index}
                    href={Icon.href}
                    className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
                  >
                    <Icon.icon className="w-4 h-4 text-gray-600" />
                  </a>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Solutions</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#features"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    to="#pricing"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Integrations
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    API
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Use Case</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Guides
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Blog
                  </Link>
                </li>
                <li>
                  <Link
                    to="#"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Support
                  </Link>
                </li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-bold">Company</h4>
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
          <div className="flex flex-col gap-4 sm:flex-row justify-between items-center border-t border-border/40 pt-8">
            <h1 className="text-xs lg:text-sm text-neutral-600 mt-1">
              QOCENT. All rights reserved. © {new Date().getFullYear()}
            </h1>
            <div className="flex gap-4">
              <Link
                to="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="#"
                className="text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
