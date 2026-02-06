import { Badge } from "../ui/badge";

interface HeroHeaderProps {
  badgeText?: string;
  title: string;
  description?: string;
  accentColor?: string;
  icon?: React.ReactNode;
}

export const HeroHeader = ({
  badgeText,
  title,
  description,
  icon,
  accentColor = "#1C1629",
}: HeroHeaderProps) => {
  return (
    <div className="flex flex-col items-center text-center max-w-3xl mx-auto px-4">
      {badgeText && (
        <Badge
          variant="secondary"
          className="mb-4 rounded-full px-4 py-1.5 text-xs font-medium lg:text-sm"
          style={{ color: accentColor }}
        >
         {icon} {badgeText}
        </Badge>
      )}

      {/* Title with divider lines */}
      <div className="flex items-center gap-4 mb-3 w-full">
        <span className="hidden sm:block h-px flex-1 bg-[#EBEAF6]" />
        <h1 className="text-3xl lg:text-4xl font-semibold tracking-tight">
          {title}
        </h1>
        <span className="hidden sm:block h-px flex-1 bg-[#EBEAF6]" />
      </div>

      {description && (
        <p className="text-sm lg:text-base text-[#590909] max-w-2xl">
          {description}
        </p>
      )}
    </div>
  );
};
