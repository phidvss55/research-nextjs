import { type DataTable } from '@/types/table.type'
import { baseApi } from './baseApi'
import { APIDomain } from './baseURL'

const client = new baseApi(APIDomain)

export async function getListLane () {
  return await client.get('/lane')
}
export async function getDataTableData (): Promise<DataTable[]> {
  return await client.get('/datatable')
}
