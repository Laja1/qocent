import { Badge } from "../ui/badge";

interface HeroHeaderProps {
  badgeText?: string;
  description?: string;
  accentColor?: string;
  hideLine?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const HeroHeader = ({
  badgeText,
  description,
  icon,
  hideLine,
  accentColor = "#1C1629",
  children,
}: HeroHeaderProps) => {

  return (
    <div className="flex flex-col items-center text-center w-full mx-auto space-y-4 md:space-y-8 max-w-7xl">
      {badgeText && (
        <Badge
          variant="secondary"
          className="md:mb-4 rounded-full px-2 md:px-4 text-xs font-medium lg:text-sm shadow-md shadow-teal-300"
          style={{ color: accentColor }}
        >
          {icon} {badgeText}
        </Badge>
      )}

      {/* Title with divider lines */}
      <div className={`flex items-center gap-44 mb-3 w-full ${hideLine ? "justify-center" : "justify-between"}`}>
        {!hideLine && <span className="hidden rounded-sm sm:block h-1 flex-1 bg-[#EBEAF6]" />}
        {children}
        {!hideLine && <span className="hidden rounded-sm sm:block h-1 flex-1 bg-[#EBEAF6]" />}
      </div>

      {description && (
        <p className="text-sm lg:text-base text-[#590909] max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
};