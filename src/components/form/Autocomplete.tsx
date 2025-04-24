import { type AutocompleteProps } from '@/types/AutocompleteProps'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Down_2, Up2, Close } from '@/assets/icons'

const defaultLabel = (option: any) => option.label
const defaultSelectLabel = (option: any) => option.label

const Autocomplete = <T extends object>({
  showLabel = true,
  label,
  getOptionLabel = defaultLabel,
  getSelectedOptionLabel = defaultSelectLabel,
  multiple = false,
  options,
  onSelect
}: AutocompleteProps<T>) => {
  /* list option filted from string user typing */
  const [filteredOptions, setFilteredOptions] = useState<any[]>([])
  /* Using for multiple option */
  const [selectedValues, setSelectedValues] = useState<any[]>([])
  /* input text typing */
  const [inputValue, setInputValue] = useState<string>('')
  /* Open banner list options */
  const [isOpen, setIsOpen] = useState(false)
  /* autocomplete ref */
  const atcplRef = useRef<HTMLInputElement | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if ((atcplRef.current != null) && !atcplRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [atcplRef])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
    setIsOpen(true)
  }

  const highlightText = (text: string) => {
    return text.replace(new RegExp(inputValue, 'gi'), (match) => {
      return '<span class="font-semibold">' + match + '</span>'
    })
  }

  useEffect(() => {
    const filtered = options?.filter((option: any) => {
      const _option = getOptionLabel(option)
      return _option.toLowerCase().includes(inputValue.toLowerCase())
    }
    )
    setFilteredOptions(filtered)
  }, [options, inputValue])

  const handleOptionSelect = (option: any) => {
    if (multiple) {
      let newSelectedValues
      if (selectedValues.includes(option)) {
        newSelectedValues = selectedValues.filter(item => item !== option)
      } else {
        newSelectedValues = [...selectedValues, option]
      }
      setSelectedValues(newSelectedValues)
      onSelect(newSelectedValues)
      setInputValue('')
    } else {
      const _newValue = getSelectedOptionLabel(option) || getOptionLabel(option)
      setInputValue(_newValue)
      setSelectedValues([_newValue])
      onSelect(option)
      setIsOpen(false)
    }
  }

  const clearAllSelected = () => {
    setSelectedValues([])
    setInputValue('')
    inputRef.current?.focus()
  }

  const checkOptionIsSelected = (option: any) => {
    return selectedValues.includes(option)
  }

  const handleRemove = (value: string) => {
    const newSelectedValues = selectedValues.filter((v) => v !== value)
    setSelectedValues(newSelectedValues)
    onSelect(newSelectedValues)
  }

  const renderSelectedValue = (option: any, index: number) => (
    <div key={index} className="mr-2 my-2 flex text-sm md:text-base justify-center items-center bg-slate-200 rounded-md z-10 h-fit overflow-hidden">
      <span className="overflow-hidden pl-2 pr-1 whitespace-nowrap text-ellipsis">{getSelectedOptionLabel(option) || getOptionLabel(option)}</span>
      <Image src={Close} alt="" width={'14'} className={'mr-2 cursor-pointer z-1'} onClick={() => { handleRemove(option) }} />
    </div>
  )

  return (
    <div ref={atcplRef} className="relative autocomplete-root z-50">
      {showLabel && (<label htmlFor="autocomplete" className='text-sm md:text-base'>{label}</label>)}
      <div className={
        `flex flex-auto bg-white border border-gray-300 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent  
        ${!multiple ? '' : 'pl-2'}`
      }>
        {
          multiple && selectedValues.map((option: any, _i: number) => (
            renderSelectedValue(option, _i)
          ))
        }

        <div className={`relative flex-1 ${multiple && (selectedValues.length > 0) ? 'ml-10' : ''}`}>
          <input
            ref={inputRef}
            className={
              `w-full min-w-1/3 p-2 focus:outline-none rounded-md 
              ${!multiple ? 'border border-gray-300 shadow-md focus:ring-2 focus:ring-primary focus:border-transparent' : 'pl-0'}`
            }
            id="autocomplete"
            type="text"
            autoComplete="off"
            value={inputValue}
            onFocus={() => { setIsOpen(true) }}
            onChange={handleInputChange} />
          {isOpen
            ? (
            <Image
              onClick={() => { setIsOpen(false) }}
              src={Up2} alt="" className="absolute top-1/3 right-3 cursor-pointer z-10" width={16} />
              )
            : (
            <Image
              onClick={() => { setIsOpen(true) }}
              src={Down_2} alt="" className="absolute top-1/3 right-3 cursor-pointer z-10" width={16} />
              )}
          {multiple && (selectedValues.length > 0)
            ? (
            <Image src={Close} alt="" onClick={clearAllSelected} width="16" className="absolute top-1/3 right-8 cursor-pointer z-20" />
              )
            : null}
        </div>
      </div>

      {
        isOpen && (
          <ul className="absolute flex flex-col left-0 w-full h-[400px] mt-1 border border-gray-300 rounded-md bg-white shadow-md overflow-scroll z-50">
            {filteredOptions.map((option, _i) => (
              <li
                key={_i}
                className={`px-2 py-1 cursor-pointer hover:bg-gray-100 border-b-1 min-h-32 box-border ${checkOptionIsSelected(option) ? 'bg-selected' : ''}`}
                onClick={() => { handleOptionSelect(option) }}
                dangerouslySetInnerHTML={{ __html: highlightText(getOptionLabel(option)) }}
              >
              </li>
            ))}
          </ul>
        )
      }
    </div >
  )
}

export default Autocomplete
