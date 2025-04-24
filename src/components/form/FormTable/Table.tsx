import React, { useEffect, useState } from 'react'
import TableHeader from './TableHeader'
import TableRow from './TableRow'
import { type Props } from './TableProps'
import ManageColumns from './ManageColumns'
import { ManageColumnContext } from '@/features/schedule/context/scheduleContext'
import ContextMenu from './ContextMenu'

function Table<T> ({
  resize = true,
  processRowUpdate,
  onRowSelected,
  onBeforeAdd,
  onAfterAdd,
  isCellEditable,
  data,
  columns,
  selectBox = true,
  onLiveEdit,
  onKeyUpCell,
  onChange
}: Props<T>) {
  const [isCheckAll, setIsCheckAll] = useState<boolean>(false)
  const [isCheck, setIsCheck] = useState<any[]>([])
  const [cloneData, setCloneData] = useState<T[]>(data)
  const { showMngColumn } = React.useContext(ManageColumnContext)
  const [columnsHandle, setColumnsHandle] = useState(columns)
  const initialContextMenu = {
    isShowed: false,
    x: 0,
    y: 0
  }
  const [rowSelected, setRowSelected] = useState('')
  const [contextMenu, setContextMenu] = useState(initialContextMenu)
  const [cellIdFocus, setCellIdForcus] = useState('')

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsCheckAll(!isCheckAll)
    setIsCheck(
      Array(data.length)
        .fill(null)
        .map((_, i) => String(i))
    )
    if (isCheckAll) {
      setIsCheck([])
    }
  }

  const handleCheck = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    setIsCheck([...isCheck, id])
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id))
    }
  }
  const closeContextMenu = () => {
    setContextMenu(initialContextMenu)
  }

  useEffect(() => {
    window.addEventListener('resize', closeContextMenu)
    window.addEventListener('scroll', closeContextMenu)
    return () => {
      window.removeEventListener('resize', closeContextMenu)
      window.removeEventListener('scroll', closeContextMenu)
    }
  }, [])

  useEffect(() => {
    const cell = document.getElementById(cellIdFocus)
    console.log(cell)
    cell?.scrollIntoView({ behavior: 'auto', block: 'end', inline: 'nearest' })
    cell?.focus()
  }, [cellIdFocus])

  return (
    <>
      {showMngColumn && <ManageColumns columns={columnsHandle} onChangeCheck={(params) => { setColumnsHandle(params) }} />}
      <div className="max-h-96 overflow-x-auto">
        <table className="w-full text-sm text-center">
          <thead className="bg-white border-b-[0.5px] border-gray-300 sticky top-0">
            <TableHeader
              columns={columnsHandle}
              isSelectBox={selectBox}
              checkAll={{ handleCheckAll, isCheckAll }}
              resize={resize}
            />
          </thead>
          <tbody className="h-96 overflow-y-auto">
            <TableRow
              data={cloneData}
              columns={columnsHandle}
              isSelectBox={selectBox}
              checkbox={{ handleCheck, isCheck }}
              isCellEditable={isCellEditable}
              onRowSelected={onRowSelected}
              processRowUpdate={processRowUpdate}
              onBeforeAdd={onBeforeAdd}
              onAfterAdd={onAfterAdd}
              onLiveEdit={onLiveEdit}
              onKeyUpCell={onKeyUpCell}
              onChange={onChange}
              setRowSelected={setRowSelected}
              setContextMenu={setContextMenu}
              rowSelected={rowSelected}
              cellIdFocus={cellIdFocus}
              setCellIdForcus={setCellIdForcus}
            />
          </tbody>
        </table>

        {contextMenu.isShowed && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            closeContextMenu={closeContextMenu}
            rowSelected={rowSelected}
            setRowSelected={setRowSelected}
            onBeforeAdd={onBeforeAdd}
            onAfterAdd={onAfterAdd}
            data={cloneData}
            columns={columns}
            setCellIdFocus={setCellIdForcus}
          />
        )}
      </div>
    </>
  )
}

export default Table
