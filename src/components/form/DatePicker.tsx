import React, { Fragment, useEffect, useRef, useState } from 'react'
import moment, { type Moment } from 'moment'
import Image from 'next/image'
import { AngleDoubleLeft, AngleDoubleRight, AngleLeft, AngleRight, Calendar, CaretDown, CaretUp } from '@/assets/icons'
import useClickOutside from '@/lib/hooks/useClickoutside'
import { setTimeout } from 'timers'
import { getYears } from '@/utils/format'

interface DatePickerProps {
  /**
   * label display
   */
  label?: string | null
  /**
   * The selected value
   */
  value?: Moment | null
  /**
   * custom format from user
   */
  format?: string
  /**
   * is input was disable
   */
  disable?: boolean
  /**
   * @param value
   * @returns
   */
  onChange: (value: any) => void
}

const defaultFormat = 'MMMM D, YYYY'
const CODE_FORMAT = 'YYYY-MM-DD'

const DatePicker: React.FC<DatePickerProps> = ({ label, disable = false, value, format = defaultFormat, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isShowYear, setIsShowYear] = useState(false)
  const [dayOfMonths, setDayOfMonths] = useState<any[]>([])

  /* get value from prop if it was passed from user */
  const [dateObjSelected, setDateObjSelected] = useState<moment.Moment | null>((value != null) || null)
  /* date use to handle mainly in component */
  const [dateShowing, setDateShowing] = useState<any>((dateObjSelected != null) || moment(new Date()))
  /* this date use to trigger for re-render component */
  const [dateCheck, setDateCheck] = useState(dateShowing.format(format))
  /* date showing at input  */
  const [dateInput, setDateInput] = useState<any>((value != null) ? value.format(format) : null)

  const [dateSelected, setDateSelected] = useState<any>(dateShowing ? dateShowing.format(CODE_FORMAT) : null)
  const ref = useRef<HTMLDivElement>(null)

  const onClickClose = () => {
    setIsOpen(false)
    setIsShowYear(false)
  }

  useClickOutside(ref, onClickClose)

  useEffect(() => {
    const dateHandling = dateShowing.clone()
    const startWeek = dateHandling.startOf('month').day()

    /* use to store date of previous month */
    const dateDummy = []
    for (let i = 0; i < startWeek; i++) {
      dateDummy.push({ show: false, day: 0, full: null })
    }

    /* dates of this month */
    const _dayOfMonths = Array(dateHandling.daysInMonth())
      .fill(0)
      .map((_, index) => {
        const current = moment().month(dateHandling.month()).year(dateHandling.year()).date(index + 1)
        return {
          show: true,
          day: index + 1,
          full: current.format(CODE_FORMAT)
        }
      })
    setDayOfMonths([...dateDummy, ..._dayOfMonths])
  }, [dateCheck])

  const handleSelectDate = (date: moment.Moment) => {
    setDateSelected(date.format(CODE_FORMAT))
    setDateShowing(date)
    setDateObjSelected(date)
    setDateCheck(date.format(format))
    setDateInput(date.format(format))

    onChange(date)
    setIsOpen(false)
  }

  const handleBtnHeader = (action: 'add' | 'minus', value: number) => {
    const newDate = dateShowing.clone()
    if (action === 'add') {
      newDate.add(value, 'months')
    } else {
      newDate.subtract(value, 'month')
    }

    const newDateShowing = moment(new Date()).utc().set('month', newDate.month()).set('year', newDate.year()).clone()
    setTimeout(() => {
      setDateShowing(newDateShowing)
      setIsShowYear(false)
      setDateCheck(newDate.format(format))
    })
  }

  const onChangeYear = (year: number) => {
    setDateShowing(dateShowing.set('year', year))
    setDateCheck(dateShowing.format(format))
    setIsShowYear(false)
  }

  const handleOnOpenYear = () => {
    setIsShowYear(!isShowYear)
    setTimeout(() => {
      const id = dateShowing.year()
      const ele = document.getElementById(`${id}`)
      ele?.scrollIntoView({ block: 'center', inline: 'nearest' })
    })
  }

  const handleClickToDay = () => {
    setDateShowing(moment(new Date()))
    setDateCheck(moment(new Date()).format(format))
    setDateSelected((moment(new Date()).format(CODE_FORMAT)))
    setDateInput((moment(new Date()).format(CODE_FORMAT)))

    setTimeout(() => {
      onClickClose()
    }, 200)
  }

  /* if datepicker was open at the bottom -> move above input */
  useEffect(() => {
    const boxHeight = ref.current?.getBoundingClientRect().height
    const screenBottom = window.innerHeight
    const datePicker = ref.current?.previousSibling
    if (datePicker instanceof Element) {
      const buttonBottom = datePicker?.getBoundingClientRect().bottom
      if (buttonBottom && boxHeight && buttonBottom + boxHeight > screenBottom) {
        ref.current.style.top = 'auto'
        ref.current.style.bottom = '100%'
      }
    }
  }, [isOpen])

  return (
    <div className="relative">
      {label && <label htmlFor={label} className='text-sm md:text-base'>{label}</label>}
      <div className='relative' onClick={() => { !disable ? setIsOpen(true) : null }}>
        <input
          id={label || ''}
          type="text"
          className={`
            px-4 w-full py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${disable ? 'bg-gray-100' : 'border-gray-300'}
          `}
          value={dateInput || format || 'Select Date'}
          readOnly
        />
        <Image src={Calendar} alt="" width={24} className={`absolute hidden md:block top-2 right-2 cursor-pointer ${disable ? 'opacity-40' : ''}`} />
      </div>

      {
        isOpen && (
          <div ref={ref} className="absolute z-10 top-full left-0 mt-2">
            <div className="bg-white border border-gray-300 rounded-lg shadow-lg relative min-w-[300px]">
              <div className="flex justify-between p-2 bg-gray-200 items-center">
                <div className='flex'>
                  <button className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => { handleBtnHeader('minus', 12) }}>
                    <Image src={AngleDoubleLeft} alt="" width={24} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => { handleBtnHeader('minus', 1) }}>
                    <Image src={AngleLeft} alt="" width={20} />
                  </button>
                </div>

                <div className="text-sm md:text-md font-semibold cursor-pointer flex relative text-center">
                  <span className='mr-2' onClick={handleOnOpenYear}>{dateShowing.clone().format('MMMM YYYY')}</span>
                  <Image src={isShowYear ? CaretUp : CaretDown} alt="" width={16} onClick={handleOnOpenYear} />
                </div>

                <div className='flex'>
                  <button className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => { handleBtnHeader('add', 1) }}>
                    <Image src={AngleRight} alt="" width={20} />
                  </button>
                  <button className="text-gray-600 hover:text-gray-800 cursor-pointer" onClick={() => { handleBtnHeader('add', 12) }}>
                    <Image src={AngleDoubleRight} alt="" width={24} />
                  </button>
                </div>
              </div>

              {/* select year banner */}
              {isShowYear && (
                <div className='grid grid-cols-4 absolute bg-white h-72 p-1 overflow-y-scroll left-0 top-10 border border-gray-300 font-medium w-full'>
                  {getYears().map((item: number) => (
                    <div id={item.toString()} onClick={() => { onChangeYear(item) }} key={item}
                      className={`text-center rounded-full my-1 py-2 mx-1 ${dateShowing.clone().year() === item ? 'bg-blue-600 text-white cursor-default' : 'hover:bg-slate-200 cursor-pointer'}`}>{item}</div>
                  ))}
                </div>
              )}

              <div className="p-2 m-4 pt-0 mb-2 font-medium">
                <div className="grid grid-cols-7 gap-1">
                  {/* calendar header */}
                  {moment.weekdaysMin().map((day, _index) => (
                    <div key={_index} className="text-sm text-center mx-2 font-medium text-gray-600">{day}</div>
                  ))}
                </div>

                <div className="grid grid-cols-7 gap-1 mt-2">
                  {/* stop calendar if date smaller than 1900-01-01 */}
                  {dateShowing.clone().startOf('month').startOf('week').toDate() < new Date('1900-01-01') &&
                    Array(dateShowing.clone().startOf('month').startOf('week').day())
                      .fill('')
                      .map((_, index) => (
                        <div key={index}></div>
                      ))}

                  {/* begin of calendar */}
                  {dayOfMonths && dayOfMonths.map((item, index) => (
                    <Fragment key={`${item.show}-${index}`}>
                      {
                        item.show
                          ? (
                          <div className={`text-sm text-center py-1 
                           ${dateSelected === item.full ? 'bg-blue-500 text-white rounded-lg cursor-default' : 'rounded-lg hover:bg-gray-100 cursor-pointer'}`}
                            onClick={() => { handleSelectDate(dateShowing.clone().date(item.day)) }}
                          >
                            {item.day}
                          </div>
                            )
                          : (<div></div>)
                      }
                    </Fragment>
                  ))}

                  {/* stop calendar if date over 2100-01-01 */}
                  {dateShowing.clone().endOf('month').endOf('week').toDate() > new Date('2100-01-01') &&
                    Array(6 - dateShowing.clone().endOf('month').endOf('week').day())
                      .fill('')
                      .map((_, index) => (
                        <div key={index}></div>
                      ))}
                </div>
              </div>
              <div className='flex justify-end gap-3 text-sm text-blue-500 my-2'>
                <button onClick={onClickClose} className='hover:bg-blue-100 rounded-md p-2'>Cancel</button>
                <button onClick={handleClickToDay} className='hover:bg-blue-100 rounded-md p-2 mr-3'>Today</button>
              </div>
            </div>
          </div>
        )
      }
    </div >
  )
}

export default DatePicker
