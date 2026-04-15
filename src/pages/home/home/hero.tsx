import { Badge } from "@/components/ui/badge";
import { ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";

interface HeroProps {
  badge?: string;
  title?: string;
  type?: string;
  subtitle?: string;
  description?: string;
  buttonText?: string;
  buttonIcon?: ReactNode;
  onButtonClick?: () => void;
  showButton?: boolean;
  logos?: string[];
  logoSliderDuration?: number;
  trustedByText?: string;
  showTrustedBy?: boolean;
  backgroundImages?: {
    bgLayer?: string;
    whiteOverlay?: string;
    container?: string;
    bgRay?: string;
  };
  className?: string;
  imageBanner?: boolean
  children?: ReactNode;
}

const defaultLogos = [
  "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_WebServices_LogoandCloudWatch_Grid.png",
  "https://upload.wikimedia.org/wikipedia/commons/a/a8/Microsoft_Azure_Logo_2021.svg",
  "https://upload.wikimedia.org/wikipedia/commons/0/04/Google_Cloud_logo.svg",
];


export default function Hero() {
  return (
    <HeroComponent badge="One Window, All Cloud"
      title="One Console for All"
      subtitle="Cloud Solutions"
      type="home"
      description="Deploy, manage, and optimize across AWS, GCP, Huawei, and more — all from a single, powerful console."
      buttonText="Learn More"
      buttonIcon={<ArrowDownRight />}
      showButton={true}
      logos={defaultLogos}
      logoSliderDuration={20}
      className="h-6/8 lg:h-7/8 lg:pb-12"
      trustedByText="Trusted by leading cloud teams worldwide"
      showTrustedBy={true}
      imageBanner={true} />
  )
}


export function HeroComponent({
  badge,
  title,
  subtitle,
  description,
  buttonText,
  buttonIcon,
  onButtonClick,
  type = "",
  showButton,
  logos = defaultLogos,
  imageBanner = false,
  trustedByText,
  showTrustedBy,
  className = "",
  children,
}: HeroProps) {


  return (
    <main className="relative min-h-[60vh] mx-auto w-full overflow-hidden">
      {/* Clean single gradient background — no stacked images */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#edf2ef] via-white to-[#edf2ef]" />

      {/* Subtle accent gradient */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-[#c12c27]/[0.03] to-transparent pointer-events-none" />

      <div className={`max-w-7xl mx-auto grid ${type === "home" ? "place-content-end lg:place-content-center pb-20" : "place-content-center"}  relative z-10 w-full ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mx-auto relative w-full items-center flex flex-col justify-center"
        >
          {badge && (
            <Badge
              className="mb-6 px-4 py-1.5 text-xs font-semibold text-[#c12c27] bg-[#c12c27]/8 border border-[#c12c27]/20 rounded-sm uppercase tracking-wider"
              variant="secondary"
            >
              {badge}
            </Badge>
          )}

          {title && (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4 text-[#1C1629]">
              {title}
            </h1>
          )}

          {subtitle && (
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-[#c12c27]">
              {subtitle}
            </h1>
          )}

          {description && (
            <p className="text-base md:text-lg text-[#706B6B] mb-8 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}

          {showButton && (
            <button
              onClick={onButtonClick}
              className="inline-flex items-center gap-2 bg-[#1C1629] text-white px-8 py-4 text-sm font-medium rounded-sm hover:bg-[#1C1629]/90 transition-colors"
            >
              {buttonText}
              {buttonIcon}
            </button>
          )}
        </motion.div>
      </div>

      {imageBanner && (
        <div className="relative w-full">
          <img
            src="./images/home.png"
            className="w-full max-w-5xl mx-auto -mt-8 lg:-mt-16 object-fill"
            alt="Qocent dashboard"
          />
        </div>
      )}

      {showTrustedBy && (
        <div className="relative z-10 px-6 md:px-20 max-w-7xl mx-auto w-full">
          <p className="text-xs font-medium text-[#706B6B] uppercase tracking-widest text-center mb-8">
            {trustedByText}
          </p>
          <div className="flex items-center justify-center gap-12 flex-wrap">
            {logos.slice(0, 4).map((logo, i) => (
              <div key={i} className="h-8 opacity-40 grayscale hover:grayscale-0 transition-all">
                <img src={logo} alt="partner logo" className="h-full w-auto object-contain" />
              </div>
            ))}
          </div>
        </div>
      )}

      {children}
    </main>
  );
}


interface CustomGlassButtonProps {
  onButtonClick?: () => void;
  buttonText?: string;
  buttonIcon?: ReactNode;
  iconPos?: string
}

export function CustomGlassButton({ onButtonClick, buttonText, buttonIcon, iconPos }: CustomGlassButtonProps) {
  return (
    <button
      onClick={onButtonClick}
      className="inline-flex items-center gap-2 bg-[#1C1629] text-white px-8 py-4 text-sm font-medium rounded-sm hover:bg-[#1C1629]/90 transition-colors"
    >
      {iconPos === "left" ? (<>{buttonIcon} {buttonText}</>) : (<>{buttonText} {buttonIcon}</>)}
    </button>
  )
}
