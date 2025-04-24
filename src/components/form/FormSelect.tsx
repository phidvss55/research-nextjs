import { Down_2, Up2 } from '@/assets/icons'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'

interface Option {
  value: string
  label: string
}
interface CustomSelectProps<T> {
  options: T[]
  isMultiple: boolean
  labelSelect: string
  getOptionData?: (option: any) => Option
}
const defaultLabel = (option: any) => ({ value: option.value, label: option.label })
export default function CustomSelect<T> ({ labelSelect, getOptionData = defaultLabel, options, isMultiple }: CustomSelectProps<T>) {
  const [listOption, setListOption] = useState<Option[]>([])
  const [selectedOptions, setSelectedOptions] = useState<string[]>([])
  const [isOpen, setOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  const toggleIsOpen = () => {
    setOpen(!isOpen)
  }

  useEffect(() => {
    setListOption(options.map(opt => getOptionData(opt)))
    const handleClickOutside = (e: MouseEvent) => {
      if ((selectRef.current != null) && !selectRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectRef, options])

  const handleOptionSelect = (option: string) => {
    if (isMultiple) {
      const index = selectedOptions.indexOf(option)

      if (index > -1) {
        setSelectedOptions(selectedOptions.filter((item) => item !== option))
      } else {
        setSelectedOptions([...selectedOptions, option])
      }
    } else {
      setSelectedOptions([option])
      setOpen(!isOpen)
    }
  }

  return (
        <div className="relative basis-2/6 inline-block w-full m-1" ref={selectRef}>
            <label htmlFor="select">{labelSelect}</label>
            <button
                type="button"
                id="select"
                className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg  shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                onClick={toggleIsOpen}
            >
                <span className="block break-all">{(selectedOptions.length > 0) ? selectedOptions.join(',') : 'Select an option'}</span>
                <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                    <Image src={isOpen ? Up2 : Down_2} alt="" width={15} />
                </span>
            </button>
            <div className={`${isOpen ? 'block' : 'hidden'} absolute z-10 w-full py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none`}>
                {listOption.map((opt) => (
                    <button
                        key={opt.value}
                        type="button"
                        className={`${selectedOptions.includes(opt.value) ? 'bg-blue-500 text-white' : 'text-gray-900'} w-full text-left px-3 py-2 rounded-md hover:bg-blue-500 hover:text-white`}
                        onClick={() => { handleOptionSelect(opt.value) }}
                    >
                        {opt.label}
                    </button>
                ))}
            </div>
        </div>
  )
}
