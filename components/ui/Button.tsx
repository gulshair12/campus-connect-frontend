"use client";

import { forwardRef } from "react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
}

const variantStyles = {
  primary: "bg-[#3478F6] text-white hover:bg-[#2a6ad4] shadow-md",
  secondary: "bg-[#FF8C42] text-white hover:bg-[#e67a35] shadow-md",
  outline: "border-2 border-white bg-transparent text-white hover:bg-white/10",
  ghost: "bg-transparent text-white hover:bg-white/10",
};

const sizeStyles = {
  sm: "px-4 py-2 text-sm rounded-lg",
  md: "px-6 py-3 text-base rounded-xl",
  lg: "px-8 py-4 text-lg rounded-xl",
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      fullWidth = false,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`
          font-semibold transition-colors duration-200
          disabled:opacity-50 disabled:cursor-not-allowed
          cursor-pointer
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? "w-full" : ""}
          ${className}
        `}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";
