import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { FileExcel } from '@/assets/icons'
import Table from '@/components/form/FormTable/Table'
import { type ColumnType } from '@/components/form/FormTable/TableProps'
import { type DataTable } from '@/types/table.type'
import { getDataTableData } from '@/apis/datatable.repository'
import { formatDate } from '@/utils/format'
import ScheduleTableButton from './ScheduleTableButton'
import { ManageColumnContext } from '../context/scheduleContext'

const columns: Array<ColumnType<DataTable>> = [
  // {
  //     key: 'index',
  //     title: 'No.',
  //     width: 50,
  // },
  {
    key: 'direction',
    title: 'Direction',
    width: 150,
    editable: true
  },
  {
    key: 'port_code',
    title: 'Port Code',
    width: 150,
    editable: true
  },
  {
    key: 'tmnl_code',
    title: 'TMNL Code',
    width: 150
  },
  {
    key: 'zd',
    title: 'ZD',
    width: 150
  },
  {
    key: 'etb',
    title: 'ETB',
    width: 150,
    valueGetter: (params) => formatDate(params.etb),
    type: 'date'
  },
  {
    key: 'dist',
    title: 'Dist',
    width: 150
  },
  {
    key: 'sea_speed',
    title: 'Sea SPD',
    width: 150
  },
  {
    key: 'sea_time',
    title: 'Sea Time',
    width: 150
  },
  {
    key: 'sea_buf',
    title: 'Sea BUF',
    width: 150
  },
  {
    key: 'sea_buf_spd',
    title: 'Sea BUF SPD',
    width: 150
  }
]

const ScheduleTable = () => {
  const [data, setData] = useState<DataTable[]>([])
  const [showMngColumn, setShowMngColumn] = React.useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getDataTableData()
        setData(res)
      } catch (err) {
        throw new Error('data not found')
      }
    }
    fetchData()
  }, [])

  return (
    <ManageColumnContext.Provider value={{ showMngColumn, setShowMngColumn }}>
      <div className={`p-5 ${showMngColumn ? 'relative' : ''}`}>
        <ScheduleTableButton />

        {data.length > 0 && (
          <Table
            isCellEditable={(params: any) => {
              if (params?.field === 'direction') {
                return params?.row?.direction % 2 === 0
              }
              return true
            }}
            processRowUpdate={(newRow, oldRow) => {
              console.log(newRow, oldRow)
            }}
            selectBox={true}
            columns={columns}
            data={data}
            onChange={(rowId: string, rowModel: DataTable) => { console.log('onChange', rowId, rowModel) }}
            // onRowSelected={(data: any) => console.log('data', data)}
            // onBeforeAdd={(newRow, index) => {
            //   return !newRow.id ? false : true;
            // }}
            // onAfterAdd={(newRow, index) => {
            //   console.log('new row was added');
            // }}
          />
        )}
      </div>
    </ManageColumnContext.Provider>
  )
}

export default ScheduleTable
