import BadgeHeader from "@/pages/home/components/Badge";

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
    children,
}: HeroHeaderProps) => {

    return (
        <div className="flex flex-col items-center text-center w-full mx-auto space-y-6 md:space-y-8 max-w-7xl">
            {badgeText && (
                <BadgeHeader title={badgeText}>
                    {icon}
                </BadgeHeader>
            )}

            {children}

            {description && (
                <p className="text-sm lg:text-base text-[#4a4a4a] max-w-xl leading-relaxed">
                    {description}
                </p>
            )}
        </div>
    );
};
