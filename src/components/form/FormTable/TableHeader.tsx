import React, { type DragEvent, Fragment, useRef, useState } from 'react'
import { type ColumnType } from './TableProps'

interface Props<T> {
  columns: Array<ColumnType<T>>
  isSelectBox?: boolean
  checkAll: {
    handleCheckAll: (e: React.ChangeEvent<HTMLInputElement>) => void
    isCheckAll: boolean
  }
  resize?: boolean
}

const createHeaders = (headers: any[]) => {
  return headers.map((item) => ({ item, ref: useRef(null) }))
}

function TableHeader<T> ({ columns, isSelectBox, checkAll, resize }: Props<T>) {
  const [drag, setDrag] = useState<{ iniMouse: number, iniSize: number }>()
  const NORef = useRef(null)
  const listColumn = createHeaders(columns)

  const handleStart = (ref: any) => (e: DragEvent<HTMLDivElement>) => {
    const iniMouse = e.clientX
    const iniSize = ref.current.offsetWidth
    console.table([iniMouse, iniSize])
    setDrag({
      iniMouse,
      iniSize
    })
  }

  const handleMove = (ref: any) => (e: DragEvent<HTMLDivElement>) => {
    if (e.clientX && (drag != null)) {
      const iniMouse = drag.iniMouse
      const iniSize = drag.iniSize
      const endMouse = e.clientX

      const endSize = iniSize + (endMouse - iniMouse)

      ref.current.style.width = `${endSize}px`
    }
  }

  return (
    <tr role="row">
      {isSelectBox && (
        <th scope="col" className="px-4 py-5" role="columnheader">
          <div className="flex items-center">
            <input
              id="checkbox-all-search"
              type="checkbox"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
              onChange={checkAll.handleCheckAll}
              checked={checkAll.isCheckAll}
            />
            <label htmlFor="checkbox-all-search" className="sr-only">
              checkbox
            </label>
          </div>
        </th>
      )}

      <th
        key={`table-head-cell-${1}`}
        style={{ width: columns[0].width }}
        className="relative py-5 border-r-1 border-gray-300"
        role="columnheader"
        ref={NORef}
      >
        No.
        {resize && (
          <div
            className="cursor-col-resize h-full absolute w-2 z-10 top-0 right-[-4px]"
            draggable
            onDragStart={handleStart(NORef)}
            onDrag={handleMove(NORef)}
          />
        )}
      </th>

      {listColumn.map(({ item, ref }, columnIndex) => (
        <Fragment key={`table-head-cell-${columnIndex}`}>
          {
            (item.show || !item.hasOwnProperty('show')) && (<th
              key={`table-head-cell-${columnIndex}`}
              style={{ width: item.width }}
              className="relative py-5 border-r-1 border-gray-300"
              role="columnheader"
              ref={ref}
            >
              {item.title}
              {resize && (
                <div
                  className="cursor-col-resize h-full absolute w-2 z-10 top-0 right-[-4px]"
                  draggable
                  onDragStart={handleStart(ref)}
                  onDrag={handleMove(ref)}
                />
              )}
            </th>
            )}
        </Fragment>
      ))}
    </tr>
  )
}

export default TableHeader
