"use client";

import { useMemo, useState } from "react";
import { ArrowUpDown } from "lucide-react";

/**
 * Generic column definition.
 *
 * T = the type of one row in the table.
 */
export interface DataTableColumn<T> {
  /**
   * Text displayed in the table header.
   */
  name: string;

  /**
   * Property from the row that should be displayed when
   * no custom cell renderer is provided.
   */
  selector: keyof T;

  /**
   * Custom cell renderer.
   *
   * `row` is the complete row object.
   *
   * Example:
   * cell: (row) => (
   *   <button onClick={() => console.log(row.id)}>
   *     {row.name}
   *   </button>
   * )
   */
  cell?: (row: T) => React.ReactNode;

  /**
   * Whether this column can be sorted.
   *
   * If false/undefined, the sort icon will not appear.
   */
  sortable?: boolean;

  /**
   * Optional custom class for the header.
   */
  headerClassName?: string;

  /**
   * Optional custom class for the cell.
   */
  cellClassName?: string;

  /**
   * Optional width/fraction for this column.
   *
   * Example: "1.5fr", "200px", "1fr"
   */
  width?: string;

  /**
   * Optional alignment.
   */
  align?: "left" | "center" | "right";
}

export interface DataTableProps<T> {
  /**
   * Data to display.
   *
   * For server-side pagination, this should normally contain
   * only the rows belonging to the current page.
   */
  data: T[];

  /**
   * Column definitions.
   */
  columns: DataTableColumn<T>[];

  /**
   * Current page.
   *
   * This should normally come from the parent component.
   */
  currentPage?: number;

  /**
   * Total number of pages.
   *
   * Usually returned by your API.
   */
  totalPages?: number;

  /**
   * Total number of records across all pages.
   *
   * Usually returned by your API.
   */
  totalRows?: number;

  /**
   * Number of rows to display per page.
   */
  rowsPerPage?: number;

  /**
   * Whether the pagination section should be displayed.
   */
  pagination?: boolean;

  /**
   * Called whenever the user changes page.
   */
  onPageChange?: (page: number) => void;

  /**
   * Loading state.
   */
  loading?: boolean;

  /**
   * Whether rows should have selection checkboxes.
   *
   * Defaults to true to preserve the existing table behavior.
   */
  selectable?: boolean;

  /**
   * Called when selected rows change.
   */
  onSelectedRowsChange?: (rows: T[]) => void;

  /**
   * Function used to uniquely identify a row.
   *
   * Defaults to row.id.
   */
  rowKey?: keyof T | ((row: T) => string | number);

  /**
   * Optional click handler for an entire row.
   */
  onRowClick?: (row: T) => void;

  /**
   * Text displayed when there is no data.
   */
  noDataText?: string;

  /**
   * Optional className for the outer container.
   */
  className?: string;
}

type SortOrder = "asc" | "desc";

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  currentPage = 1,
  totalPages = 1,
  totalRows = data.length,
  rowsPerPage = 7,
  pagination = true,
  onPageChange,
  loading = false,
  selectable = true,
  onSelectedRowsChange,
  rowKey = "id" as keyof T,
  onRowClick,
  noDataText = "No records found",
  className = "",
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<(string | number)[]>([]);
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  /**
   * Resolve the unique ID of a row.
   */
  const getRowKey = (row: T): string | number => {
    if (typeof rowKey === "function") {
      return rowKey(row);
    }

    return row[rowKey] as string | number;
  };

  /**
   * Sort the current data.
   *
   * Note:
   * This sorts the rows currently supplied to the component.
   *
   * If your API supports server-side sorting, you can replace
   * this behavior with an onSortChange callback.
   */
  const sortedData = useMemo(() => {
    if (!sortColumn) {
      return data;
    }

    return [...data].sort((a, b) => {
      let aValue: any = a[sortColumn];
      let bValue: any = b[sortColumn];

      if (aValue == null) aValue = "";
      if (bValue == null) bValue = "";

      if (typeof aValue === "string") {
        aValue = aValue.toLowerCase();
      }

      if (typeof bValue === "string") {
        bValue = bValue.toLowerCase();
      }

      if (aValue < bValue) {
        return sortOrder === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortOrder === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [data, sortColumn, sortOrder]);

  /**
   * Handle sorting.
   */
  const handleSort = (column: DataTableColumn<T>) => {
    if (!column.sortable) {
      return;
    }

    if (sortColumn === column.selector) {
      setSortOrder((current) => (current === "asc" ? "desc" : "asc"));
    } else {
      setSortColumn(column.selector);
      setSortOrder("asc");
    }
  };

  /**
   * Toggle one row's selection.
   */
  const handleToggleSelect = (row: T) => {
    const id = getRowKey(row);

    setSelectedIds((current) => {
      const next = current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];

      if (onSelectedRowsChange) {
        onSelectedRowsChange(
          data.filter((item) => next.includes(getRowKey(item))),
        );
      }

      return next;
    });
  };

  /**
   * Select/unselect all rows currently displayed.
   */
  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const ids = sortedData.map(getRowKey);

      setSelectedIds(ids);

      onSelectedRowsChange?.(sortedData);
    } else {
      setSelectedIds([]);

      onSelectedRowsChange?.([]);
    }
  };

  const isAllSelected =
    sortedData.length > 0 &&
    sortedData.every((row) => selectedIds.includes(getRowKey(row)));

  /**
   * Build the grid template dynamically from the supplied columns.
   *
   * This allows the component to work with any number of columns.
   */
  const gridTemplateColumns = useMemo(() => {
    const checkboxColumn = selectable ? "44px " : "";

    const columnWidths = columns
      .map((column) => column.width || "1fr")
      .join(" ");

    return `${checkboxColumn}${columnWidths}`;
  }, [columns, selectable]);

  /**
   * Pagination information.
   */
  const firstRecord = totalRows === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1;

  const lastRecord =
    totalRows === 0 ? 0 : Math.min(currentPage * rowsPerPage, totalRows);

  /**
   * Generate page numbers.
   */
  const pageNumbers = Array.from(
    { length: Math.max(totalPages, 1) },
    (_, index) => index + 1,
  );

  return (
    <div
      className={["w-full h-full min-h-0 bg-transparent", className].join(" ")}
    >
      <div className="w-full h-full min-h-0 overflow-x-auto">
        <div className="min-w-20 w-full h-full min-h-0 overflow-hidden bg-transparent shadow-2xs flex flex-col">
          <div
            className="grid shrink-0 pb-3 px-2 items-center text-[13px] font-medium text-(--shade)"
            style={{
              gridTemplateColumns,
            }}
          >
            {/* Select all */}
            {selectable && (
              <div className="flex items-center">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  disabled={loading || sortedData.length === 0}
                  className="h-3.25 w-3.25 cursor-pointer appearance-none rounded-xs border-[1.5px] border-[#71859A] bg-(--card) checked:border-[#1769FF] checked:bg-[#1769FF] disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
            )}

            {/* Dynamic columns */}
            {columns.map((column) => {
              const isSortable = column.sortable === true;

              const alignment =
                column.align === "right"
                  ? "justify-end"
                  : column.align === "center"
                    ? "justify-center"
                    : "justify-start";

              return (
                <div
                  key={String(column.selector)}
                  onClick={() => handleSort(column)}
                  className={[
                    "flex items-center gap-1.75 whitespace-nowrap select-none",
                    alignment,
                    isSortable ? "cursor-pointer" : "cursor-default",
                    column.headerClassName || "",
                  ].join(" ")}
                >
                  <span>{column.name}</span>

                  {isSortable && (
                    <ArrowUpDown
                      className="h-3.25 w-3.25 text-[#607286]"
                      strokeWidth={1.5}
                    />
                  )}
                </div>
              );
            })}
          </div>

          <div className="flex-1 min-h-0 overflow-y-auto space-y-1.75 pb-4">
            {loading &&
              Array.from({
                length: rowsPerPage,
              }).map((_, rowIndex) => (
                <div
                  key={`skeleton-${rowIndex}`}
                  className="grid h-12.5 items-center px-2 rounded-md bg-(--table-card) animate-pulse"
                  style={{
                    gridTemplateColumns,
                  }}
                >
                  {selectable && (
                    <div className="flex items-center">
                      <div className="h-3.25 w-3.25 rounded-xs bg-(--button)" />
                    </div>
                  )}

                  {columns.map((column, columnIndex) => (
                    <div
                      key={`skeleton-${rowIndex}-${columnIndex}`}
                      className="px-1"
                    >
                      <div
                        className={[
                          "h-2.5 rounded-full bg-(--shade)",
                          columnIndex === 0 ? "w-[70%]" : "w-[55%]",
                        ].join(" ")}
                      />
                    </div>
                  ))}
                </div>
              ))}

            {!loading &&
              sortedData.map((row) => {
                const id = getRowKey(row);
                const isSelected = selectedIds.includes(id);

                return (
                  <div
                    key={String(id)}
                    onClick={() => onRowClick?.(row)}
                    className={[
                      "grid h-12.5",
                      "items-center",
                      "px-2",
                      "rounded-md",
                      "transition-colors",
                      onRowClick ? "cursor-pointer" : "cursor-default",
                      isSelected
                        ? "bg-(--table-card) hover:bg-(--table-card)"
                        : "bg-(--table-card) hover:bg-(--table-card)",
                    ].join(" ")}
                    style={{
                      gridTemplateColumns,
                    }}
                  >
                    {/* Row checkbox */}
                    {selectable && (
                      <div
                        className="flex items-center"
                        onClick={(event) => event.stopPropagation()}
                      >
                        <input
                          type="checkbox"
                          aria-label="Select row"
                          checked={isSelected}
                          onChange={() => handleToggleSelect(row)}
                          className="h-3.25 w-3.25 cursor-pointer appearance-none rounded-xs border-[1.5px] border-(border) bg-transparent checked:border-[#1769FF] checked:bg-[#1769FF]"
                        />
                      </div>
                    )}

                    {/* Dynamic cells */}
                    {columns.map((column) => {
                      const alignment =
                        column.align === "right"
                          ? "text-right"
                          : column.align === "center"
                            ? "text-center"
                            : "text-left";

                      return (
                        <div
                          key={String(column.selector)}
                          className={[
                            "min-w-0 truncate",
                            "text-[11px]",
                            "leading-3.75",
                            alignment,
                            column.cellClassName || "font-normal",
                          ].join(" ")}
                        >
                          {column.cell
                            ? column.cell(row)
                            : String(row[column.selector] ?? "")}
                        </div>
                      );
                    })}
                  </div>
                );
              })}

            {/* ==========================================================
                EMPTY STATE
            ========================================================== */}

            {!loading && sortedData.length === 0 && (
              <div className="flex h-12.5 items-center justify-center text-[11px] text-[#718096]">
                {noDataText}
              </div>
            )}
          </div>

          {/* ============================================================
              PAGINATION
          ============================================================ */}

          {pagination && (
            <div className="flex shrink-0 h-18.5 items-center justify-between border-t border-slate-100 px-7 bg-(--card)">
              <p className="text-[12px] font-normal leading-4 text-[#64748B]">
                Showing {firstRecord}-{lastRecord} of {totalRows} records
              </p>

              <div className="flex items-center gap-1.5">
                {/* Previous */}
                <button
                  type="button"
                  onClick={() => onPageChange?.(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || loading}
                  className="flex h-8.75 items-center justify-center rounded-md border border-[#E1E6ED] bg-(--card) px-3 text-[12px] font-medium text-[#1E293B] transition-colors hover:bg-[#F7F9FC] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  Previous
                </button>

                {/* Page numbers */}
                {pageNumbers.map((pageNumber) => {
                  const isCurrentPage = currentPage === pageNumber;

                  return (
                    <button
                      key={pageNumber}
                      type="button"
                      onClick={() => onPageChange?.(pageNumber)}
                      disabled={loading}
                      aria-current={isCurrentPage ? "page" : undefined}
                      className={[
                        "flex h-8.75 w-8.75 items-center justify-center rounded-md",
                        "text-[12px] font-medium",
                        "transition-colors cursor-pointer",
                        isCurrentPage
                          ? "bg-[#2167F3] text-white"
                          : "border border-[#E1E6ED] bg-(--card) text-[#1E293B] hover:bg-[#F7F9FC]",
                        loading ? "cursor-not-allowed opacity-50" : "",
                      ].join(" ")}
                    >
                      {pageNumber}
                    </button>
                  );
                })}

                {/* Next */}
                <button
                  type="button"
                  onClick={() =>
                    onPageChange?.(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages || loading}
                  className="flex h-8.75 items-center justify-center rounded-md border border-[#E1E6ED] bg-(--card) px-3.75 text-[12px] font-medium text-[#1E293B] transition-colors hover:bg-[#F7F9FC] disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer"
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
