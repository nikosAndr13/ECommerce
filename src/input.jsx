import React from "react";
import Eye from '../src/assets/eye-solid.svg';

const Input = ({name, value, type, onChange, style, onClick, register, required}) => {
  return (
  <>
    <div className={`${style}`}>
      <input 
        {...register(name, required)}
        type={type} 
        name={name}
        className='w-10/12 outline-0 pl-2'
        value={value}
        onChange={onChange}
        placeholder={name[0].toUpperCase() + name.slice(1,name.length)}
        autoComplete='off'
        />
      {(type === 'password') 
      ? <img src={Eye} alt='Eye' onClick={onClick} className="w-4 opacity-50 hover:opacity-100 cursor-pointer"/> 
      : '' }
    </div>
  </>
  )
}

export default Input;