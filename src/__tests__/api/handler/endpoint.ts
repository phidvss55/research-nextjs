// apiEndpointHandler.ts
import { type NextApiRequest, type NextApiResponse } from 'next'
import { getDataTableData } from '@/apis/datatable.repository'

export async function apiEndpointHandler (req: NextApiRequest, res: NextApiResponse) {
  try {
    const data = await getDataTableData()
    const response = {
      success: true,
      data: [],
      users: data
    }
    res.statusCode = 200
    res.send(response)
  } catch (error) {
    console.error('Error occurred:', error)
    res.statusCode = 500
    res.send({ success: false, error: 'Internal Server Error' })
  }
}
