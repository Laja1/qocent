import React, { useState, type ReactNode } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

// Type for Lucide icons
type LucideIcon = React.ComponentType<{ size?: number; className?: string }>;

// Type definitions
interface CollapsibleItemProps {
  title: string;
  icon?: LucideIcon;
  image?: string;
  imageAlt?: string;
  children?: ReactNode;
  defaultOpen?: boolean;
  className?: string;
  iconSize?: number;
  imageSize?: number;
  onClick?: () => void;
}

interface SubItemProps {
  title: string;
  icon?: LucideIcon;
  image?: string;
  imageAlt?: string;
  onClick?: () => void;
  iconSize?: number;
  imageSize?: number;
  className?: string;
}

// Reusable Collapsible Component
export const CollapsibleItem: React.FC<CollapsibleItemProps> = ({
  title,
  icon: Icon,
  image,
  imageAlt = "",
  children,
  defaultOpen = false,
  className = "",
  iconSize = 20,
  imageSize = 20,
  onClick,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

  const handleClick = () => {
    setIsOpen(!isOpen);
    onClick?.();
  };

  const renderIconOrImage = () => {
    if (image) {
      return (
        <img
          src={image}
          alt={imageAlt}
          width={imageSize}
          height={imageSize}
          className="object-contain group-hover:opacity-90 transition-opacity"
        />
      );
    }

    if (Icon) {
      return <Icon size={iconSize} className="text-red-600 transition-colors" />;
    }

    return null;
  };

  return (
    <div className={`text-white ${className}`}>
      <button
        onClick={handleClick}
        className="flex items-center justify-between w-full px-4 py-3 text-left transition-colors duration-200 group"
      >
        <div className="flex items-center gap-3 ">
          {renderIconOrImage()}
          <div className="flex-col flex">
            <span className="text-black text-xs transition-colors">
              {title}
            </span>
          </div>
        </div>
        {children && (
          <div className="text-black transition-colors">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
        )}
      </button>
     
      {isOpen && children && (
        <div className="  border-gray-700 ml-4">{children}</div>
      )}
    </div>
  );
};

// Sub-item component for nested items
export const SubItem: React.FC<SubItemProps> = ({
  title,
  icon: Icon,
  image,
  imageAlt = "",
  onClick,
  iconSize = 16,
  imageSize = 16,
}) => {
  const renderIconOrImage = () => {
    if (image) {
      return (
        <img
          src={image}
          alt={imageAlt}
          width={imageSize}
          height={imageSize}
          className="object-contain group-hover:opacity-90 transition-opacity"
        />
      );
    }

    if (Icon) {
      return (
        <Icon
          size={iconSize}
          className="text-gray-500 group-hover:text-black transition-colors"
        />
      );
    }

    return null;
  };

  return (
    <button onClick={onClick} className="w-full">
      <div
        onClick={onClick}
        className="group flex items-center gap-3 p-2 rounded-xs cursor-pointer
                           hover:bg-gray-50 w-full active:bg-gray-100 transition-all duration-200
                           border border-transparent hover:border-gray-200 hover:ml-2"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            // onClick={onClick}
          }
        }}
      >
        <div
          className="w-1 h-8 bg-gray-950 rounded-full opacity-0 
                               group-hover:opacity-100 transition-opacity duration-200"
        />

        {/* Icon container */}
        <div
          className="w-8 h-8 rounded-xs bg-white shadow-sm border border-gray-200
                               flex items-center justify-center flex-shrink-0
                               group-hover:shadow-md transition-shadow duration-200"
        >
          {renderIconOrImage()}
        </div>
        <span className="text-black transition-colors text-xs">{title}</span>
        {/* Text content */}
      </div>
    </button>
  );
};

// Example usage component
