// components/ui/ScaleLoader.tsx
interface ScaleLoaderProps {
  className?: string;
}

export function ScaleLoader({ className = "bg-white" }: ScaleLoaderProps) {
  return (
    <div className="flex items-center space-x-1.5 h-5 justify-center">
      {/* Self-contained premium wave keyframe animation */}
      <style>{`
        @keyframes custom-equalizer {
          0%, 100% { transform: scaleY(0.3); }
          50% { transform: scaleY(1); }
        }
        .animate-equalizer {
          animation: custom-equalizer 1s infinite ease-in-out;
        }
      `}</style>

      {/* The 5 Equalizer Bars with offset delays to create the wave motion */}
      <div
        className={`w-1 h-5 rounded-full origin-center animate-equalizer ${className}`}
        style={{ animationDelay: "-0.4s" }}
      />
      <div
        className={`w-1 h-5 rounded-full origin-center animate-equalizer ${className}`}
        style={{ animationDelay: "-0.2s" }}
      />
      <div
        className={`w-1 h-5 rounded-full origin-center animate-equalizer ${className}`}
        style={{ animationDelay: "0s" }}
      />
      <div
        className={`w-1 h-5 rounded-full origin-center animate-equalizer ${className}`}
        style={{ animationDelay: "-0.2s" }}
      />
      <div
        className={`w-1 h-5 rounded-full origin-center animate-equalizer ${className}`}
        style={{ animationDelay: "-0.4s" }}
      />
    </div>
  );
}
