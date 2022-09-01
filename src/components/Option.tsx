import React from 'react'

interface IProp {
    title: string,
    id: number
    cb: (Id: number) => void
}

const Option = ({ title, id, cb }: IProp) => {
  return (
    <div className='form-check my-3'>
        <input onClick={() => cb(id)} className='form-check-input' type="checkbox" id={`${title}-${id}`} />
        <label className='form-check-label' htmlFor={`${title}-${id}`}>{title}</label>
    </div>
  )
}

export default Option