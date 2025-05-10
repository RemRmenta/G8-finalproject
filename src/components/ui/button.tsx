import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

// Themed button variants (red-black-neutral theme)
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-full text-base font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none",
  {
    variants: {
      variant: {
        default:
          "bg-transparent text-white hover:bg-[#FFD6D5] hover:text-black focus:ring-white",
        filled:
          "bg-[#EE7879] text-white hover:bg-[#c95d5e] focus:ring-[#EE7879]",
        outline:
          "border border-white text-white hover:bg-[#FFD6D5] hover:text-black focus:ring-white",
        ghost:
          "bg-transparent text-white hover:bg-white/10 hover:text-white focus:ring-white",
      },
      size: {
        sm: "px-4 py-2 text-sm",
        default: "px-5 py-3",
        lg: "px-6 py-4 text-lg",
        icon: "p-3",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

type ButtonProps = React.ComponentPropsWithoutRef<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size }), className)}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
