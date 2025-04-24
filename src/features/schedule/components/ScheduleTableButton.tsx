import { FileExcel } from '@/assets/icons'
import Image from 'next/image'
import React from 'react'
import { ManageColumnContext } from '../context/scheduleContext'

const ScheduleTableButton = () => {
  const { showMngColumn, setShowMngColumn } = React.useContext(ManageColumnContext)

  return (
    <div className="flex items-center justify-end px-10 mx-10 mb-5">
      <button className="flex items-center gap-1 hover:bg-gray-100 py-2 px-3 rounded-sm">
        <Image src={FileExcel} alt="" width={16} className="text-red-500" />
        <span>Excel</span>
      </button>
      <button className='hover:bg-gray-100 py-2 px-3 rounded-sm' onClick={() => { setShowMngColumn(!showMngColumn) }}>
        <span>Fields displayed</span>
      </button>
    </div>
  )
}

export default ScheduleTableButton
