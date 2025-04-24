export interface DataTable {
  direction: number
  port_code: string
  tmnl_code: string
  zd: string
  etb: Date
  etd: Date
  sea_speed: string
  sea_time: string
  sea_buf: string
  sea_buf_spd: string
  cargo_volume: string
  dist: string
  id: string
}

export type DataType = 'text' | 'date' | 'number'
