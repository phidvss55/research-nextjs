import React from 'react'
import DatePicker from '../components/form/DatePicker'
import moment, { type Moment } from 'moment'

const ShowDatePicker: React.FC = () => {
  const handleDateSelection = (selectedDate: any) => {
    console.log('Selected date:', selectedDate)
    setSelectedDate(selectedDate)
  }
  const [selectedDate, setSelectedDate] = React.useState<Moment | null>(moment('2023-12-12'))

  return <DatePicker
    format={'YYYY-MM-DD'}
    label={'Expiry Date'}
    value={(selectedDate != null) || null}
    disable={false}
    onChange={handleDateSelection} />
}

export default ShowDatePicker
