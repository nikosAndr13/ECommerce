import React from "react";
import { useState } from "react";
import {useForm} from 'react-hook-form';
import { cardInfo, Years, Months, cardIcons} from "./index";
import {cards, findDebitCard, cardInfoErrors} from './validations';
import Input from "./input";
import Dropdown from "./Dropdown";
import SummaryScreen from "./Summary";


const PaymentScreen = (props) => {
  const {paymentForm, dispatch, dispatch2, cart, discount, setRender, proceedToConfirm,} = props;
  const {register, formState: {errors}, handleSubmit, reset} = useForm();
  const [cardType, setCardType] = useState('')

  const findDebitCard = (cardNumber) => {
    for (const card in cards) {
      if (cardNumber.replace(/[^\d]/g, '').match(cards[card])) {
        return card
      };
    }
    return ''
  }

  const handleChange = ({target: {name, value}}) => {
    if (name === 'cardNumber' && value.length !== 0) {
      setCardType(findDebitCard(value))
      let mask = value.split(' ').join('');
      mask = mask.match(new RegExp('.{1,4}', 'g')).join(' ');
      value = mask
    }
    dispatch({
      type: 'paymentInfo',
      key: name,
      value: value
    })
  }

  const onSubmit = () => {
    proceedToConfirm();
  }

  return (
    <div className="flex justify-evenly">
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-around border-2 p-4 rounded-md">
      {Object.entries(paymentForm).map((field) => {
        if (field[0] === 'Month') {
          return <Dropdown array={Months} name={field[0]} value={field[1]} onChange={handleChange}/>
        }
        if (field[0] === 'Year') {return <Dropdown array={Years} name={field[0]} value={field[1]} onChange={handleChange}/>}
        return (
          <React.Fragment key={field[0]}>
            <div className="border-2 flex flex-between">
            <Input
              name={field[0]}
              value={field[1]}
              register={register}
              onChange={handleChange}
              style={'w-full items-center flex'}
              required={cardInfoErrors(field[0])}
              />
            {(field[0] === 'cardNumber' && cardType !== '') ? <img src={cardIcons[cardType]} alt='card-image' className="w-12"/> : ''}
            </div>
            {errors[field[0]]?.type === 'required' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>}
            {errors[field[0]]?.type === 'pattern' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>}
            {errors[field[0]]?.type === 'maxLength' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>} 
            {errors[field[0]]?.type === 'minLength' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>} 
            {cardType === '' && <small><strong className="text-red-400">Enter a valid Card</strong></small>} 
          </React.Fragment>
        )
      })}
       <div className="flex gap-x-8">
          <button type='button' onClick={() => {setRender('checkout');}} className='border-2 p-4 bg-gray-300'>BACK TO CHECKOUT</button>
          <button type="submit" className="p-4 bg-pink-600 text-white rounded-md font-semibold">{`To Confirmation`.toUpperCase()}</button>
        </div>
      </form>
      <SummaryScreen cart={cart} discount={discount} dispatch={dispatch2}/>
    </div>
  )
}

export default PaymentScreen;