import type React from "react";
import { useState, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Filter,
  Download,
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export type ColumnDef<T> = {
  id: string;
  header: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  accessorKey: keyof T | ((row: T) => any);
  cell?: (row: T, rowIndex?: number) => React.ReactNode;
  sortable?: boolean;
  filterType?: "text" | "select";
  headerClassName?: string;
  filterOptions?: { label: string; value: string }[];
};

export type SortingState = {
  id: string;
  desc: boolean;
} | null;

export type ActionItem<T> = {
  label: string;
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

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  initialSorting?: SortingState;
  filterableColumns?: string[];
  // Pagination
  pageSize?: number;
  // Actions
  actions?: ActionItem<T>[];
  // Bulk actions
  bulkActions?: BulkAction<T>[];
  // Row selection
  getRowId?: (row: T, index: number) => string;
};

export function DataTable<T>({
  data,
  columns,
  title,
  description,
  searchPlaceholder = "Search...",
  onRowClick,
  initialSorting = null,
  filterableColumns = [],
  pageSize = 100,
  actions = [],
  bulkActions = [],
  getRowId = (_, index) => index.toString(),
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set());

  const getAccessor = (column: ColumnDef<T>) => {
    if (typeof column.accessorKey === "function") {
      return column.accessorKey;
    }
    return (row: T) => row[column.accessorKey as keyof T];
  };

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply search filter
    if (searchTerm) {
      result = result.filter((row) => {
        return columns.some((column) => {
          const value = getAccessor(column)(row);
          return (
            value &&
            String(value).toLowerCase().includes(searchTerm.toLowerCase())
          );
        });
      });
    }

    // Apply column-specific filters
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

    // Apply sorting
    if (sorting) {
      const column = columns.find((col) => col.id === sorting.id);
      if (column) {
        const accessor = getAccessor(column);
        result.sort((a, b) => {
          const valueA = accessor(a);
          const valueB = accessor(b);

          if (valueA === valueB) return 0;

          // Handle different types
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

  // Pagination calculations
  const totalPages = Math.ceil(processedData.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedData = processedData.slice(startIndex, endIndex);

  // Handle sorting
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

  //   const handleRowSelect = (rowId: string, checked: boolean) => {
  //     const newSelected = new Set(selectedRows);
  //     if (checked) {
  //       newSelected.add(rowId);
  //     } else {
  //       newSelected.delete(rowId);
  //     }
  //     setSelectedRows(newSelected);
  //   };

  // Get filterable columns
  const filterColumns = columns.filter(
    (column) => filterableColumns.includes(column.id) && column.filterType
  );

  // Check if we should show bulk actions
  const showBulkActions = bulkActions.length > 0 && selectedRows.size > 0;
  const selectedRowsData = paginatedData.filter((row, index) =>
    selectedRows.has(getRowId(row, startIndex + index))
  );

  // Enhanced columns with actions
  const enhancedColumns = useMemo(() => {
    const cols = [...columns];

    // Add actions column if actions are provided
    if (actions.length > 0) {
      cols.push({
        id: "actions",
        header: "",
        accessorKey: () => "",
        cell: (row: T) => (
          <div className="justify-center flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className=" rounded-xs ">
                {actions.map((action, index) => (
                  <DropdownMenuItem
                    key={index}
                    onClick={() => action.onClick(row)}
                    className={`cursor-pointer  ${
                      action.variant === "destructive"
                        ? "text-red-600 focus:text-red-600"
                        : ""
                    }`}
                  >
                    {action.icon && <action.icon className={`h-4 w-4 mr-2`} />}
                    {action.label}
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
  }, [columns, actions]);
  

  return (
    <div className="bg-white  py-2 font-brfirma ">
      <CardHeader>
        <div className="flex flex-col  md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex flex-col  md:flex-row gap-2">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder={searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 placeholder:text-xs w-full md:w-[350px]"
              />
            </div>
            <div className="flex gap-2">
              {filterColumns.map((column) => (
                <Select
                  key={column.id}
                  value={filters[column.id] || "all"}
                  onValueChange={(value) =>
                    setFilters((prev) => ({ ...prev, [column.id]: value }))
                  }
                >
                  <SelectTrigger className="w-[140px]">
                    <Filter className="h-4 w-4 mr-2" />
                    <SelectValue placeholder={column.header} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All {column.header}</SelectItem>
                    {column.filterOptions?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ))}
              <button className="border border-sm p-2">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {showBulkActions && (
          <div className="flex items-center gap-2 p-3 bg-blue-50 border border-blue-200 rounded-sm">
            <span className="text-sm font-medium text-blue-900">
              {selectedRows.size} item{selectedRows.size !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <div className="flex gap-2 ml-auto">
              {bulkActions.map((action, index) => (
                <Button
                  key={index}
                  variant={
                    action.variant === "destructive" ? "destructive" : "outline"
                  }
                  size="sm"
                  onClick={() => action.onClick(selectedRowsData)}
                >
                  {action.icon && <action.icon className="h-4 w-4 mr-2" />}
                  {action.label}
                </Button>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedRows(new Set())}
              >
                Clear selection
              </Button>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className="rounded-xs border">
          <Table>
            <TableHeader>
              <TableRow>
                {enhancedColumns.map((column) => (
                  <TableHead
                    key={column.id}
                    className={`font-semibold text-sm h-10 ${
                      column.sortable ? "cursor-pointer select-none" : ""
                    } ${column.headerClassName || ""}`}
                    onClick={
                      column.sortable ? () => handleSort(column.id) : undefined
                    }
                  >
                    <div
                      className={`flex items-center w-full ${
                        column.headerClassName?.includes("text-right")
                          ? "justify-end"
                          : ""
                      }`}
                    >
                      {column.header}
                      {column.sortable && sorting?.id === column.id && (
                        <span className="ml-1">
                          {sorting.desc ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronUp className="h-4 w-4" />
                          )}
                        </span>
                      )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {processedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={enhancedColumns.length}
                    className="h-16 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                paginatedData.map((row, rowIndex) => {
                  const actualIndex = startIndex + rowIndex;
                  const rowId = getRowId(row, actualIndex);
                  return (
                    <tr
                      key={rowId}
                      className={`hover:bg-gray-50  ${
                        onRowClick ? "cursor-pointer" : ""
                      } ${selectedRows.has(rowId) ? "bg-blue-50" : ""}`}
                      onClick={onRowClick ? () => onRowClick(row) : undefined}
                    >
                      {enhancedColumns.map((column) => (
                        <td key={column.id} className="border-b px-2  text-xs">
                          {column.cell
                            ? column.cell(row, rowIndex)
                            : String(getAccessor(column)(row))}
                        </td>
                      ))}
                    </tr>
                  );
                })
              )}
            </TableBody>
          </Table>
        </div>
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-500">
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
                    <span className="text-gray-500">...</span>
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
      </CardContent>
    </div>
  );
}
