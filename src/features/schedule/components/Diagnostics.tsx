import { TriangleDown, TriangleRight } from '@/assets/icons'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface CalculatedField {
  id: string
  label: string
  value: number
  unit: string
}
interface DiagnosticProps<T> {
  data: T[]
  getFirstSeaBuf?: (element: any) => number
}
const defaultSeabuf = (element: any) => element
export default function Diagnostic<T> ({ data, getFirstSeaBuf = defaultSeabuf }: DiagnosticProps<T>) {
  const [calculatedFields, setCalculatedFields] = useState<CalculatedField[]>([])
  const [isOpen, setOpen] = useState(false)
  const defaultValue = {
    id: '',
    label: '',
    value: 0,
    unit: ''
  }
  let sumSeaBuf = 0
  let sumSeaBufSPD = 0
  let maxSpeed = defaultValue
  let seaBuffRatio = defaultValue
  let buffSpeedRatio = defaultValue
  let largestSeaBuff = getFirstSeaBuf(data)
  let lowestSeaBuff = getFirstSeaBuf(data)
  useEffect(() => {
    data.forEach((field: any) => {
      sumSeaBuf += field?.sea_buf ? field.sea_buf : 0
      sumSeaBufSPD += field?.sea_buf_spd ? field.sea_buf_spd : 0
      if (largestSeaBuff < field.sea_buf) {
        largestSeaBuff = field.sea_buf
      }
      if (lowestSeaBuff > field.sea_buf) {
        lowestSeaBuff = field.sea_buf
      }
    })
    if (largestSeaBuff && lowestSeaBuff) {
      maxSpeed = { id: 'max_speed', label: 'Maximum speed', value: largestSeaBuff, unit: 'Kts.' }
      seaBuffRatio = {
        id: 'sea_buffer_ratio',
        label: 'Sea Buffer Ratio',
        value: Math.round(((largestSeaBuff - lowestSeaBuff) / sumSeaBuf) * 100),
        unit: '%'
      }
      buffSpeedRatio = {
        id: 'buff_speed_ratio',
        label: 'Buffer Speed Ratio',
        value: Math.round(((largestSeaBuff - lowestSeaBuff) / sumSeaBuf) * 100),
        unit: '%'
      }
    }
    setCalculatedFields([maxSpeed, seaBuffRatio, buffSpeedRatio])
  }, [data])
  const handleOpen = () => {
    setOpen(!isOpen)
  }
  return (
    <div>
      <div>
        <button onClick={handleOpen} className="flex flex-row">
          <Image src={isOpen ? TriangleDown : TriangleRight} alt="" width={16} />
          <span>Diagnostic</span>
        </button>
      </div>
      {isOpen && (
        <div className="rounded-sm w-full flex flex-row justify-start">
          {calculatedFields.map((field) => (
            <span className="mx-2" key={field.id}>
              <h3>{field.label}</h3>
              <div className="font-semibold text-xl">
                {field.value} {field.unit}
              </div>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}
