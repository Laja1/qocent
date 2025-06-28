"use client"

import type React from "react"
import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {  CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Plus, X, Edit2, Save, MoreHorizontal } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export type MatrixCell = {
  value: string | number | React.ReactNode
  editable?: boolean
  className?: string
}

export type MatrixRow = {
  id: string
  label: string
  description?: string
  cells: Record<string, MatrixCell>
  editable?: boolean
}

export type MatrixColumn = {
  id: string
  label: string
  description?: string
  editable?: boolean
}

export type MatrixTableProps = {
  title?: string
  description?: string
  // Headers
  topLeftHeader?: string
  secondRowLeftHeader?: string
  // Data
  columns: MatrixColumn[]
  rows: MatrixRow[]
  // Callbacks
  onCellChange?: (rowId: string, columnId: string, value: string) => void
  onAddColumn?: () => void
  onRemoveColumn?: (columnId: string) => void
  onAddRow?: () => void
  onRemoveRow?: (rowId: string) => void
  onEditColumn?: (columnId: string, newLabel: string) => void
  onEditRow?: (rowId: string, newLabel: string) => void
  // Configuration
  allowAddColumns?: boolean
  allowRemoveColumns?: boolean
  allowAddRows?: boolean
  allowRemoveRows?: boolean
  allowEditHeaders?: boolean
  maxHeight?: string
  stickyHeaders?: boolean
  className?: string
}

export function MatrixTable({
  title,
  description,
  topLeftHeader = "PARAMETERS",
  secondRowLeftHeader = "PARAMETER CODE",
  columns,
  rows,
  onCellChange,
  onAddColumn,
  onRemoveColumn,
  onAddRow,
  onRemoveRow,
  onEditColumn,
  onEditRow,
  allowAddColumns = false,
  allowRemoveColumns = false,
  allowAddRows = false,
  allowRemoveRows = false,
  allowEditHeaders = false,
  maxHeight = "600px",
  stickyHeaders = true,
  className = "",
}: MatrixTableProps) {
  const [editingCell, setEditingCell] = useState<{ rowId: string; columnId: string } | null>(null)
  const [editingHeader, setEditingHeader] = useState<{ type: "row" | "column"; id: string } | null>(null)
  const [editValue, setEditValue] = useState("")

  const handleCellEdit = (rowId: string, columnId: string, currentValue: string) => {
    setEditingCell({ rowId, columnId })
    setEditValue(currentValue)
  }

  const handleCellSave = () => {
    if (editingCell && onCellChange) {
      onCellChange(editingCell.rowId, editingCell.columnId, editValue)
    }
    setEditingCell(null)
    setEditValue("")
  }

  const handleHeaderEdit = (type: "row" | "column", id: string, currentLabel: string) => {
    setEditingHeader({ type, id })
    setEditValue(currentLabel)
  }

  const handleHeaderSave = () => {
    if (editingHeader) {
      if (editingHeader.type === "column" && onEditColumn) {
        onEditColumn(editingHeader.id, editValue)
      } else if (editingHeader.type === "row" && onEditRow) {
        onEditRow(editingHeader.id, editValue)
      }
    }
    setEditingHeader(null)
    setEditValue("")
  }

  const getCellContent = (row: MatrixRow, column: MatrixColumn) => {
    const cell = row.cells[column.id]
    if (!cell) return ""

    if (editingCell?.rowId === row.id && editingCell?.columnId === column.id) {
      return (
        <div className="flex items-center space-x-2">
          <Input
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="h-8 text-sm"
            onKeyDown={(e) => {
              if (e.key === "Enter") handleCellSave()
              if (e.key === "Escape") setEditingCell(null)
            }}
            autoFocus
          />
          <Button size="sm" variant="ghost" onClick={handleCellSave}>
            <Save className="h-3 w-3" />
          </Button>
        </div>
      )
    }

    return (
      <div
        className={`min-h-[32px] flex items-center ${
          cell.editable !== false ? "cursor-pointer hover:bg-gray-50 rounded px-2" : ""
        } ${cell.className || ""}`}
        onClick={() => {
          if (cell.editable !== false && typeof cell.value === "string") {
            handleCellEdit(row.id, column.id, cell.value)
          }
        }}
      >
        {cell.value || <span className="text-gray-400 italic">{cell.editable !== false ? "Click to edit" : "—"}</span>}
      </div>
    )
  }

  return (
    <div className={className}>
      {(title || description) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {description && <CardDescription>{description}</CardDescription>}
        </CardHeader>
      )}
      <CardContent className="p-0">
        <div className="overflow-auto border rounded-xs" style={{ maxHeight }}>
          <Table className="rounded-sm">
            <TableHeader className={stickyHeaders ? "sticky top-0 z-10" : ""}>
              {/* First header row */}
              <TableRow className="bg-gray-00 border-b-2">
                <TableHead
                  className={`font-bold text-center border-r-2 min-w-[100px] ${
                    stickyHeaders ? "sticky left-0 z-20 bg-gray-100" : ""
                  }`}
                  rowSpan={1}
                >
                  {topLeftHeader}
                </TableHead>
                {columns.map((column) => (
                  <TableHead key={column.id} className="font-bold text-center border-r min-w-[160px] bg-gray-100">
                    {editingHeader?.type === "column" && editingHeader.id === column.id ? (
                      <div className="flex items-center space-x-1">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-8 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleHeaderSave()
                            if (e.key === "Escape") setEditingHeader(null)
                          }}
                          autoFocus
                        />
                        <Button size="sm" variant="ghost" onClick={handleHeaderSave}>
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center space-x-2">
                        <span
                          className={allowEditHeaders ? "cursor-pointer hover:text-blue-600" : ""}
                          onClick={() => {
                            if (allowEditHeaders) {
                              handleHeaderEdit("column", column.id, column.label)
                            }
                          }}
                        >
                          {column.label}
                        </span>
                        {(allowRemoveColumns || allowEditHeaders) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {allowEditHeaders && (
                                <DropdownMenuItem onClick={() => handleHeaderEdit("column", column.id, column.label)}>
                                  <Edit2 className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              )}
                              {allowRemoveColumns && (
                                <DropdownMenuItem onClick={() => onRemoveColumn?.(column.id)} className="text-red-600">
                                  <X className="h-4 w-4 mr-2" />
                                  Remove
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    )}
                  </TableHead>
                ))}
                {allowAddColumns && (
                  <TableHead className="w-12 bg-gray-100">
                    <Button variant="ghost" size="sm" onClick={onAddColumn} className="h-8 w-8 p-0">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TableHead>
                )}
              </TableRow>

              {/* Second header row */}
              <tr className="bg-gray-50 border-b">
                <TableHead
                  className={`font-semibold text-center border-r-2 ${
                    stickyHeaders ? "sticky left-0 z-20 bg-gray-50" : ""
                  }`}
                >
                  {secondRowLeftHeader}
                </TableHead>
                {columns.map((column) => (
                  <TableHead key={`${column.id}-sub`} className="text-center border-r text-xs text-gray-600  bg-gray-50">
                    {column.description && (
                      <Badge variant="outline" className="text-xs">
                        {column.description}
                      </Badge>
                    )}
                  </TableHead>
                ))}
                {allowAddColumns && <TableHead className="bg-gray-50" />}
              </tr>
            </TableHeader>

            <TableBody>
              {rows.map((row, rowIndex) => (
                <TableRow key={row.id} className={rowIndex % 2 === 0 ? "bg-white " : "bg-gray-25"}>
                  <TableCell
                    className={`font-medium border-r-2 bg-gray-50 ${stickyHeaders ? "sticky left-0 z-10" : ""}`}
                  >
                    {editingHeader?.type === "row" && editingHeader.id === row.id ? (
                      <div className="flex items-center space-x-1">
                        <Input
                          value={editValue}
                          onChange={(e) => setEditValue(e.target.value)}
                          className="h-8 text-sm"
                          onKeyDown={(e) => {
                            if (e.key === "Enter") handleHeaderSave()
                            if (e.key === "Escape") setEditingHeader(null)
                          }}
                          autoFocus
                        />
                        <Button size="sm" variant="ghost" onClick={handleHeaderSave}>
                          <Save className="h-3 w-3" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div>
                          <div
                            className={`font-medium ${allowEditHeaders ? "cursor-pointer hover:text-blue-600" : ""}`}
                            onClick={() => {
                              if (allowEditHeaders) {
                                handleHeaderEdit("row", row.id, row.label)
                              }
                            }}
                          >
                            {row.label}
                          </div>
                          {row.description && <div className="text-xs text-gray-500 mt-1">{row.description}</div>}
                        </div>
                        {(allowRemoveRows || allowEditHeaders) && (
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                                <MoreHorizontal className="h-3 w-3" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                              {allowEditHeaders && (
                                <DropdownMenuItem onClick={() => handleHeaderEdit("row", row.id, row.label)}>
                                  <Edit2 className="h-4 w-4 mr-2" />
                                  Edit
                                </DropdownMenuItem>
                              )}
                              {allowRemoveRows && (
                                <DropdownMenuItem onClick={() => onRemoveRow?.(row.id)} className="text-red-600">
                                  <X className="h-4 w-4 mr-2" />
                                  Remove
                                </DropdownMenuItem>
                              )}
                            </DropdownMenuContent>
                          </DropdownMenu>
                        )}
                      </div>
                    )}
                  </TableCell>
                  {columns.map((column) => (
                    <td key={`${row.id}-${column.id}`} className="border-r px-3 ">
                      {getCellContent(row, column)}
                    </td>
                  ))}
                  {allowAddColumns && <TableCell />}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {allowAddRows && (
          <div className="p-4 border-t bg-gray-50">
            <Button variant="outline" size="sm" onClick={onAddRow}>
              <Plus className="h-4 w-4 mr-2" />
              Add Parameter
            </Button>
          </div>
        )}
      </CardContent>
    </div>
  )
}
