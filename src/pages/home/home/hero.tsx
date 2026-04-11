import { imgLinks, svgLinks } from "@/assets/assetLink";
import SplitTextByChar from "@/components/shared/splitText";
import { Badge } from "@/components/ui/badge";
import { ArrowDownRight } from "lucide-react";
import { motion } from "motion/react";
import type { ReactNode } from "react";
import { InfiniteSlider } from "./solution";

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
  svgLinks.univaciti,
  svgLinks.tymer,
  svgLinks.qoonity,
  svgLinks.qucoon,
  svgLinks.rubies,
];


export default function Hero() {
  return (
    <HeroComponent badge="One Window, All Cloud"
      title="One Console for All"
      subtitle="Cloud Solutions"
      type="home"
      description="Deploy, manage, and optimize across AWS, GCP, Huawei, and more all from a single, powerful console that delivers."
      buttonText="Learn More"
      buttonIcon={<ArrowDownRight />}
      showButton={true}
      logos={defaultLogos}
      logoSliderDuration={20}
      className="h-6/8 lg:h-7/8 lg:pb-12"
      trustedByText="Trusted by big brands around the world"
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
  logoSliderDuration,
  showButton,
  logos = defaultLogos,
  imageBanner = false,
  trustedByText,
  showTrustedBy,
  backgroundImages,
  className = "",
  children,
}: HeroProps) {
  const bgImages = {
    bgLayer: backgroundImages?.bgLayer ?? imgLinks.bgLayer,
    whiteOverlay: backgroundImages?.whiteOverlay ?? imgLinks.whiteOverlay,
    container: backgroundImages?.container ?? imgLinks.container,
    bgRay: backgroundImages?.bgRay ?? imgLinks.bgRay,
  };

  return (
    <main className="relative min-h-[60vh] mx-auto w-full overflow-hidden px-6 md:px-20">
      <div>
        <img src={bgImages.bgLayer} className="absolute top-0 left-0 w-full h-full object-cover" alt="" />
      </div>
      <div>
        <img src={bgImages.whiteOverlay} className="absolute top-0 left-0 w-full h-full object-cover" alt="" />
      </div>
      <div>
        <img src={bgImages.container} className="absolute bottom-0 left-0 w-full h-full object-cover z-20" alt="" />
      </div>
      <div>
        <img src={bgImages.bgRay} className="absolute top-0 left-0 w-full h-full object-cover" alt="" />
      </div>

      <div className={`max-w-7xl mx-auto grid ${type === "home" ? "place-content-end lg:place-content-center pb-20" : "place-content-center"}  relative z-10 w-full ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mx-auto relative w-full items-center flex flex-col justify-center"
        >
          {badge && (
            <Badge
              className="mb-4 rounded-full px-4 py-1.5 text-xs text-red-600 lg:text-sm font-medium"
              variant="secondary"
            >
              {badge}
            </Badge>
          )}

          {title && (
            <h1 className="text-4xl md:text-5xl lg:text-[80px] font-bold tracking-tight mb-6 bg-clip-text text-[#706B6B]">
              {title}
            </h1>
          )}

          {subtitle && (
            <h1 className="text-4xl md:text-5xl lg:text-[80px] font-bold tracking-tight mb-6 bg-clip-text text-[#590909]">
              {subtitle}
            </h1>
          )}

          {/* Animated Hero Text */}
          {/* {title && (
            <SplitTextByChar
              text={title}
              className="text-4xl md:text-5xl lg:text-[80px] font-bold tracking-tight mb-6 bg-clip-text text-[#706B6B]"
              delay={0}
            />
          )}

          {subtitle && (
            <SplitTextByChar
              text={subtitle}
              className="text-4xl md:text-5xl lg:text-[80px] font-bold tracking-tight mb-6 bg-clip-text text-[#590909]"
              delay={0.3}
            />
          )} */}

          {description && (
            <p className="text-sm z-30 md:text-xl text-gray-600 mb-4 max-w-3xl mx-auto">
              {description}
            </p>
          )}

          {showButton && (
            <CustomGlassButton onButtonClick={onButtonClick} buttonIcon={buttonIcon} buttonText={buttonText} />
          )}
        </motion.div>
      </div>

      {imageBanner && <div className="p-0 relative -z-0 w-full h-24 md:h-55 lg:h-65" >
        <img src="./images/home.png" className="w-full -mt-8 lg:-mt-26 scale-113 object-fill" alt="Image banner for qocent home page" />
      </div>}

      {showTrustedBy && logos.length > 0 && (
        <p className="z-20 mx-auto w-full grid place-content-center">
          {trustedByText}
        </p>
      )}

      {showTrustedBy && logos.length > 0 &&
        <InfiniteSlider
          items={logos}
          itemWidth={250}
          itemHeight={60}
          duration={logoSliderDuration}
          renderItem={(logo) => (
            <div className="grid size-full place-content-center">
              <img src={logo} alt="logo" />
            </div>
          )}
        />
      }

      {showTrustedBy && logos.length > 0 &&
        <div>
          <img src="./images/blurwhite.png" className="absolute bottom-0 left-0 w-full h-26 object-fill" alt="" />
        </div>
      }

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
    <div className="relative p-2 bg-gray-800/10 backdrop-blur-lg rounded-full">
      <button onClick={onButtonClick} className="bg-black text-white px-6 py-3 rounded-full flex items-center gap-2 font-medium">
        {iconPos === "left" ? (<>{buttonIcon} {buttonText}</>) : (<>{buttonText} {buttonIcon}</>)}
      </button>
    </div>
  )
}
