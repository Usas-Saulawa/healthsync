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
  loaderColor = "bg-white",
  className = "",
  disabled,
  ...props
}: CustomButtonProps) {
  return (
    <button
      disabled={isLoading || disabled}
      className={`flex h-12 w-full items-center justify-center rounded-xl bg-primary-600 px-5 font-medium text-white transition-colors hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:opacity-50 ${className}`}
      {...props}
    >
      {isLoading ? <ScaleLoader className={loaderColor} /> : children}
    </button>
  );
}
