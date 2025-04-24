import { type DataType } from '@/types/table.type'
import { type ReactNode } from 'react'

export interface ColumnType<T> {
  key: string
  title: string
  width?: number
  render?: (column: ColumnType<T>, item: T) => ReactNode
  valueGetter?: (params: any) => string
  editable?: boolean
  type?: DataType
  show?: boolean
}

export interface Props<T> {
  children?: ReactNode | undefined
  data: T[]
  columns: Array<ColumnType<T>>
  selectBox?: boolean
  isCellEditable?: (params: any) => boolean
  getRowData?: () => void
  onRowSelected?: (row: any) => void
  processRowUpdate?: (newRow: any, oldRow: any) => void
  resize?: boolean
  onLiveEdit?: (rowId: string, rowModel: T) => void
  onKeyUpCell?: (rowId: string, rowModel: T, keyCode: string) => void
  onChange?: (rowId: string, rowModel: T) => void
  onBeforeAdd?: (newRow: any, index: number) => boolean
  onAfterAdd?: (newRow: any, index: number) => void
}

export type Ref = HTMLElement

export const KEY_ROW_PREFIX = 'table-body-'
export const KEY_CELL_PREFIX = 'table-cell-'
