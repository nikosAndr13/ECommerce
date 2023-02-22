import React from "react";

const Dropdown = ({name, value, onChange, array, register,required}) => (
  <>
    <select value={value} name={name} onChange={onChange} className='w-full outline-none border-2 p-2 rounded-md'>
      <option defaultValue={'Select'} disabled>{name}</option>
      {array.map(input => (
        <React.Fragment key={input}>
          <option value={input} name={name}>{input}</option>
        </React.Fragment>
      ))}
    </select>
  </>
)

export default Dropdown;