import  React  from "react";
import Input from "../input";
import { revealPassword } from "../index";
import { generateErrs } from "../validations";
import {useForm} from 'react-hook-form';

const Login = (props) => {
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
      className="flex flex-col gap-y-6 justify-center w-fit m-auto mt-2">
      {!checkForExistingInfo(users, account.email, 'email') 
        ? <p className="text-red-500">Enter existing email and the message should disappear</p> 
        : ''}
      {Object.entries(account).map((field, index) => {
        if (field[0] === 'email' || field[0] === 'password') {
          return (
            <React.Fragment key={index}>
              <div>
              <Input
                name={field[0]}
                value={field[1]}
                type={(field[0] === 'password') ? 'password' : 'text'}
                onChange={handleChange}
                onClick={revealPassword}
                register={register}
                required={generateErrs(field[0])}
                style={'border-2 border-solid outline-0 p-1 w-1/8 flex justify-between pr-3 opacity'}
                />
                {errors[field[0]]?.type === 'required' &&  
                  <small>
                    <strong className="text-red-400">{errors[field[0]].message}</strong>
                  </small>
                }
                {errors[field[0]]?.type === 'pattern' && 
                  <small>
                    <strong className="text-red-400">{errors[field[0]].message}</strong>
                  </small>
                }
                {errors[field[0]]?.type === 'maxLength' && 
                  <small>
                    <strong className="text-red-400">{errors[field[0]].message}</strong>
                  </small>
                } 
                {errors[field[0]]?.type === 'validate' &&
                  <small>
                    <strong className="text-red-400">Email must have '@'</strong>
                  </small>
                }
              </div>
            </React.Fragment>
          )
        }
      })}
      <button type='submit'>Click to Submit</button>
      </form>
    </>
  )
}

export default Login;