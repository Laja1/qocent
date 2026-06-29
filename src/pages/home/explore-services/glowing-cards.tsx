"use client";

import { GlowingEffect } from "@/components/ui/glowing-effect";
import type { ReactNode } from "react";

interface GridItemProps {
  icon: ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
}

export const GridItem = ({
  icon,
  title,
  description,
  onClick,
}: GridItemProps) => {
  return (
    <li
      onClick={onClick}
      className="min-h-[18rem] w-full sm:w-[260px] md:w-[270px] lg:w-[280px] list-none cursor-pointer"
    >
      <div
        className={`relative h-full rounded-md border p-3 transition-transform hover:-translate-y-1 hover:shadow-lg`}
      >
        <GlowingEffect spread={40} glow proximity={64} inactiveZone={0.01} />

        <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-md p-6 ">
          <div className="flex flex-1 flex-col justify-between gap-3">
            <div className={`w-fit rounded-md border border-red-200 p-2`}>
              {icon}
            </div>
            <div className="space-y-3">
              <p className="text-xl font-semibold text-gray-900">
                {title}
              </p>
              <p className="text-sm text-gray-700">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
