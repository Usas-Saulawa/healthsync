// components/ui/CustomButton.tsx
import React from "react";
import { ScaleLoader } from "./ScaleLoader";

interface CustomButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
  children: React.ReactNode;
  loaderColor?: string;
}

export function CustomButton({
  isLoading,
  children,
  loaderColor = "bg-(--button-text)",
  className = "",
  disabled,
  ...props
}: CustomButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      className={`flex h-12 w-full items-center justify-center rounded-lg bg-(--button) px-5 font-medium text-(--button-text) transition-colors hover:bg-(--primary) disabled:opacity-50 ${className}`}
      {...props}
    >
      {isLoading ? <ScaleLoader className={loaderColor} /> : children}
    </button>
  );
}
