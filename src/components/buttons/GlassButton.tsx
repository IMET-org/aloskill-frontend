import React from "react";
import { Loader2 } from "lucide-react";
import { motion, type HTMLMotionProps } from "framer-motion";
import type { LucideIcon } from "lucide-react";

/* -------------------- Animations -------------------- */

const buttonVariants = {
  idle: { scale: 1 },
  hover: {
    scale: 1.02,
    y: -2,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 20,
    },
  },
  tap: {
    scale: 0.98,
    y: 0,
    transition: { duration: 0.1 },
  },
};

const shimmerVariants = {
  animate: {
    x: ["-100%", "200%"],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "linear",
      repeatDelay: 1.5,
    },
  },
};

/* -------------------- Types -------------------- */

type ButtonSize = "sm" | "md" | "lg";
type IconPosition = "left" | "right";

/**
 * We extend HTMLMotionProps<"button"> instead of ButtonHTMLAttributes
 * so Framer Motion props are type-safe as well.
 */
export interface GlassButtonProps
  extends Omit<HTMLMotionProps<"button">, "type" | "disabled"> {
  children: React.ReactNode;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
  loadingText?: string;
  disabled?: boolean;
  icon?: LucideIcon;
  iconPosition?: IconPosition;
  size?: ButtonSize;
  fullWidth?: boolean;
}

/* -------------------- Component -------------------- */

export function GlassButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  loading = false,
  loadingText,
  icon: Icon,
  iconPosition = "right",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}: GlassButtonProps) {
  const isDisabled = disabled || loading;

  const sizeConfig: Record<
    ButtonSize,
    {
      height: string;
      padding: string;
      text: string;
      iconSize: number;
    }
  > = {
    sm: {
      height: "h-10",
      padding: "px-5",
      text: "text-sm",
      iconSize: 16,
    },
    md: {
      height: "h-12",
      padding: "px-6",
      text: "text-base",
      iconSize: 18,
    },
    lg: {
      height: "h-14",
      padding: "px-8",
      text: "text-lg",
      iconSize: 20,
    },
  };

  const config = sizeConfig[size];

  const buttonClasses = `
    relative inline-flex items-center justify-center gap-2.5
    ${config.height} ${fullWidth ? "w-full" : config.padding}
    ${config.text}
    bg-white/40 backdrop-blur-xl
    border border-white/60
    text-slate-900
    shadow-[0_8px_32px_rgba(0,0,0,0.08),inset_0_1px_0_rgba(255,255,255,0.9)]
    hover:shadow-[0_8px_32px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,1)]
    rounded-xl font-semibold
    transition-all duration-300 ease-out
    ${isDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-400
    overflow-hidden
    ${className}
  `
    .trim()
    .replace(/\s+/g, " ");

  return (
    <motion.button
      type={type}
      onClick={!isDisabled ? onClick : undefined}
      disabled={isDisabled}
      className={buttonClasses}
      variants={buttonVariants}
      initial="idle"
      whileHover={!isDisabled ? "hover" : "idle"}
      whileTap={!isDisabled ? "tap" : "idle"}
      aria-busy={loading}
      aria-disabled={isDisabled}
      {...props}
    >
      {/* Shimmer */}
      {!isDisabled && (
        <motion.div
          className="absolute inset-0 -z-10"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)",
          }}
          variants={shimmerVariants}
          animate="animate"
        />
      )}

      {/* Content */}
      <span className="relative z-10 flex items-center justify-center gap-2.5">
        {loading ? (
          <>
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 size={config.iconSize} strokeWidth={2.5} />
            </motion.span>
            <span>{loadingText ?? children}</span>
          </>
        ) : (
          <>
            {Icon && iconPosition === "left" && (
              <Icon size={config.iconSize} strokeWidth={2.5} />
            )}
            <span>{children}</span>
            {Icon && iconPosition === "right" && (
              <Icon size={config.iconSize} strokeWidth={2.5} />
            )}
          </>
        )}
      </span>

      {/* Hover overlay */}
      {!isDisabled && (
        <motion.div
          className="absolute inset-0 bg-white/20 rounded-xl"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );
}
