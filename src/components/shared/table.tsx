/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useMemo } from "react";
import { Search, Download, ChevronDown, ChevronUp, ChevronLeft, ChevronRight, Save, X, Edit } from "lucide-react";
import { Button } from "../ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Input } from "../ui/input";

// Enhanced column definition with editable support
export type ColumnDef<T> = {
  id: string;
  header: string;
  accessorKey: keyof T | ((row: T) => any);
  cell?: (row: T, rowIndex?: number) => React.ReactNode;
  editCell?: (row: T, rowIndex: number, value: any, onChange: (value: any) => void) => React.ReactNode;
  sortable?: boolean;
  editable?: boolean;
  filterType?: "text" | "select";
  headerClassName?: string;
  filterOptions?: { label: string; value: string }[];
  editType?: "text" | "select" | "number";
  editOptions?: { label: string; value: string }[];
};

export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  title?: string;
  description?: string;
  searchPlaceholder?: string;
  onRowClick?: (row: T) => void;
  onDataChange?: (data: T[]) => void;
  initialSorting?: { id: string; desc: boolean } | null;
  filterableColumns?: string[];
  highlightedRowId?: string;
  pageSize?: number;
  getRowId?: (row: T, index: number) => string;
  showSearch?: boolean;
  showDownload?: boolean;
  editable?: boolean;
  formik?: any; // Made optional since it's not always required
};

export function EditableDataTable<T extends Record<string, any>>({
  data,
  columns,
  title,
  description,
  highlightedRowId,
  searchPlaceholder = "Search...",
  onRowClick,
  onDataChange,
  initialSorting = null,
  filterableColumns = [],
  pageSize = 100,
  getRowId = (_, index) => index.toString(),
  showSearch = true,
  showDownload = true,
  editable = false,
  formik,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [sorting, setSorting] = useState<{ id: string; desc: boolean } | null>(initialSorting);
  const [currentPage, setCurrentPage] = useState(1);
  const [editingRows, setEditingRows] = useState<Set<string>>(new Set());
  const [editData, setEditData] = useState<Record<string, Record<string, any>>>({});
  const [tableData, setTableData] = useState<T[]>(data);

  const getAccessor = (column: ColumnDef<T>) => {
    if (typeof column.accessorKey === "function") {
      return column.accessorKey;
    }
    return (row: T) => row[column.accessorKey as keyof T];
  };

  // Custom Select component
  const Select = ({
    value,
    onValueChange,
    children,
    className = "",
  }: {
    value: string;
    onValueChange: (value: string) => void;
    children: React.ReactNode;
    className?: string;
  }) => {
    return (
      <select
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={`block w-full bg-white border border-gray-300 rounded-[4px] h-[30px] px-3 my-1 text-xs inset-ring focus:ring-1 focus:ring-green-900 focus:border-black ${className}`}
      >
        {children}
      </select>
    );
  };

  const processedData = useMemo(() => {
    let result = [...tableData];
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
            ? valueB > valueA ? 1 : -1
            : valueA > valueB ? 1 : -1;
        });
      }
    }

    return result;
  }, [tableData, columns, searchTerm, filters, sorting]);

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

  const handleEdit = (rowId: string) => {
    const row = paginatedData.find((row, index) => getRowId(row, startIndex + index) === rowId);
    if (row) {
      setEditingRows(new Set([...editingRows, rowId]));
      // Initialize edit data with current row values
      const initialEditData: Record<string, any> = {};
      columns.forEach((column) => {
        if (column.editable) {
          initialEditData[column.id] = getAccessor(column)(row);
        }
      });
      setEditData(prev => ({ ...prev, [rowId]: initialEditData }));
    }
  };

  const handleSave = (rowId: string) => {
    const rowIndex = tableData.findIndex((row, index) => getRowId(row, index) === rowId);
    
    if (formik) {
      formik.validateForm().then((errors: any) => {
        if (Object.keys(errors).length === 0) {
          savePendingChanges(rowId, rowIndex);
        }
      });
    } else {
      savePendingChanges(rowId, rowIndex);
    }
  };

  const savePendingChanges = (rowId: string, rowIndex: number) => {
    setEditingRows(new Set([...editingRows].filter(id => id !== rowId)));
    
    if (rowIndex !== -1 && editData[rowId]) {
      const updatedData = [...tableData];
      const updatedRow = { ...updatedData[rowIndex] } as T;
      
      // Apply edit changes
      Object.entries(editData[rowId]).forEach(([columnId, value]) => {
        const column = columns.find(col => col.id === columnId);
        if (column && typeof column.accessorKey === 'string') {
          (updatedRow as any)[column.accessorKey] = value;
        }
      });
      
      updatedData[rowIndex] = updatedRow;
      setTableData(updatedData);
      onDataChange?.(updatedData);
      
      // Clear edit state
      setEditingRows(new Set([...editingRows].filter(id => id !== rowId)));
      setEditData(prev => {
        const newData = { ...prev };
        delete newData[rowId];
        return newData;
      });
    }
  };

  const handleCancel = (rowId: string) => {
    setEditingRows(new Set([...editingRows].filter(id => id !== rowId)));
    setEditData(prev => {
      const newData = { ...prev };
      delete newData[rowId];
      return newData;
    });
  };

  const handleCellChange = (rowId: string, columnId: string, value: any) => {
    if (formik) {
      columns.forEach(column => {
        if (column.editable) {
          const row = paginatedData.find((row, index) => 
            getRowId(row, startIndex + index) === rowId
          );
          if (row) {
            formik.setFieldValue(
              column.id, 
              getAccessor(column)(row)
            );
          }
        }
      });
    }
    
    setEditData(prev => ({
      ...prev,
      [rowId]: {
        ...prev[rowId],
        [columnId]: value
      }
    }));
  };

  const filterColumns = columns.filter(
    (column) => filterableColumns.includes(column.id) && column.filterType
  );

  const enhancedColumns = useMemo(() => {
    const cols = [...columns];
    if (editable) {
      cols.push({
        id: "edit-actions",
        header: "Actions",
        accessorKey: () => "",
        cell: (row: T, rowIndex: number) => {
          const rowId = getRowId(row, startIndex + rowIndex);
          const isEditing = editingRows.has(rowId);
          
          return (
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    className="m-1 rounded-sm text-[8px]"
                    onClick={() => handleSave(rowId)}
                  >
                    <Save className="size-4" />
                  </button>
                  <button
                    className="m-1 rounded-sm text-[8px]"
                    onClick={() => handleCancel(rowId)}
                  >
                    <X className="size-4" />
                  </button>
                </>
              ) : (
                <button
                  className="m-1 rounded-sm text-[8px]"
                  onClick={() => handleEdit(rowId)}
                >
                  <Edit className="size-4"/>
                </button>
              )}
            </div>
          );
        },
        headerClassName: "w-24",
      } as ColumnDef<T>);
    }
    return cols;
  }, [columns, editable, editingRows, startIndex]);

  return (
    <div className="bg-white">
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            {title && <h2 className="text-2xl font-bold text-gray-900">{title}</h2>}
            {description && <p className="text-gray-600 mt-1">{description}</p>}
          </div>

          {(showSearch || filterColumns.length > 0 || showDownload) && (
            <div className="flex flex-col md:flex-row gap-2">
              {showSearch && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder={searchPlaceholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 w-full md:w-[350px]"
                  />
                </div>
              )}

              {(filterColumns.length > 0 || showDownload) && (
                <div className="flex gap-2">
                  {filterColumns.map((column) => (
                    <Select
                      key={column.id}
                      value={filters[column.id] || "all"}
                      onValueChange={(value) =>
                        setFilters((prev) => ({
                          ...prev,
                          [column.id]: value,
                        }))
                      }
                    >
                      <option value="all">All {column.header}</option>
                      {column.filterOptions?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </Select>
                  ))}
                  {showDownload && (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="border border-gray-200 rounded-xs overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              {enhancedColumns.map((column) => (
                <TableHead
                  key={column.id}
                  className={`font-semibold text-xs font-brfirma-bold h-8 ${
                    column.sortable ? "cursor-pointer select-none" : ""
                  } ${column.headerClassName || ""}`}
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
          <TableBody>
            {processedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={enhancedColumns.length} className="text-center py-8">
                  No results found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((row, rowIndex) => {
                const actualIndex = startIndex + rowIndex;
                const rowId = getRowId(row, actualIndex);
                const isEditing = editingRows.has(rowId);
                
                return (
                  <tr
                    key={rowId}
                    className={`${onRowClick ? "cursor-pointer" : " border-b border"} ${
                      highlightedRowId === rowId ? "bg-yellow-50" : ""
                    }`}
                    onClick={onRowClick && !isEditing ? () => onRowClick(row) : undefined}
                  >
                    {enhancedColumns.map((column) => (
                      <td key={column.id} className="border-b pl-2 text-xs">
                        {column.id === "edit-actions" ? (
                          column.cell?.(row, rowIndex)
                        ) : isEditing && column.editable ? (
                          column.editCell ? (
                            column.editCell(
                              row,
                              rowIndex,
                              editData[rowId]?.[column.id] || getAccessor(column)(row),
                              (value) => handleCellChange(rowId, column.id, value)
                            )
                          ) : (
                            <div className="">
                              {column.editType === "select" ? (
                                <select
                                  name={column.id}
                                  value={formik ? (formik.values[column.id] || getAccessor(column)(row)) : (editData[rowId]?.[column.id] || getAccessor(column)(row))}
                                  onChange={(e) => {
                                    if (formik) {
                                      formik.handleChange(e);
                                    }
                                    handleCellChange(rowId, column.id, e.target.value);
                                  }}
                                  onBlur={formik ? formik.handleBlur : undefined}
                                  className="block w-full bg-white border border-gray-300 rounded-[4px] h-[30px] px-3 text-xs inset-ring focus:ring-1 focus:ring-green-900 focus:border-black"
                                >
                                  {column.editOptions?.map((option) => (
                                    <option key={option.value} value={option.value}>
                                      {option.label}
                                    </option>
                                  ))}
                                </select>
                              ) : (
                                <input
                                  type={column.editType || "text"}
                                  name={column.id}
                                  value={formik ? (formik.values[column.id] || getAccessor(column)(row)) : (editData[rowId]?.[column.id] || getAccessor(column)(row))}
                                  onChange={(e) => {
                                    if (formik) {
                                      formik.handleChange(e);
                                    }
                                    handleCellChange(rowId, column.id, e.target.value);
                                  }}
                                  onBlur={formik ? formik.handleBlur : undefined}
                                  className="block w-full bg-white border border-gray-300 rounded-[4px] h-[30px] px-3 text-xs inset-ring focus:ring-1 focus:ring-green-900 focus:border-black"
                                />
                              )}
                              {formik && formik.touched[column.id] && formik.errors[column.id] ? (
                                <div className="text-red-500 text-xs mt-1">
                                  {formik.errors[column.id]}
                                </div>
                              ) : null}
                            </div>
                          )
                        ) : (
                          column.cell
                            ? column.cell(row, rowIndex)
                            : String(getAccessor(column)(row))
                        )}
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
              <ChevronLeft className="h-4 w-4" />
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
                    variant={currentPage === pageNumber ? "default" : "outline"}
                    size="sm"
                    className="w-8 h-8 p-0"
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}