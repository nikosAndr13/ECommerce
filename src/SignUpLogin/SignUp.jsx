import React from "react";
import Input from "../input";
import {generateErrs} from '../validations';
import { revealPassword } from "../index";
import {useForm} from 'react-hook-form';

const SignUp = (props) => {
  const {account, dispatch, onSubmit, checkForExistingInfo, users} = props;
  const {register, formState: {errors}, handleSubmit} = useForm();

  const handleChange = ({target: {name, value}}) => {
    dispatch({
      type: 'updateFieldValue',
      key: name,
      value: value,
    })
  }
return (
    <>
      <form 
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-y-4 justify-center align-center m-auto mt-2 w-1/3 border-2 p-6">
      {checkForExistingInfo(users, account.email, 'email') 
        ? <p className="text-red-500">Account Already Exists</p> 
        : ''}
      {Object.entries(account).map((field, index) => {
        console.log(field[0])
        return (
          <React.Fragment key={index}>
            <div>
              <Input
                name={field[0]}
                value={field[1]}
                type={(field[0] === 'password' || field[0] === 'Confirm Password') ? 'password' : 'text'}
                onChange={handleChange}
                onClick={revealPassword}
                register={register}
                required={
                  generateErrs(field[0])
                }
                style={'border-2 border-solid outline-0 p-1 w-1/8 flex justify-between pr-3 opacity'}
                /> 
                {errors[field[0]]?.type === 'required' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>}
                {errors[field[0]]?.type === 'pattern' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>}
                {errors[field[0]]?.type === 'maxLength' && <small><strong className="text-red-400">{errors[field[0]].message}</strong></small>} 
                {errors[field[0]]?.type === 'validate' && <small><strong className="text-red-400">Email must have '@'</strong></small>} 
                {(account.password !== account['Confirm Password'] && field[0] === 'Confirm Password') 
                ? <small><strong className="text-red-400">Passwords don't match</strong></small> 
                : ''} 
            </div>
          </React.Fragment>
        )
      })}
      <button type='submit'>Click to Submit</button>
      </form>
    </>
  )
}

export default SignUp;
