import React from "react";
import {calcSum, calcDiscount} from './index';
import Input from "./input";
import { useForm } from 'react-hook-form';

const SummaryScreen = (props) => {
  const {cart, discount, dispatch} = props;
  const {register, formState: {errors}, handleSubmit} = useForm();

  const sum = calcSum(cart)
  const discountTotal = calcDiscount(discount, sum)

  const handleChange = ({target: {name, value}}) => {
    dispatch({
      type: 'discountCode',
      value: value
    })
  }

  const onSubmit = () => {calcDiscount(discount,sum)}
  return (
    <div className="flex flex-col border-2 p-4 justify-between rounded-md h-96 bg-white">
      <form 
        onSubmit={handleSubmit(onSubmit)}
        className="flex justify-between items-center sticky top-0 bg-white z-10 border-2 rounded-md">
        <Input 
          name={'discount Code'} 
          type='text' 
          register={register}
          value={discount} 
          onChange={handleChange}
          />
      </form>
      <div className="gap-y-5 flex flex-col overflow-auto">
      {cart.map((item) => (
        <React.Fragment key={item.id}>
          <div className="flex flex-row-reverse justify-between border-2 p-2 rounded-md">
            <div className="text-right flex flex-col justify-evenly">
              <p className="font-semibold">{item.name}</p>
              <p>Quantity:{item.inventory.qty}</p>
              <p className="text-green-500 font-bold">
                {item.price.formatted_with_symbol[0] + `${item.inventory.qty * item.price.raw}`}
                </p>
            </div>
            <img src={item.image.url} alt={item.name} className='w-28 h-28'/>
          </div>
        </React.Fragment>
      ))}
      </div>
      <div className="flex flex-col gap-y-2 sticky bottom-0 bg-white p-2 border-4 z-10"> 
      <div className="flex gap-x-4 justify-between">
        Total: <strong>{sum}</strong> <p><strong>(24%)</strong> 
        local tax</p></div>
      <div className="flex gap-x-4 justify-between">
        Discount: <strong>{(sum - discountTotal).toFixed(2)}</strong></div>
      <div className="flex gap-x-4 justify-between">
        Total after discount: <strong>{Number(discountTotal).toFixed(2)}</strong></div>
      </div>
    </div>
  )
}

export default SummaryScreen;

