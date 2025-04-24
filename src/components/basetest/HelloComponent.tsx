import React from 'react'

interface Props {
  name?: string | undefined
}

const HelloComponent = ({ name }: Props) => {
  return (
    <div>
      <h1>Hello Component {name}</h1>
    </div>
  )
}

export default HelloComponent
