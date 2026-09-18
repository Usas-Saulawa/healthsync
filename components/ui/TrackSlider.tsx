"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type NavItem = {
  name: string;
  path: string;
};

type TrackSliderProps = {
  navItems: NavItem[];
  currentPath: string;
  containerRef: React.RefObject<HTMLElement | null>;
  itemRefs: React.MutableRefObject<(HTMLButtonElement | null)[]>;
};

export default function TrackSlider({
  navItems,
  currentPath,
  containerRef,
  itemRefs,
}: TrackSliderProps) {
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  });

  const activeItem = navItems
    .filter(
      (item) =>
        currentPath === item.path || currentPath.startsWith(`${item.path}/`),
    )
    .sort((a, b) => b.path.length - a.path.length)[0];

  const activeIndex = navItems.findIndex(
    (item) => item.path === activeItem?.path,
  );

  useEffect(() => {
    if (activeIndex === -1) return;

    const updatePosition = () => {
      const button = itemRefs.current[activeIndex];
      const container = containerRef.current;

      if (!button || !container) return;

      const buttonRect = button.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      setPosition({
        x: buttonRect.left - containerRect.left - 4,
        y: buttonRect.top - containerRect.top - 4,
        width: buttonRect.width,
        height: buttonRect.height,
      });
    };

    requestAnimationFrame(updatePosition);

    window.addEventListener("resize", updatePosition);

    return () => {
      window.removeEventListener("resize", updatePosition);
    };
  }, [activeIndex, currentPath, containerRef, itemRefs]);

  if (activeIndex === -1) return null;

  return (
    <motion.div
      className="absolute z-0 rounded-full bg-(--active-bg)"
      initial={false}
      animate={{
        x: position.x,
        y: position.y,
        width: position.width,
        height: position.height,

        scaleX: [1, 0.82, 1.06, 1],
        scaleY: [1, 1.12, 0.96, 1],
      }}
      transition={{
        x: {
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.7,
        },

        y: {
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.7,
        },

        width: {
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.7,
        },

        height: {
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.7,
        },

        scaleX: {
          duration: 0.65,
          times: [0, 0.25, 0.7, 1],
          ease: "easeInOut",
        },

        scaleY: {
          duration: 0.65,
          times: [0, 0.25, 0.7, 1],
          ease: "easeInOut",
        },
      }}
      style={{
        transformOrigin: "center",
      }}
    />
  );
}
