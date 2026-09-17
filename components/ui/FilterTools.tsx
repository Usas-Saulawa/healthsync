// components/ui/FilterTools.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";

// ==========================================
// 1. TYPES & INTERFACES
// ==========================================
export interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFilterClick?: () => void;
  placeholder?: string;
  className?: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface FilterDropdownProps {
  label?: string;
  selectedOption: string;
  options: FilterOption[];
  onSelect: (value: string) => void;
  className?: string;
}

export interface FilterToolbarProps {
  searchValue: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedTimeFilter: string;
  onTimeFilterSelect: (value: string) => void;
  timeOptions?: FilterOption[];
  className?: string;
}

const defaultTimeOptions: FilterOption[] = [
  { label: "Daily", value: "daily" },
  { label: "Weekly", value: "weekly" },
  { label: "Monthly", value: "monthly" },
  { label: "Yearly", value: "yearly" },
];

// ==========================================
// 2. SEARCH BAR COMPONENT
// ==========================================
export function SearchBar({
  value,
  onChange,
  onFilterClick,
  placeholder = "Search",
  className = "",
}: SearchBarProps) {
  return (
    <div
      className={`bg-(--card) rounded-full pl-5 pr-1.5 py-1.5 shadow-xs border border-slate-200/70 flex items-center justify-between gap-3 w-full sm:w-64 transition-all hover:border-slate-300 ${className}`}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        suppressHydrationWarning // <--- Prevents browser extensions from causing hydration mismatches
        className="bg-transparent text-sm font-normal text-slate-800 placeholder:text-slate-500 focus:outline-none w-full truncate"
      />

      <button
        type="button"
        onClick={onFilterClick}
        className="h-8 w-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60 transition-colors shadow-2xs"
        aria-label="Open filter options"
      >
        <SlidersHorizontal className="h-3.5 w-3.5 text-slate-600" />
      </button>
    </div>
  );
}

// ==========================================
// 3. FILTER DROPDOWN COMPONENT
// ==========================================
export function FilterDropdown({
  label = "Monthly",
  selectedOption,
  options = defaultTimeOptions,
  onSelect,
  className = "",
}: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      className={`relative inline-block text-left ${className}`}
      ref={dropdownRef}
    >
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="bg-(--card) rounded-full pl-5 pr-1.5 py-1.5 shadow-xs border border-slate-200/70 flex items-center justify-between gap-4 w-full sm:w-auto min-w-[130px] hover:border-slate-300 transition-all"
      >
        <span className="text-sm font-normal text-slate-800 truncate">
          {selectedOption || label}
        </span>

        <div className="h-8 w-8 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200/60 transition-colors shadow-2xs">
          <SlidersHorizontal className="h-3.5 w-3.5 text-slate-600" />
        </div>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-(--card) rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
            Filter by {label}
          </div>
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onSelect(opt.label);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                selectedOption === opt.label
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : "text-slate-700 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ==========================================
// 4. COMBINED FILTER TOOLBAR COMPONENT
// ==========================================
export function FilterToolbar({
  searchValue,
  onSearchChange,
  selectedTimeFilter,
  onTimeFilterSelect,
  timeOptions = defaultTimeOptions,
  className = "",
}: FilterToolbarProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <SearchBar
        value={searchValue}
        onChange={onSearchChange}
        placeholder="Search"
      />

      <FilterDropdown
        label="Monthly"
        selectedOption={selectedTimeFilter}
        options={timeOptions}
        onSelect={onTimeFilterSelect}
      />
    </div>
  );
}
