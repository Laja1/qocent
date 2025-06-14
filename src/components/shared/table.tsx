import type React from "react";
import { useState, useMemo } from "react";
import {
  Table,
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
} from "@/components/ui/card";
import { Search, Filter, Download, ChevronDown, ChevronUp } from "lucide-react";

export type ColumnDef<T> = {
  id: string;
  header: string;
  accessorKey: keyof T | ((row: T) => any);
  cell?: (row: T) => React.ReactNode;
  sortable?: boolean;
  filterType?: "text" | "select";
  filterOptions?: { label: string; value: string }[];
};

export type SortingState = {
  id: string;
  desc: boolean;
} | null;

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  initialSorting?: SortingState;
  filterableColumns?: string[];
};

export function DataTable<T>({
  data,
  columns,
  description,
  searchPlaceholder = "Search...",
  onRowClick,
  initialSorting = null,
  filterableColumns = [],
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sorting, setSorting] = useState<SortingState>(initialSorting);

  // Get accessor function for a column
  const getAccessor = (column: ColumnDef<T>) => {
    if (typeof column.accessorKey === "function") {
      return column.accessorKey;
    }
    return (row: T) => row[column.accessorKey as keyof T];
  };

  // Filter and sort data
  const processedData = useMemo(() => {
    let result = [...data];

    // Apply filters
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

  // Get filterable columns
  const filterColumns = columns.filter(
    (column) => filterableColumns.includes(column.id) && column.filterType
  );

  return (
  <div className="bg-white rounded-lg font-brfirma shadow-md py-2">
      <CardHeader>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {description && <CardDescription>{description}</CardDescription>}
          </div>
          <div className="flex flex-col md:flex-row gap-2">
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
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow className="">
                {columns.map((column) => (
                  <TableHead
                    key={column.id}
                    className={`font-semibold h-10 ${
                      column.sortable ? "cursor-pointer select-none" : ""
                    }`}
                    onClick={
                      column.sortable ? () => handleSort(column.id) : undefined
                    }
                  >
                    <div className="flex items-center">
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
            <tbody>
              {processedData.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-16 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              ) : (
                processedData.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={`hover:bg-gray-50 h-4 ${
                      onRowClick ? "cursor-pointer" : ""
                    }`}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                  >
                    {columns.map((column) => (
                      <td key={column.id} className="border-b py-1 px-2 text-xs">
                        {column.cell
                          ? column.cell(row)
                          : String(getAccessor(column)(row))}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </div>
        <div className="flex items-center justify-between mt-4 text-xs text-gray-500">
          <div>
            Showing {processedData.length} of {data.length} items
          </div>
        </div>
      </CardContent>
    </div>
  );
}
