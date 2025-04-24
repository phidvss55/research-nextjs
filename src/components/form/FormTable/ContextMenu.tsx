import { ArrowDown, ArrowUp, Delete, Plus } from '@/assets/icons'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { type ColumnType, KEY_ROW_PREFIX } from './TableProps'
import { randomId } from '@/utils/randomId'
import useClickOutside from '@/lib/hooks/useClickoutside'

interface ContextMenuProps<T> {
  x: number
  y: number
  closeContextMenu: () => void
  rowSelected: string
  data: T[]
  onBeforeAdd?: (newRow: any, index: number) => boolean
  onAfterAdd?: (newRow: any, index: number) => void
  setRowSelected: React.Dispatch<React.SetStateAction<string>>
  columns: Array<ColumnType<T>>
  setCellIdFocus: React.Dispatch<React.SetStateAction<string>>

}
const initialRow = [
  {
    imgSrc: Plus,
    input: 'Add 1 row',
    type: 'ADD'
  },
  {
    imgSrc: Delete,
    input: 'Delete 1 row',
    type: 'DELETE'
  },
  {
    imgSrc: ArrowUp,
    input: 'Move up',
    type: 'MOVE_UP'
  },
  {
    imgSrc: ArrowDown,
    input: 'Move Down',
    type: 'MOVE_DOWN'
  }
]
export default function ContextMenu<T> ({
  x,
  y,
  closeContextMenu,
  rowSelected,
  data,
  onBeforeAdd,
  onAfterAdd,
  setRowSelected,
  columns,
  setCellIdFocus
}: ContextMenuProps<T>) {
  const contextMenuRef = useRef<HTMLDivElement>(null)
  const [top, setTop] = useState(y)
  const [left, setLeft] = useState(x)

  useEffect(() => {
    const heightWindow = 'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight
    const widthWindow = 'innerWidth' in window ? window.innerWidth : document.documentElement.offsetWidth
    const contextHeight = contextMenuRef.current?.offsetHeight || 0
    const contextWidth = contextMenuRef.current?.offsetWidth || 0
    if (contextHeight + y > heightWindow) {
      setTop(y - contextHeight)
    }
    if (contextWidth + x > widthWindow) {
      setLeft(x - contextWidth)
    }
  }, [])
  useClickOutside(contextMenuRef, closeContextMenu)
  const handleOnClick = (type: string) => {
    let index = 0
    if (rowSelected) {
      index = data.findIndex((row: any) => row.id === rowSelected.slice(KEY_ROW_PREFIX.length))
    }

    switch (type) {
      case 'ADD':
        const newRow: any = {}
        for (const property in data[0]) {
          newRow[`${property}`] = ''
        }
        newRow.id = randomId()
        const isRowValid = (onBeforeAdd == null) ? true : onBeforeAdd(newRow, index + 1)
        if (isRowValid) {
          data.splice(index + 1, 0, newRow)
          setRowSelected(`${KEY_ROW_PREFIX}${newRow.id}`)
          if (columns.length > 0) {
            setCellIdFocus(`table-row-${index + 1}-col-${columns[0].key}`)
          }
          if (onAfterAdd != null) onAfterAdd(newRow, index + 1)
        } else return

        break
      case 'DELETE':
        data.splice(index, 1)
        break
      case 'MOVE_UP':
        if (index > 0) {
          data.splice(index - 1, 0, data.splice(index, 1)[0])
        }
        break
      case 'MOVE_DOWN':
        if (index < data.length - 1) {
          data.splice(index + 1, 0, data.splice(index, 1)[0])
        }
        break
    }
  }
  return (
    <div
      id="context-menu"
      ref={contextMenuRef}
      onClick={closeContextMenu}
      className="absolute z-21 border-solid border-2 bg-slate-50 px-1 py-2 rounded-md flex flex-col justify-between w-40 h-fit break-all"
      style={{ top: `${top}px`, left: `${left}px` }}
    >
      {initialRow.map((row) => {
        return (
          <button
            onClick={() => { handleOnClick(row.type) }}
            key={row.input}
            className="flex flex-row items-center hover:bg-slate-200 hover:rounded-sm"
          >
            <Image src={row.imgSrc} alt="" width={18} />
            <div className="text-sm ml-3 my-1">{row.input}</div>
          </button>
        )
      })}
    </div>
  )
}
