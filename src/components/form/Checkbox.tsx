import React from 'react'

interface Props {
  id: string
  type: string
  name: string
  handleClick: () => void
  isChecked: boolean
}

const Checkbox = ({ id, type, name, handleClick, isChecked }: Props) => {
  return <input id={id} name={name} type={type} onChange={handleClick} checked={isChecked} />
}

export default Checkbox
