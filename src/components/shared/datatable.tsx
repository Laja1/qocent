/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import type React from "react";
import { useState, useMemo, useEffect, useCallback, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Download,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileSpreadsheet,
  FileImage,
  Columns3,
} from "lucide-react";
import { IconFilter2, IconEye, IconEyeOff } from "@tabler/icons-react";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { Textfield } from "./textfield";
import { cn } from "@/lib/utils";

export const DEFAULT_TABLE_HEADER_COLOR = "bg-[#f6f6f6]";
export const DEFAULT_TABLE_PAGE_SIZE = 10;

export type HeaderAction = {
  icon: React.ComponentType<{ className?: string }>;
  onClick: () => void;
  tooltip?: string;
};

export type ColumnDef<T> = {
  id: string;
  header: string;
  accessorKey: keyof T | ((row: T) => any);
  cell?: (row: T, rowIndex?: number) => React.ReactNode;
  sortable?: boolean;
  filterType?: "text" | "select";
  headerClassName?: string;
  filterOptions?: { label: string; value: string }[];
  headerAction?: HeaderAction;
  exportable?: boolean;
  width?: string;
};

export type SortingState = {
  id: string;
  desc: boolean;
} | null;

export type ActionItem<T> = {
  label: string | ((row: T) => string);
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (row: T) => void;
  variant?: "default" | "destructive";
};

export type BulkAction<T> = {
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  onClick: (selectedRows: T[]) => void;
  variant?: "default" | "destructive";
};

export type ExportOptions = {
  filename?: string;
  includeHeaders?: boolean;
  dateFormat?: string;
};

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  buttonText?: string;
  buttonAction?: () => void;
  buttonShow?: boolean;
  initialSorting?: SortingState;
  filterableColumns?: string[];
  onFilterChange?: (filters: Record<string, string>) => void;
  highlightedRowId?: string | number;
  pageSize?: number;
  actions?: ActionItem<T>[];
  bulkActions?: BulkAction<T>[];
  getRowId?: (row: T, index: number) => string | number;
  showSearch?: boolean;
  showDownload?: boolean;
  isLoading?: boolean;
  skeletonRows?: number;
  exportOptions?: ExportOptions;
  emptyComponent?: React.ReactNode;
  enableRowSelection?: boolean;
  showPagination?: boolean;
  /** Tailwind background class(es) for the header row. Defaults to light grey. */
  headerColor?: string;
};

const Skeleton = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-md bg-black/8 ${className}`} />
);

// Utility function to convert data to CSV
const convertToCSV = <T,>(
  data: T[],
  columns: ColumnDef<T>[],
  options: ExportOptions = {}
): string => {
  const { includeHeaders = true } = options;
  const exportableColumns = columns.filter(
    (col) => col.exportable !== false && col.id !== "actions"
  );

  const csvRows: string[] = [];

  if (includeHeaders) {
    const headers = exportableColumns.map((col) => `"${col.header}"`);
    csvRows.push(headers.join(","));
  }

  data.forEach((row) => {
    const values = exportableColumns.map((col) => {
      const accessor =
        typeof col.accessorKey === "function"
          ? col.accessorKey
          : (row: T) => row[col.accessorKey as keyof T];
      const value = accessor(row);
      return `"${String(value || "").replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(","));
  });

  return csvRows.join("\n");
};

// Utility function to download file
const downloadFile = (
  content: string | Blob,
  filename: string,
  type: string
) => {
  const blob =
    content instanceof Blob ? content : new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export function DataTable<T>({
  data,
  columns,
  title,
  description,
  highlightedRowId,
  searchPlaceholder = "Search...",
  onRowClick,
  onFilterChange,
  initialSorting = null,
  filterableColumns = [],
  pageSize = DEFAULT_TABLE_PAGE_SIZE,
  actions = [],
  bulkActions = [],
  getRowId = (_, index) => index.toString(),
  showSearch = true,
  showDownload = true,
  isLoading = false,
  skeletonRows = DEFAULT_TABLE_PAGE_SIZE,
  buttonAction,
  buttonText,
  buttonShow,
  exportOptions = {},
  emptyComponent,
  enableRowSelection = false,
  showPagination = true,
  headerColor,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string | number>>(
    new Set()
  );
  const [hiddenColumns, setHiddenColumns] = useState<Set<string>>(new Set());
  const [columnWidths, setColumnWidths] = useState<Record<string, number>>({});
  const resizingRef = useRef<{ columnId: string; startX: number; startWidth: number } | null>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Initialize column widths from column defs
  useEffect(() => {
    const widths: Record<string, number> = {};
    columns.forEach((col) => {
      if (col.width) {
        const parsed = parseInt(col.width, 10);
        if (!isNaN(parsed)) widths[col.id] = parsed;
      }
    });
    setColumnWidths((prev) => ({ ...widths, ...prev }));
  }, [columns]);

  // Resize handlers
  const handleResizeStart = useCallback(
    (columnId: string, e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      const th = (e.target as HTMLElement).closest("th");
      if (!th) return;
      const startWidth = th.getBoundingClientRect().width;
      resizingRef.current = { columnId, startX: e.clientX, startWidth };

      const handleMouseMove = (moveEvent: MouseEvent) => {
        if (!resizingRef.current) return;
        const diff = moveEvent.clientX - resizingRef.current.startX;
        const newWidth = Math.max(50, resizingRef.current.startWidth + diff);
        setColumnWidths((prev) => ({ ...prev, [resizingRef.current!.columnId]: newWidth }));
      };

      const handleMouseUp = () => {
        resizingRef.current = null;
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.cursor = "";
        document.body.style.userSelect = "";
      };

      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    []
  );

  const toggleColumnVisibility = useCallback((columnId: string) => {
    setHiddenColumns((prev) => {
      const next = new Set(prev);
      if (next.has(columnId)) {
        next.delete(columnId);
      } else {
        next.add(columnId);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  }, [filters, onFilterChange]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, sorting, data.length]);

  const getAccessor = (column: ColumnDef<T>) => {
    if (typeof column.accessorKey === "function") {
      return column.accessorKey;
    }
    return (row: T) => row[column.accessorKey as keyof T];
  };

  const processedData = useMemo(() => {
    let result = [...data];
    if (searchTerm) {
      result = result.filter((row) =>
        columns.some((column) => {
          const value = getAccessor(column)(row);
          return (
            value &&
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );
        })
      );
    }

    Object.entries(filters).forEach(([columnId, filterValue]) => {
      if (filterValue && filterValue !== "all") {
        const column = columns.find((col) => col.id === columnId);
        if (column) {
          result = result.filter((row) => {
            const value = getAccessor(column)(row);
            return String(value).toLowerCase() === filterValue.toLowerCase();
          });
        }
      }
    });

    if (sorting) {
      const column = columns.find((col) => col.id === sorting.id);
      if (column) {
        const accessor = getAccessor(column);
        result.sort((a, b) => {
          const valueA = accessor(a);
          const valueB = accessor(b);

          if (valueA === valueB) return 0;

          if (typeof valueA === "string" && typeof valueB === "string") {
            return sorting.desc
              ? valueB.localeCompare(valueA)
              : valueA.localeCompare(valueB);
          }

          return sorting.desc
            ? valueB > valueA
              ? 1
              : -1
            : valueA > valueB
            ? 1
            : -1;
        });
      }
    }

    return result;
  }, [data, columns, searchTerm, filters, sorting]);

  const totalPages = Math.ceil(processedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = processedData.slice(startIndex, endIndex);

  const handleSort = (columnId: string) => {
    const column = columns.find((col) => col.id === columnId);
    if (!column?.sortable) return;

    setSorting((prev) => {
      if (prev?.id === columnId) {
        return prev.desc ? null : { id: columnId, desc: true };
      }
      return { id: columnId, desc: false };
    });
  };

  const handleFilterChange = (columnId: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [columnId]: value,
    }));
  };

  // NEW: Handle checkbox selection
  const handleCheckboxChange = (
    rowId: string | number,
    e: React.MouseEvent
  ) => {
    e.stopPropagation();
    setSelectedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  // NEW: Handle select all
  const handleSelectAll = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set());
    } else {
      const allIds = paginatedData.map((row, index) =>
        getRowId(row, startIndex + index)
      );
      setSelectedRows(new Set(allIds));
    }
  };

  // Export functions
  const baseFilename = exportOptions.filename || `${title || "data"}_${new Date().toISOString().split("T")[0]}`;

  const exportToCSV = () => {
    const filename = baseFilename.endsWith(".csv") ? baseFilename : `${baseFilename}.csv`;
    const csvContent = convertToCSV(processedData, columns, exportOptions);
    downloadFile(csvContent, filename, "text/csv");
  };

  const exportToExcel = () => {
    const filename = baseFilename.endsWith(".xlsx") ? baseFilename : `${baseFilename}.xlsx`;
    const exportableColumns = columns.filter(
      (col) => col.exportable !== false && col.id !== "actions"
    );

    const worksheetData = [
      exportOptions.includeHeaders !== false
        ? exportableColumns.map((col) => col.header)
        : [],
      ...processedData.map((row) =>
        exportableColumns.map((col) => {
          const accessor =
            typeof col.accessorKey === "function"
              ? col.accessorKey
              : (row: T) => row[col.accessorKey as keyof T];
          return accessor(row);
        })
      ),
    ].filter((row) => row.length > 0);

    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, title || "Data");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    downloadFile(
      blob,
      filename,
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
  };

  const exportToPDF = () => {
    const filename = baseFilename.endsWith(".pdf") ? baseFilename : `${baseFilename}.pdf`;
    const exportableColumns = columns.filter(
      (col) => col.exportable !== false && col.id !== "actions"
    );

    const doc = new jsPDF();

    if (title) {
      doc.setFontSize(16);
      doc.text(title, 14, 20);
    }

    const tableHeaders = exportableColumns.map((col) => col.header);
    const tableData = processedData.map((row) =>
      exportableColumns.map((col) => {
        const accessor =
          typeof col.accessorKey === "function"
            ? col.accessorKey
            : (row: T) => row[col.accessorKey as keyof T];
        const value = accessor(row);
        return String(value || "");
      })
    );

    autoTable(doc, {
      head: [tableHeaders],
      body: tableData,
      startY: title ? 30 : 20,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [66, 66, 66],
        textColor: 255,
        fontSize: 9,
        fontStyle: "bold",
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
    });

    doc.save(filename);
  };

  const filterColumns = columns.filter(
    (column) => filterableColumns.includes(column.id) && column.filterType
  );

  const showBulkActions = bulkActions.length > 0 && selectedRows.size > 0;
  const selectedRowsData = paginatedData.filter((row, index) =>
    selectedRows.has(getRowId(row, startIndex + index))
  );

  // Columns available for visibility toggling (user-defined columns only, not select/actions)
  const toggleableColumns = useMemo(
    () => columns.filter((col) => col.id !== "select" && col.id !== "actions"),
    [columns]
  );

  const enhancedColumns = useMemo(() => {
    // Filter out hidden columns first
    const visibleCols = columns.filter((col) => !hiddenColumns.has(col.id));
    const cols = [...visibleCols];

    // Add checkbox column if row selection is enabled
    if (enableRowSelection && bulkActions.length > 0) {
      cols.unshift({
        id: "select",
        header: "",
        accessorKey: () => "",
        exportable: false,
        cell: (row: T, rowIndex?: number) => {
          const rowId = getRowId(row, startIndex + (rowIndex || 0));
          return (
            <div
              className="flex justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <input
                type="checkbox"
                checked={selectedRows.has(rowId)}
                onChange={(e) => handleCheckboxChange(rowId, e as any)}
                onClick={(e) => e.stopPropagation()}
                className="size-4 cursor-pointer rounded-md border border-black/15 bg-white accent-primary"
              />
            </div>
          );
        },
        headerClassName: "w-12",
      } as ColumnDef<T>);
    }

    if (actions.length > 0) {
      cols.push({
        id: "actions",
        header: "",
        accessorKey: () => "",
        exportable: false,
        cell: (row: T) => (
          <div className="justify-center flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-7 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className=" rounded-md ">
                {actions.map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => action.onClick(row)}
                    className={`cursor-pointer  p-2 ${
                      action.variant === "destructive"
                        ? "text-red-600 focus:text-red-600"
                        : ""
                    }`}
                  >
                    {action.icon && <action.icon className={`h-4 w-4 mr-1`} />}
                    {typeof action.label === "function" ? action.label(row) : action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ),
        headerClassName: "",
      } as ColumnDef<T>);
    }
    return cols;
  }, [
    columns,
    actions,
    enableRowSelection,
    bulkActions.length,
    selectedRows,
    startIndex,
    hiddenColumns,
  ]);

  const renderSkeletonRows = () => {
    return Array.from({ length: skeletonRows }, (_, index) => (
      <TableRow key={`skeleton-${index}`}>
        {enhancedColumns.map((column) => (
          <TableCell key={column.id} className="border-b px-2">
            <Skeleton className="h-2 w-full" />
          </TableCell>
        ))}
      </TableRow>
    ));
  };

  const renderEmptyState = () => {
    if (emptyComponent) {
      return emptyComponent;
    }

    return (
      <TableRow>
        <TableCell
          colSpan={enhancedColumns.length}
          className="h-16 text-center"
        >
          No results found.
        </TableCell>
      </TableRow>
    );
  };

  const showToolbar = Boolean(
    title || description || showSearch || filterColumns.length > 0 || showDownload || buttonShow
  );

  return (
    <section className="rounded-lg border border-border bg-card p-5 text-foreground">
      {showToolbar && (
      <div className={cn(title || description ? "mb-5" : "mb-4")}>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          {(title || description) && (
          <div>
            {title && (
              <CardTitle className="text-sm font-semibold tracking-normal">
                {isLoading ? <Skeleton className="h-5 w-40" /> : title}
              </CardTitle>
            )}
            {description && (
              <CardDescription className="mt-1 text-xs text-muted-foreground">
                {isLoading ? (
                  <Skeleton className="mt-1 h-3 w-56" />
                ) : (
                  description
                )}
              </CardDescription>
            )}
          </div>
          )}

          <div className="flex flex-row items-center gap-2 md:ml-auto">
            {(showSearch || filterColumns.length > 0 || showDownload) && (
              <div className="flex flex-col gap-2 md:flex-row">
                {showSearch && (
                  <div className="relative">
                    <Textfield
                      name="search"
                      placeholder={searchPlaceholder}
                      value={searchTerm}
                      prefixIcon={
                        <Search className="size-4 text-muted-foreground" />
                      }
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-9 w-full rounded-md border-border bg-muted/50 pl-10 text-xs placeholder:text-xs md:w-[18rem]"
                      disabled={isLoading}
                    />
                  </div>
                )}

                {(filterColumns.length > 0 || showDownload) && (
                  <div className="flex items-center justify-center gap-2">
                    {filterColumns.map((column) => (
                      <Select
                        key={column.id}
                        value={filters[column.id] || "all"}
                        onValueChange={(value) =>
                          handleFilterChange(column.id, value)
                        }
                        disabled={isLoading}
                      >
                        <SelectTrigger className="h-9 w-full rounded-md border-border bg-muted/50 text-xs text-muted-foreground focus:ring-primary/15">
                          <IconFilter2 className="mr-2 size-4" />
                          <SelectValue
                            className="text-xs"
                            placeholder={column.header}
                          />
                        </SelectTrigger>
                        <SelectContent className="rounded-lg border-border bg-card">
                          <SelectItem className="text-xs" value="all">
                            All {column.header}
                          </SelectItem>
                          {column.filterOptions?.map((option) => (
                            <SelectItem
                              className="text-xs"
                              key={option.value}
                              value={option.value}
                            >
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    ))}
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          className="size-9 rounded-md border-border bg-muted/50 p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                          disabled={isLoading}
                          title="Toggle columns"
                        >
                          <Columns3 className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        align="end"
                        className="max-h-72 w-48 overflow-y-auto rounded-lg border-border bg-card"
                      >
                        <div className="px-2 py-1.5 text-xs font-semibold text-muted-foreground">
                          Toggle columns
                        </div>
                        {toggleableColumns.map((col) => {
                          const isHidden = hiddenColumns.has(col.id);
                          return (
                            <DropdownMenuItem
                              key={col.id}
                              onClick={(e) => {
                                e.preventDefault();
                                toggleColumnVisibility(col.id);
                              }}
                              className="flex cursor-pointer items-center gap-2 rounded-md text-xs"
                            >
                              {isHidden ? (
                                <IconEyeOff
                                  className="size-3.5 text-muted-foreground"
                                  stroke={1.5}
                                />
                              ) : (
                                <IconEye
                                  className="size-3.5 text-foreground"
                                  stroke={1.5}
                                />
                              )}
                              <span
                                className={
                                  isHidden ? "text-muted-foreground" : ""
                                }
                              >
                                {col.header}
                              </span>
                            </DropdownMenuItem>
                          );
                        })}
                        {hiddenColumns.size > 0 && (
                          <DropdownMenuItem
                            onClick={() => setHiddenColumns(new Set())}
                            className="mt-1 cursor-pointer border-t border-border pt-1 text-xs font-medium"
                          >
                            Show all columns
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {showDownload && (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="size-9 rounded-md border-border bg-muted/50 p-0 text-muted-foreground hover:bg-muted hover:text-foreground"
                            disabled={isLoading}
                          >
                            <Download className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                          align="end"
                          className="rounded-lg border-border bg-card"
                        >
                          <DropdownMenuItem
                            onClick={exportToCSV}
                            className="cursor-pointer text-xs"
                          >
                            <FileText className="mr-1 size-3.5" />
                            Export as CSV
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={exportToExcel}
                            className="cursor-pointer text-xs"
                          >
                            <FileSpreadsheet className="mr-1 size-3.5" />
                            Export as Excel
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={exportToPDF}
                            className="cursor-pointer text-xs"
                          >
                            <FileImage className="mr-1 size-3.5" />
                            Export as PDF
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    )}
                  </div>
                )}
              </div>
            )}

            {buttonShow && (
              <Button className="h-9 rounded-md px-3 text-xs" onClick={buttonAction}>
                {buttonText}
              </Button>
            )}
          </div>
        </div>

        {showBulkActions && !isLoading && (
          <div className="mt-4 flex items-center gap-2 rounded-lg border border-primary/15 bg-primary/8 p-3">
            <span className="text-xs font-medium text-primary">
              {selectedRows.size} item
              {selectedRows.size !== 1 ? "s" : ""} selected
            </span>
            <div className="ml-auto flex gap-2">
              {bulkActions.map((action, index) => (
                <Button
                  key={index}
                  variant={
                    action.variant === "destructive" ? "destructive" : "outline"
                  }
                  size="sm"
                  onClick={() => {
                    action.onClick(selectedRowsData);
                  }}
                >
                  {action.icon ? <action.icon className="size-4" /> : null}
                  {action.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 rounded-md text-xs text-muted-foreground"
                onClick={() => setSelectedRows(new Set())}
              >
                Clear selection
              </Button>
            </div>
          </div>
        )}
      </div>
      )}

      <CardContent className="mx-0 p-0">
        <div
          className="overflow-hidden rounded-lg border border-border"
          ref={tableRef}
        >
          <Table className="w-full border-collapse text-left text-xs">
            <TableHeader className="[&_tr]:border-border">
              <TableRow
                className={cn(
                  "border-border",
                  headerColor ?? cn(DEFAULT_TABLE_HEADER_COLOR, "hover:bg-[#f6f6f6]")
                )}
              >
                {enhancedColumns.map((column) => {
                  const isUtilityCol = column.id === "select" || column.id === "actions";
                  const widthStyle = columnWidths[column.id]
                    ? { width: `${columnWidths[column.id]}px` }
                    : column.width
                    ? { width: column.width }
                    : undefined;

                  return (
                    <TableHead
                      key={column.id}
                      style={widthStyle}
                      className={cn(
                        "relative h-11 border-b border-border px-3 text-xs font-semibold text-foreground",
                        column.sortable && !isLoading && "cursor-pointer select-none",
                        column.headerClassName
                      )}
                      onClick={
                        column.sortable && !isLoading
                          ? () => handleSort(column.id)
                          : undefined
                      }
                    >
                      <div
                        className={`flex items-center w-full pr-2 ${
                          column.headerClassName?.includes("text-right")
                            ? "justify-end"
                            : ""
                        } ${
                          column.headerClassName?.includes("text-center")
                            ? "justify-center"
                            : ""
                        }`}
                      >
                        {column.id === "select" && enableRowSelection ? (
                          <input
                            type="checkbox"
                            checked={
                              selectedRows.size === paginatedData.length &&
                              paginatedData.length > 0
                            }
                            onChange={handleSelectAll}
                            className="size-4 cursor-pointer rounded-md border border-black/15 bg-white accent-primary"
                            disabled={isLoading}
                          />
                        ) : (
                          <div className="flex items-center">
                            {column.header}
                            {column.headerAction && !isLoading && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 ml-1 hover:bg-gray-100"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  column.headerAction!.onClick();
                                }}
                                title={column.headerAction.tooltip}
                              >
                                <column.headerAction.icon className="h-3 w-3" />
                              </Button>
                            )}
                            {column.sortable &&
                              sorting?.id === column.id &&
                              !isLoading && sorting && (
                                <span className="ml-1">
                                  {sorting.desc ? (
                                    <ChevronDown className="h-4 w-4" />
                                  ) : (
                                    <ChevronUp className="h-4 w-4" />
                                  )}
                                </span>
                              )}
                          </div>
                        )}
                      </div>
                      {/* Resize handle */}
                      {!isUtilityCol && (
                        <div
                          className="absolute right-0 top-0 h-full w-1.5 cursor-col-resize group hover:bg-primary/30 active:bg-primary/50 z-10"
                          onMouseDown={(e) => handleResizeStart(column.id, e)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-4 bg-border group-hover:bg-primary/60 transition-colors" />
                        </div>
                      )}
                    </TableHead>
                  );
                })}
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading
                ? renderSkeletonRows()
                : processedData.length === 0
                ? renderEmptyState()
                : paginatedData.map((row, rowIndex) => {
                    const actualIndex = startIndex + rowIndex;
                    const rowId = getRowId(row, actualIndex);
                    return (
                      <tr
                        key={String(rowId)}
                        className={cn(
                          "border-b border-border text-foreground/80 transition-colors last:border-0",
                          onRowClick && "cursor-pointer",
                          selectedRows.has(rowId)
                            ? "bg-primary/8"
                            : highlightedRowId === rowId
                              ? "bg-primary/10 text-primary"
                              : "hover:bg-muted/40"
                        )}
                        onClick={onRowClick ? () => onRowClick(row) : undefined}
                      >
                        {enhancedColumns.map((column) => {
                          const widthStyle = columnWidths[column.id]
                            ? { width: `${columnWidths[column.id]}px` }
                            : undefined;
                          return (
                            <td
                              key={column.id}
                              style={widthStyle}
                              className="overflow-hidden text-ellipsis whitespace-nowrap border-b border-border/40 px-3 py-2 text-xs"
                            >
                              <div className="truncate">
                                {column.cell
                                  ? column.cell(row, rowIndex)
                                  : String(getAccessor(column)(row))}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
            </TableBody>
          </Table>
        </div>

        {!isLoading && showPagination && totalPages > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-muted-foreground">
              Showing {startIndex + 1} to{" "}
              {Math.min(endIndex, processedData.length)} of{" "}
              {processedData.length} items
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
              </Button>

              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNumber;
                  if (totalPages <= 5) {
                    pageNumber = i + 1;
                  } else if (currentPage <= 3) {
                    pageNumber = i + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNumber = totalPages - 4 + i;
                  } else {
                    pageNumber = currentPage - 2 + i;
                  }

                  return (
                    <Button
                      key={pageNumber}
                      variant={
                        currentPage === pageNumber ? "default" : "outline"
                      }
                      size="sm"
                      className="h-8 text-xs w-8 p-0"
                      onClick={() => setCurrentPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="text-muted-foreground">...</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 p-0"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {isLoading && (
          <div className="flex items-center justify-between mt-4">
            <Skeleton className="h-4 w-48" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
              <Skeleton className="h-8 w-8" />
            </div>
          </div>
        )}
      </CardContent>
    </section>
  );
}