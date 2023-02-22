import React from "react";
import {useForm} from 'react-hook-form';
import {countries, cities, states} from './countries';
import Input from "./input";
import { generateErrs } from "./validations";
import Dropdown from "./Dropdown";
import SummaryScreen from "./Summary";

const CheckOut = ({dispatch, shipInfo, onSubmit, setRender, cart, dispatch2, discount}) => {
  const {register, formState: {errors}, handleSubmit} = useForm();

  const handleChange = ({target: {name, value}}) => {
    dispatch({
      type: 'updateShipForm',
      key: name,
      value: value
    })
  }

  return (
    <div className="flex justify-center gap-x-14">
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-fit mt-1 gap-y-2 border-2 p-4 h-fit rounded-lg'>
        {Object.entries(shipInfo).map((field, index) => {
          if (field[0] === 'Country') {return (
              <React.Fragment key={field[0]}>
                <div className="border-2 p-3 rounded-md">
                  <Dropdown 
                  name={field[0]} 
                  value={field[1]} 
                  onChange={handleChange} 
                  array={countries}
                  register={register}
                  required={generateErrs(field[0])}  
                  />
                </div>
              </React.Fragment>
            )}
          if (field[0] === 'City') {return (
              <React.Fragment key={field[0]}>
                <div className="border-2 p-3 rounded-md">
                  <Dropdown 
                  name={field[0]} 
                  value={field[1]} 
                  onChange={handleChange}
                  array={cities}
                  register={register}
                  required={generateErrs(field[0])}  
                  />
                </div>
              </React.Fragment>
            )}
          if (field[0] === 'State') {return (
              <React.Fragment key={field[0]}>
                <div className="border-2 p-3 rounded-md"> 
                  <Dropdown 
                  name={field[0]}
                  value={field[1]} 
                  onChange={handleChange} 
                  array={states}
                  register={register}
                  required={generateErrs(field[0])}
  
                  />
                </div>
              </React.Fragment>
            )}
          return (
            <React.Fragment key={index}>
              <div className="border-2 p-3 rounded-md">
                <Input 
                name={field[0]}
                value={field[1]}
                type='text'
                onChange={handleChange}
                register={register}
                required={generateErrs(field[0])}
              />
              </div>
              {errors[field[0]]?.type === 'required' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>}
              {errors[field[0]]?.type === 'pattern' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>}
              {errors[field[0]]?.type === 'maxLength' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>} 
              {errors[field[0]]?.type === 'minLength' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>} 
              {errors[field[0]]?.type === 'validate' && <small><strong className="text-red-400">Email must have '@'</strong></small>} 
            </React.Fragment>
          )
        })}
        <br/>
        <div className="flex gap-x-8">
          <button type='button' onClick={() => {setRender('')}} className='border-2 p-4 bg-gray-300'>BACK TO ITEMS</button>
          <button type="submit" className="p-4 bg-pink-600 text-white rounded-md font-semibold">{`Proceed To Payment`.toUpperCase()}</button>
        </div>
      </form>
      {cart.length !== 0 ?
        <SummaryScreen cart={cart} dispatch={dispatch2} discount={discount}/>
        : <p>Add Items to the Cart to display the summary</p>
      }
    </div>
  )
}

export default CheckOut;