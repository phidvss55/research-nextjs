import React, { type MouseEvent, useEffect, Fragment, useState } from 'react'
import { type ColumnType, KEY_ROW_PREFIX } from './TableProps'
import TableRowCell from './TableRowCell'
import ContextMenu from './ContextMenu'

interface Props<T> {
  data: T[]
  columns: Array<ColumnType<T>>
  isSelectBox?: boolean
  checkbox: {
    handleCheck: (e: React.ChangeEvent<HTMLInputElement>) => void
    isCheck: any[]
  }
  onRowSelected?: (row: any) => void
  isCellEditable?: (params: any) => boolean
  processRowUpdate?: (newRow: any, oldRow: any) => void
  onBeforeAdd?: (newRow: any, index: number) => boolean
  onAfterAdd?: (newRow: any, index: number) => void
  onLiveEdit?: (rowId: string, rowModel: T) => void
  onKeyUpCell?: (rowId: string, rowModel: T, keyCode: string) => void
  onChange?: (rowId: string, rowModel: T) => void
  setRowSelected: React.Dispatch<React.SetStateAction<string>>
  setContextMenu: React.Dispatch<
  React.SetStateAction<{
    isShowed: boolean
    x: number
    y: number
  }>
  >
  rowSelected: string
  cellIdFocus: string
  setCellIdForcus: React.Dispatch<React.SetStateAction<string>>
}

function TableRow<T> ({
  data,
  columns,
  processRowUpdate,
  onRowSelected,
  isCellEditable,
  isSelectBox = true,
  checkbox,
  setRowSelected,
  setContextMenu,
  rowSelected,
  cellIdFocus,
  setCellIdForcus,
  onBeforeAdd,
  onAfterAdd,
  onChange,
  onKeyUpCell,
  onLiveEdit
}: Props<T>) {
  const handleContextMenu = (e: MouseEvent<HTMLTableRowElement>, itemIndex: string) => {
    e.preventDefault()
    const { pageX, pageY } = e
    setRowSelected(itemIndex)
    setContextMenu({ isShowed: true, x: pageX, y: pageY })
  }
  const getKeyRow = (row: any) => {
    return `${KEY_ROW_PREFIX}${row.id}`
  }

  const handleOnRowSelected = (row: any, _index: number) => {
    setRowSelected(getKeyRow(row))
    if (onRowSelected != null) {
      onRowSelected(row)
    }
  }

  return (
    <>
      {data.map((item, itemIndex) => (
        <tr
          key={getKeyRow(item)}
          className={`"bg-white border-b-[0.5px] border-gray-300 hover:bg-gray-50" ${
            rowSelected === getKeyRow(item) ? 'bg-gray-200' : ''
          }`}
          role="row"
          onContextMenu={(e) => { handleContextMenu(e, getKeyRow(item)) }}
        >
          {isSelectBox && (
            <td className="w-4 p-4" role="cell">
              <div className="flex items-center">
                <input
                  id={`${itemIndex}`}
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  onChange={checkbox.handleCheck}
                  checked={checkbox.isCheck.includes(String(itemIndex))}
                />
                <label htmlFor={`${itemIndex}`} className="sr-only">
                  checkbox
                </label>
              </div>
            </td>
          )}

          <td className="py-4" role="cell">
            {itemIndex + 1}
          </td>

          {columns.map((column, columnIndex) => (
            <Fragment key={`table-row-cell-${columnIndex}`}>
              {(column.show || !column.hasOwnProperty('show')) && (
                <TableRowCell
                  isCellEditable={isCellEditable}
                  onRowSelected={(row) => { handleOnRowSelected(row, itemIndex) }}
                  key={`table-row-cell-${columnIndex}`}
                  item={item}
                  processRowUpdate={processRowUpdate}
                  column={column}
                  id={`table-row-${itemIndex}-col-${column.key}`}
                  cellIdFocus={cellIdFocus}
                  setCellIdForcus={setCellIdForcus}
                  onChange={onChange}
                  onKeyUpCell={onKeyUpCell}
                  onLiveEdit={onLiveEdit}
                />
              )}
            </Fragment>
          ))}
        </tr>
      ))}
    </>
  )
}

export default TableRow
