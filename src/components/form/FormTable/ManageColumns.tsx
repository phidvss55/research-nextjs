import { ManageColumnContext } from '@/features/schedule/context/scheduleContext'
import { type ColumnType } from './TableProps'
import useClickOutside from '@/lib/hooks/useClickoutside'
import React, { useEffect, useRef, useState } from 'react'

interface Props<T> {
  columns: Array<ColumnType<T>>
  onChangeCheck: (columns: any) => void
}

const ManageColumns = <T extends any>({ columns, onChangeCheck }: Props<T>) => {
  const { setShowMngColumn } = React.useContext(ManageColumnContext)
  const divRef = useRef<HTMLDivElement>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [columnsHandle, setColumnsHandle] = useState<Array<ColumnType<T>>>(columns)

  useClickOutside(divRef, () => { setShowMngColumn(false) })

  const handleCheckOne = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    const _columns = columnsHandle.map((item: any) => {
      if (item.key === id) {
        item.show = checked
      }
      return item
    })
    setColumnsHandle(_columns)
  }

  useEffect(() => {
    const _columns = JSON.parse(JSON.stringify(columns))
    _columns.map((item: any) => {
      const _check = columnsHandle.findIndex((_item: any) => item.key === _item.key)
      if (_check !== -1) {
        item.show = columnsHandle[_check].hasOwnProperty('show') ? columnsHandle[_check].show : true
      }
      return item
    })

    onChangeCheck(_columns)
  }, [columnsHandle])

  const highlightText = (text: string) => {
    return text.replace(new RegExp(searchQuery, 'gi'), (match) => {
      return '<span class="font-bold">' + match + '</span>'
    })
  }

  useEffect(() => {
    const filtered = columns.filter((option: any) => {
      return option.title.toLowerCase().includes(searchQuery.toLowerCase())
    })
    setColumnsHandle(filtered)
  }, [searchQuery])

  const handleCheckButton = (type: 'hide' | 'check') => {
    const checked = (type !== 'hide')
    const _columns = columnsHandle.map((item: any) => {
      item.show = checked
      return item
    })
    setColumnsHandle(_columns)
  }

  return (
    <div ref={divRef} className='w-3/5 md:w-2/5 xl:w-1/5 max-h-96 px-3 pt-4 pb-2 bg-white shadow-lg border border-gray-200 antialiased text-sm absolute top-40 2xl:top-36 left-8 z-10'>
      <div className="relative">
        <input value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value) }} type="text" id="floating_outlined" className="px-2 pb-2 pt-2 w-full text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " />
        <label htmlFor="floating_outlined" className="absolute text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1">Find Columns</label>
      </div>

      <div className='my-3 flex flex-col max-h-48 overflow-y-scroll'>
        {columnsHandle && columnsHandle.map((item: any) => (
          <label key={item.key} className="relative inline-flex items-center mb-2 mt-1 cursor-pointer mx-2">
            <input type="checkbox" id={`${item.key}`} className="sr-only peer" checked={item.show || !item.hasOwnProperty('show')} onChange={handleCheckOne} />
            <div className="w-9 min-w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span
              className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300 whitespace-nowrap overflow-hidden text-ellipsis"
              dangerouslySetInnerHTML={{ __html: highlightText(item.title) }}
            ></span>
          </label>
        ))}
      </div>

      <div className='flex mt-2 justify-between gap-2'>
        <button onClick={() => { handleCheckButton('hide') }} className='bg-transparent hover:bg-blue-100 text-blue-700 font-semibold py-2 px-1 hover:border-transparent rounded'>Hide All</button>
        <button onClick={() => { handleCheckButton('check') }} className='bg-transparent hover:bg-blue-100 text-blue-700 font-semibold py-2 px-1 hover:border-transparent rounded'>Show All</button>
      </div>
    </div>
  )
}

export default ManageColumns
