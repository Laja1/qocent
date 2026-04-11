import clsx from "clsx";
import type { CSSProperties, ReactNode } from "react";

export default function CustomSection({ children, className, style }: { children: ReactNode, className: string, style?: CSSProperties }) {
  return (
    <section style={style} className={clsx("px-6 w-full md:px-20 2xl:px-0 max-w-7xl mx-auto", className)}>{children}</section>
  )
}
