"use client";
// import useBusiness from "@/hooks/client/useBusiness";
import { ContextProps, EHRContextProps } from "@/types";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useTheme } from "@/hooks/addons/useTheme";
import { motion } from "framer-motion";
import { Header } from "@/components/dashboard_components/Header";

export const EHRContext = createContext<EHRContextProps | undefined>(undefined);

export function EHRContextProvider({ children }: ContextProps) {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(false);
  const [filter, setFilter] = useState("");

  // Modal State
  const [{ modalOpen, modalName, modalContent }, setModal] = useState<{
    modalOpen: boolean;
    modalName: string;
    modalContent: any;
  }>({
    modalOpen: false,
    modalName: "",
    modalContent: null,
  });

  const [activeMenu, setActiveMenu] = useState(pathname);
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0 });
  const [content, setContent] = useState<React.ReactNode>(null);
  const [rectElement, setRectElement] = useState<DOMRect | null>({
    bottom: 0,
    height: 0,
    left: 0,
    right: 0,
    top: 0,
    width: 0,
    x: 0,
    y: 0,
  } as DOMRect);

  const tooltipRef = useRef<HTMLDivElement>(null);

  // Show tooltip function
  const showTooltip = (target: HTMLElement, content: React.ReactNode) => {
    const rect = target.getBoundingClientRect();
    setRectElement(rect);

    let top = rect.bottom + window.scrollY + 8;
    let left = rect.left + window.scrollX;
    let direction: "bottom" | "top" | "left" | "right" = "bottom";
    if (rect.bottom + 200 > window.innerHeight) {
      top = rect.top + window.scrollY - 8;
      direction = "top";
    }

    if (rect.left + 200 > window.innerWidth) {
      left = rect.right - 200 + window.scrollX;
      direction = "left";
    }

    if (left < 0) {
      left = 8;
      direction = "right";
    }

    setCoords({ top, left });
    setContent(content);
    setIsVisible(true);
  };

  const hideTooltip = () => setIsVisible(false);

  // Align Tooltip
  useEffect(() => {
    if (!tooltipRef.current) return;

    const rect = rectElement!;

    let top = rect.bottom + window.scrollY + 8;
    let left = rect.left + window.scrollX;
    let direction: "bottom" | "top" | "left" | "right" = "bottom";

    const tooltipWidth = tooltipRef.current.offsetWidth;
    const tooltipHeight = tooltipRef.current.offsetHeight;

    if (rect.bottom + tooltipHeight > window.innerHeight) {
      top = rect.top + window.scrollY - 8;
      direction = "top";
    }

    if (rect.left + tooltipWidth > window.innerWidth) {
      left = rect.right - tooltipWidth + window.scrollX;
      direction = "left";
    }

    if (left < 0) {
      left = 8;
      direction = "right";
    }

    setCoords({ top, left });
    setContent(content);
  }, [tooltipRef, isVisible]);

  // Hide tooltip on resize
  useEffect(() => {
    const handleResize = () => setIsVisible(false);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Clear state on route change
  useEffect(() => {
    setFilter("");
    setActiveMenu(pathname);
  }, [pathname]);

  return (
    <EHRContext.Provider
      value={{
        // Loading
        loading,

        // Tootips
        showTooltip,
        hideTooltip,

        // SideBar & Modal
        setModal,
        modalOpen,
      }}
    >
      {isVisible && (
        <div
          onClick={hideTooltip}
          className="absolute h-full w-full bg-[#00000012] top-0 left-0 z-1000"
        >
          <div
            ref={tooltipRef}
            className={`absolute transition-all duration-150`}
            style={{
              top: coords.top,
              left: coords.left,
              zIndex: 100,
              maxWidth: "300px",
            }}
          >
            {content}
          </div>
        </div>
      )}

      {/* {menu && (
        <div
          onClick={() => setMenu(false)}
          className="fixed w-screen h-screen bg-black/50 z-20"
        >
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            transition={{ duration: 0.2 }}
            className="relative w-3/5 h-full z-30 p-2 rounded-md bg-(--card)"
          >
            <SideBar activeMenu={activeMenu} />
          </motion.div>
        </div>
      )} */}

      <div className="min-h-screen bg-(--background) flex flex-col p-5 gap-3">
        <Header />
        {children}
      </div>
      {/* {modalOpen && (
        <div className="fixed h-screen w-full flex justify-center items-center bg-[#00000085] z-300">
          <div className="w-[90%] md:max-w-lg max-h-[90%] bg-(--card) rounded-sm overflow-y-scroll relative p-2">
            {
              {
              }[modalName]
            }
          </div>
        </div>
      )} */}
    </EHRContext.Provider>
  );
}
