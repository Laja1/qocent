import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
    "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 aria-invalid:border-destructive rounded-none",
    {
        variants: {
            variant: {
                default:
                    "bg-[#1C1629] text-white hover:bg-[#1C1629]/90 shadow-sm",
                destructive:
                    "bg-[#c12c27] text-white hover:bg-[#c12c27]/90 shadow-sm",
                outline:
                    "border border-[#e5e5e5] bg-white text-[#1C1629] hover:bg-[#fafafa]",
                secondary:
                    "bg-[#f0f0f0] text-[#1C1629] hover:bg-[#e5e5e5]",
                ghost:
                    "hover:bg-[#f0f0f0] text-[#1C1629]",
                link: "text-[#c12c27] underline-offset-4 hover:underline",
            },
            size: {
                default: "h-10 px-6 py-2",
                sm: "h-9 px-4 gap-1.5",
                lg: "h-12 px-8",
                icon: "size-10",
            },
        },
        defaultVariants: {
            variant: "default",
            size: "default",
        },
    }
)

function Button({
    className,
    variant,
    size,
    asChild = false,
    ...props
}: React.ComponentProps<"button"> &
    VariantProps<typeof buttonVariants> & {
        asChild?: boolean
    }) {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            data-slot="button"
            className={cn(buttonVariants({ variant, size, className }))}
            {...props}
        />
    )
}

export { Button, buttonVariants }
