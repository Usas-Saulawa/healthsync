// components/tools/filterTools.tsx
"use client";

import { SlidersHorizontal, Check } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

export interface FilterOption {
  label: string;
  value: string;
}

interface MasterFilterToolbarProps {
  showSearch?: boolean;
  searchValue?: string;
  onSearchChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  searchPlaceholder?: string;
  onSearchIconClick?: () => void;

  showFilter?: boolean;
  filterLabel?: string;
  filterOptions?: FilterOption[];
  onFilterSelect?: (value: string, label: string) => void;

  showSort?: boolean;
  sortLabel?: string;
  sortOptions?: FilterOption[];
  onSortSelect?: (value: string, label: string) => void;

  // New variant prop to support both tinted blue or crisp white backgrounds
  variant?: "tinted" | "white";
  className?: string;
}

export function MasterFilterToolbar({
  showSearch = true,
  searchValue = "",
  onSearchChange,
  searchPlaceholder = "Search",
  onSearchIconClick,

  showFilter = true,
  filterLabel = "Monthly",
  filterOptions = [],
  onFilterSelect,

  showSort = true,
  sortLabel = "Sort by",
  sortOptions = [],
  onSortSelect,

  variant = "tinted",
  className = "",
}: MasterFilterToolbarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsFilterOpen(false);
        setIsSortOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const isFilterActive = filterLabel !== "Monthly" && filterLabel !== "Filter";
  const isSortActive = sortLabel !== "Sort by";

  // Dynamic conditional background classes based on the chosen variant
  const baseBgClass =
    variant === "white"
      ? "bg-white border-slate-200/80 text-[#0f172a] hover:bg-slate-50"
      : "bg-[#eff6ff] border-blue-200/70 text-[#0f172a] hover:bg-blue-100/50";

  const searchBgClass =
    variant === "white"
      ? "bg-white border-slate-200/80 focus-within:bg-white"
      : "bg-[#eff6ff] border-blue-200/60 focus-within:bg-white";

  return (
    <div
      ref={containerRef}
      className={`flex items-center gap-3 relative ${className}`}
    >
      {/* 1. Search Pill Component */}
      {showSearch && (
        <div
          className={`flex h-[40px] w-[120px] sm:w-[140px] items-center rounded-full pl-[16px] pr-[5px] shadow-2xs border transition-all duration-300 ease-in-out focus-within:w-56 ${searchBgClass}`}
        >
          <input
            type="text"
            value={searchValue}
            onChange={onSearchChange}
            placeholder={searchPlaceholder}
            className="min-w-0 flex-1 bg-transparent p-0 text-xs sm:text-sm font-medium text-[#0f172a] outline-none placeholder:text-slate-400"
          />
          <button
            type="button"
            onClick={onSearchIconClick}
            aria-label="Search action"
            className="flex h-[30px] w-[30px] shrink-0 items-center justify-center rounded-full bg-white text-[#0f172a] shadow-2xs hover:bg-slate-100 transition-colors"
          >
            <SlidersHorizontal className="h-3.5 w-3.5 stroke-[2]" />
          </button>
        </div>
      )}

      {/* 2. Filter Action Pill Component with Expandable Options */}
      {showFilter && (
        <div className="relative flex items-center">
          <div
            className={`flex items-center gap-1.5 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-full border border-blue-200 shadow-sm mr-2 ${
              isFilterOpen
                ? "max-w-[400px] opacity-100 px-3 py-1"
                : "max-w-0 opacity-0 px-0 py-1 border-transparent pointer-events-none"
            }`}
          >
            {filterOptions.map((opt) => {
              const isSelected = filterLabel === opt.label;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onFilterSelect?.(opt.value, opt.label);
                    setIsFilterOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-[#eff6ff] text-[#0f172a] hover:bg-blue-100 hover:text-blue-700"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[2.5]" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setIsFilterOpen(!isFilterOpen);
              setIsSortOpen(false);
            }}
            className={`flex h-[40px] items-center gap-4 rounded-full pl-4 pr-[5px] text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-2xs border ${
              isFilterActive || isFilterOpen
                ? "bg-blue-100/80 border-blue-300 text-blue-700 ring-2 ring-blue-500/10"
                : baseBgClass
            }`}
          >
            <span>{filterLabel}</span>
            <span
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full transition-colors shadow-2xs ${
                isFilterActive || isFilterOpen
                  ? "bg-blue-200 text-blue-800"
                  : "bg-white text-[#0f172a]"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5 stroke-[2]" />
            </span>
          </button>
        </div>
      )}

      {/* 3. Sort By Action Pill Component with Expandable Options */}
      {showSort && (
        <div className="relative flex items-center">
          <div
            className={`flex items-center gap-1.5 overflow-hidden transition-all duration-300 ease-in-out bg-white rounded-full border border-blue-200 shadow-sm mr-2 ${
              isSortOpen
                ? "max-w-[400px] opacity-100 px-3 py-1"
                : "max-w-0 opacity-0 px-0 py-1 border-transparent pointer-events-none"
            }`}
          >
            {sortOptions.map((opt) => {
              const isSelected = sortLabel === opt.label;
              return (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => {
                    onSortSelect?.(opt.value, opt.label);
                    setIsSortOpen(false);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-xs"
                      : "bg-[#eff6ff] text-[#0f172a] hover:bg-blue-100 hover:text-blue-700"
                  }`}
                >
                  {isSelected && <Check className="h-3 w-3 stroke-[2.5]" />}
                  <span>{opt.label}</span>
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => {
              setIsSortOpen(!isSortOpen);
              setIsFilterOpen(false);
            }}
            className={`flex h-[40px] items-center gap-4 rounded-full pl-4 pr-[5px] text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer shadow-2xs border ${
              isSortActive || isSortOpen
                ? "bg-blue-100/80 border-blue-300 text-blue-700 ring-2 ring-blue-500/10"
                : baseBgClass
            }`}
          >
            <span>{sortLabel}</span>
            <span
              className={`flex h-[30px] w-[30px] items-center justify-center rounded-full transition-colors shadow-2xs ${
                isSortActive || isSortOpen
                  ? "bg-blue-200 text-blue-800"
                  : "bg-white text-[#0f172a]"
              }`}
            >
              <SlidersHorizontal className="h-3.5 w-3.5 stroke-[2]" />
            </span>
          </button>
        </div>
      )}
    </div>
  );
}
