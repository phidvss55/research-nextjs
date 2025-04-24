import Autocomplete from '@/components/form/Autocomplete'
import { type OptionType } from '@/types/AutocompleteProps'

interface ComponentProps<T> {
  options: T[]
  show?: boolean
}

const ShowAutocomplete = <T extends object>({ options, show = false }: ComponentProps<T>) => {
  const handleSelect = (option: OptionType) => {
    console.log('Selected option:', option)
  }

  return (
    <div className="" >
      <Autocomplete
        label="Search"
        options={options}
        multiple={true}
        // getSelectedOptionLabel={(option) => `${option.lane_code}`}
        getOptionLabel={(option) => `${option.lane_code} - ${option.lane_name}`}
        onSelect={handleSelect} />
    </div >
  )
}

export default ShowAutocomplete
