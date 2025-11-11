"use client";

import { type LucideIcon, Loader2 } from "lucide-react";
import styles from "./GradientButton.module.css";

type GradientButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconAnimation?: "none" | "spin" | "pulse" | "bounce" | "slide";
  loading?: boolean;
  loadingText?: string;
};

export default function GradientButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  icon: Icon,
  iconPosition = "left",
  iconAnimation = "none",
  className = "",
  loading = false,
  loadingText,
}: GradientButtonProps) {
  const iconAnimationClass = {
    none: "",
    spin: styles["iconSpin"],
    pulse: styles["iconPulse"],
    bounce: styles["iconBounce"],
    slide: styles["iconSlide"],
  };

  const renderIcon = () => {
    if (!Icon) return null;

    return <Icon className={`${iconAnimationClass[iconAnimation]}`} />;
  };

  // When loading, show spinner and disable button
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`${styles["button"]} ${className}`}
      aria-busy={loading}
      aria-disabled={isDisabled}
    >
      {loading ? (
        <>
          <Loader2
            className={styles["iconSpin"]}
            aria-hidden='true'
          />
          {loadingText || children}
        </>
      ) : (
        <>
          {iconPosition === "left" && renderIcon()}
          {children}
          {iconPosition === "right" && renderIcon()}
        </>
      )}
    </button>
  );
}
