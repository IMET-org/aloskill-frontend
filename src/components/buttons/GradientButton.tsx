"use client";

import { type LucideIcon } from "lucide-react";
import styles from "./GradientButton.module.css";

type GradientButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  //  size?: keyof typeof sizes;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  iconAnimation?: "none" | "spin" | "pulse" | "bounce" | "slide";
};

export default function GradientButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  icon: Icon,
  iconPosition,
  iconAnimation = "none",
  className = "",
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
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${styles["button"]} ${className}`}
    >
      {iconPosition === "left" && renderIcon()}
      {children}
      {iconPosition === "right" && renderIcon()}
    </button>
  );
}
